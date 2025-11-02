<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Mail\ContactMessage;

class ContactController extends Controller
{
    /**
     * Handle contact form submission and send an email.
     */
    public function send(Request $request)
    {
        // Basic validation + honeypot
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:5000'],
            'acceptPolicy' => ['required', 'boolean'],
            // honeypot field should be empty
            'website' => ['nullable', 'max:0'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // If honeypot is filled, silently succeed to mislead bots
        if ($request->filled('website')) {
            return response()->json(['ok' => true]);
        }

        // Optional: Verify reCAPTCHA token when configured
        $recaptchaSecret = config('services.recaptcha.secret');
        $recaptchaToken = $request->input('recaptchaToken');
        if ($recaptchaSecret && $recaptchaToken) {
            try {
                $verify = $this->verifyRecaptcha($recaptchaSecret, $recaptchaToken, $request->ip());
                if (!$verify['success'] || ($verify['score'] ?? 1) < 0.5) {
                    return response()->json(['message' => 'Verificación reCAPTCHA fallida'], 429);
                }
            } catch (\Throwable $e) {
                Log::warning('reCAPTCHA verification error', ['message' => $e->getMessage()]);
            }
        }

        // Normalizamos destinatarios desde CONTACT_RECIPIENT (soporta múltiples separados por coma o punto y coma)
        $toRaw = config('mail.contact_to') ?: env('CONTACT_RECIPIENT');
        $recipients = collect(preg_split('/[;,]/', (string) $toRaw, -1, PREG_SPLIT_NO_EMPTY))
            ->map(fn ($v) => trim($v))
            ->filter(fn ($v) => filter_var($v, FILTER_VALIDATE_EMAIL))
            ->values();
        if ($recipients->isEmpty()) {
            // fallback al remitente global si no hay CONTACT_RECIPIENT válido
            $fallback = config('mail.from.address');
            if ($fallback && filter_var($fallback, FILTER_VALIDATE_EMAIL)) {
                $recipients = collect([$fallback]);
            }
        }

        try {
            // Enviar usando el mismo mecanismo que login/registro (Notifications)
            // para garantizar el mismo pipeline de mailer/transport.
            // Enviar a todos los destinatarios válidos
            $routes = null;
            foreach ($recipients as $idx => $addr) {
                $routes = $routes
                    ? $routes->route('mail', $addr)
                    : Notification::route('mail', $addr);
            }
            ($routes ?: Notification::route('mail', config('mail.from.address')))->notify(
                new \App\Notifications\ContactFormNotification(
                    $request->input('name'),
                    $request->input('email'),
                    $request->input('phone'),
                    $request->input('subject'),
                    $request->input('message')
                )
            );
        } catch (\Throwable $e) {
            Log::error('Contact mail send failed', [
                'message' => $e->getMessage(),
                'exception' => get_class($e),
                'code' => method_exists($e, 'getCode') ? $e->getCode() : null,
                'recipients' => $recipients,
                'mailer' => config('mail.default'),
                // Detalles mínimos del mailer activo para diagnóstico (sin exponer secretos)
                'mailer_config' => [
                    'host' => config('mail.mailers.'.config('mail.default').'.host'),
                    'port' => config('mail.mailers.'.config('mail.default').'.port'),
                    'encryption' => config('mail.mailers.'.config('mail.default').'.encryption'),
                    'uses_username' => (bool) config('mail.mailers.'.config('mail.default').'.username'),
                    'transport' => config('mail.mailers.'.config('mail.default').'.transport'),
                ],
                'has_sendgrid_key' => (bool) env('SENDGRID_API_KEY'),
            ]);
            return response()->json(['message' => 'No se pudo enviar el mensaje en este momento. Inténtalo más tarde.'], 500);
        }

        return response()->json(['ok' => true, 'message' => 'Mensaje enviado correctamente.']);
    }

    private function verifyRecaptcha(string $secret, string $token, string $ip = null): array
    {
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $ip,
        ]);
        return $response->json();
    }
}

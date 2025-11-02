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
use App\Notifications\ContactFormNotification;

class ContactController extends Controller
{
    /**
     * Handle contact form submission and send an email.
     */
    public function send(Request $request)
    {
        // Envolvemos TODO en un try-catch maestro para garantizar siempre JSON
        try {
            return $this->processSend($request);
        } catch (\Throwable $e) {
            Log::error('Contact controller fatal error', [
                'message' => $e->getMessage(),
                'exception' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Error fatal en el controlador',
                'error' => $e->getMessage(),
                'exception' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ], 500);
        }
    }

    private function processSend(Request $request)
    {
        try {
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
        } catch (\Throwable $e) {
            Log::error('Contact validation error', [
                'message' => $e->getMessage(),
                'exception' => get_class($e),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Error en validación',
                'error' => $e->getMessage(),
                'exception' => get_class($e),
            ], 500);
        }

        // Optional: Verify reCAPTCHA token when configured
        try {
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
        } catch (\Throwable $e) {
            Log::error('Contact recaptcha block error', [
                'message' => $e->getMessage(),
                'exception' => get_class($e),
            ]);
            return response()->json([
                'message' => 'Error en verificación reCAPTCHA',
                'error' => $e->getMessage(),
            ], 500);
        }

        // Normalizamos destinatarios desde CONTACT_RECIPIENT (soporta múltiples separados por coma o punto y coma)
        try {
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

            if ($recipients->isEmpty()) {
                Log::error('Contact no recipients', [
                    'toRaw' => $toRaw,
                    'fallback' => config('mail.from.address'),
                ]);
                return response()->json([
                    'message' => 'No hay destinatario configurado',
                    'detail' => 'Configura CONTACT_RECIPIENT en el servidor',
                ], 500);
            }
        } catch (\Throwable $e) {
            Log::error('Contact recipient parsing error', [
                'message' => $e->getMessage(),
                'exception' => get_class($e),
            ]);
            return response()->json([
                'message' => 'Error procesando destinatarios',
                'error' => $e->getMessage(),
            ], 500);
        }

        try {
            // Enviar a todos los destinatarios válidos
            // Usar el mismo patrón que forgot-password: enviar una notificación por destinatario
            // Convertimos a array para evitar problemas con Collection
            $recipientsArray = $recipients->toArray();
            
            foreach ($recipientsArray as $addr) {
                Notification::route('mail', $addr)->notify(
                    new ContactFormNotification(
                        $request->input('name'),
                        $request->input('email'),
                        $request->input('phone'),
                        $request->input('subject'),
                        $request->input('message')
                    )
                );
            }
        } catch (\Throwable $e) {
            Log::error('Contact mail send failed', [
                'message' => $e->getMessage(),
                'exception' => get_class($e),
                'code' => method_exists($e, 'getCode') ? $e->getCode() : null,
                'recipients' => $recipientsArray ?? $recipients->toArray(),
                'trace' => $e->getTraceAsString(),
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
            // SIEMPRE devolver JSON, nunca HTML
            return response()->json([
                'message' => 'Error al enviar el correo',
                'error' => $e->getMessage(),
                'exception' => get_class($e),
                'recipients' => $recipientsArray ?? $recipients->toArray(),
            ], 500);
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

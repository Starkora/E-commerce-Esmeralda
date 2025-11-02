<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;

class Recaptcha
{
    public static function verify(?string $token, ?string $ip = null, float $minScore = 0.5): array
    {
        $secret = config('services.recaptcha.secret');
        if (!$secret || !$token) {
            return ['skipped' => true, 'success' => true, 'score' => 1];
        }

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $ip,
        ])->json();

        $ok = ($response['success'] ?? false) && (($response['score'] ?? 1) >= $minScore);
        return ['success' => $ok] + $response;
    }
}

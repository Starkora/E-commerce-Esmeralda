<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ForceCorsHeaders
{
    /**
     * Handle an incoming request and ensure CORS headers are present on the response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $origin = 'https://e-commerce-esmeralda.vercel.app';

        // Handle preflight requests immediately
        if (strtoupper($request->method()) === 'OPTIONS') {
            $headers = [
                'Access-Control-Allow-Origin' => $origin,
                'Access-Control-Allow-Credentials' => 'true',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN',
            ];

            return response()->noContent(204)->withHeaders($headers);
        }

        $response = $next($request);

        // Ensure headers exist on the response object
        if (method_exists($response, 'header') || isset($response->headers)) {
            // Some response types expose header methods differently; use the headers property when possible
            if (isset($response->headers) && method_exists($response->headers, 'set')) {
                $response->headers->set('Access-Control-Allow-Origin', $origin);
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
                $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
                $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN');
            } else {
                $response->header('Access-Control-Allow-Origin', $origin);
                $response->header('Access-Control-Allow-Credentials', 'true');
                $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
                $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN');
            }
        }

        return $response;
    }
}

<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        // TEMP: Evitar 419 mientras ajustamos cookies third‑party (CHIPS) en producción
        // IMPORTANTE: quita esta excepción cuando confirmes que el POST ya envía la cookie de sesión
        '/spa-register',
    ];
}

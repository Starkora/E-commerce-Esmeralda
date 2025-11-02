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
        // OJO: En Laravel 10/11 los patrones de $except NO llevan slash inicial
        // porque se comparan contra request()->path() (p.ej. "spa-register").
        // Con el slash no matchea y sigue lanzando 419.
        'spa-register',
        'spa-login',
        // Replicamos la excepción temporal para recuperación de contraseña
        'spa-forgot-password',
        'spa-reset-password',
    ];
}

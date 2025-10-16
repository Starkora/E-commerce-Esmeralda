<?php

return [
    'paths' => [
        'api/*',
        'login',
        'logout',
        'register',
        'spa-register',
        'sanctum/csrf-cookie',
        'forgot-password',
        'reset-password',
        'user'
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['https://e-commerce-esmeralda.vercel.app'],
    'allowed_origin_patterns' => [],

    'allowed_headers' => ['*'],

    'supports_credentials' => true,
];

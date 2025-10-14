<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
echo 'env:' . env('MAIL_FROM_ADDRESS') . PHP_EOL;
echo 'config:' . config('mail.from.address') . PHP_EOL;

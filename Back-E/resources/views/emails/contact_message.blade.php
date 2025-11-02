<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; }
        .container { max-width: 640px; margin: 0 auto; }
        .meta { color: #555; font-size: 14px; }
        .content { background: #f7f7f7; padding: 16px; border-radius: 8px; }
    </style>
    </head>
<body>
<div class="container">
    <h2>Nuevo mensaje de contacto</h2>
    <p class="meta">
        <strong>Nombre:</strong> {{ $name }}<br>
        <strong>Correo:</strong> {{ $email }}<br>
        @if($phone)
        <strong>Teléfono:</strong> {{ $phone }}<br>
        @endif
        <strong>Asunto:</strong> {{ $subjectLine }}
    </p>
    <div class="content">
        <p style="white-space: pre-line">{{ $bodyMessage }}</p>
    </div>
</div>
</body>
</html>

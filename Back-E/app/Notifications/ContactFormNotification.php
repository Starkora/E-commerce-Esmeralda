<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ContactFormNotification extends Notification
{
    public string $name;
    public string $email;
    public ?string $phone;
    public string $subjectLine;
    public string $bodyMessage;

    public function __construct(string $name, string $email, ?string $phone, string $subjectLine, string $bodyMessage)
    {
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->subjectLine = $subjectLine;
        $this->bodyMessage = $bodyMessage;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        // Usamos la misma ruta que las demás notificaciones del sistema (MailMessage)
        // y reutilizamos la vista de correo ya creada.
        $message = (new MailMessage)
            ->subject('[Contacto] ' . $this->subjectLine)
            ->view('emails.contact_message', [
                'name' => $this->name,
                'email' => $this->email,
                'phone' => $this->phone,
                'subjectLine' => $this->subjectLine,
                'bodyMessage' => $this->bodyMessage,
            ]);

        // MailMessage no expone replyTo en todas las versiones; si está disponible lo usamos.
        if (method_exists($message, 'replyTo')) {
            $message->replyTo($this->email, $this->name);
        }

        return $message;
    }
}

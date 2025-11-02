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
        // Patrón MÍNIMO idéntico a CustomResetPasswordNotification
        return (new MailMessage)
            ->subject('[Contacto] ' . $this->subjectLine)
            ->line('Nombre: ' . $this->name)
            ->line('Email: ' . $this->email)
            ->line('Teléfono: ' . ($this->phone ?? 'N/A'))
            ->line('Asunto: ' . $this->subjectLine)
            ->line('Mensaje:')
            ->line($this->bodyMessage);
    }
}

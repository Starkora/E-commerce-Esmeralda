<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class SimpleContactNotification extends Notification
{
    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('[Contacto] ' . ($this->data['subject'] ?? 'Nuevo mensaje'))
            ->line('Nombre: ' . ($this->data['name'] ?? 'N/A'))
            ->line('Email: ' . ($this->data['email'] ?? 'N/A'))
            ->line('Teléfono: ' . ($this->data['phone'] ?? 'N/A'))
            ->line('Mensaje: ' . ($this->data['message'] ?? ''));
    }
}

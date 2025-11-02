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
        // Usar el patrón estándar de MailMessage (como CustomResetPasswordNotification)
        // SIN vista personalizada para evitar problemas
        $message = (new MailMessage)
            ->subject('[Contacto] ' . $this->subjectLine)
            ->greeting('Nuevo mensaje de contacto')
            ->line('**Nombre:** ' . $this->name)
            ->line('**Correo:** ' . $this->email);
        
        if ($this->phone) {
            $message->line('**Teléfono:** ' . $this->phone);
        }
        
        $message->line('**Asunto:** ' . $this->subjectLine)
                ->line('**Mensaje:**')
                ->line($this->bodyMessage)
                ->salutation('Saludos, ' . config('app.name'));

        return $message;
    }
}

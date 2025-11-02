<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

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

    public function build()
    {
        return $this->subject('[Contacto] ' . $this->subjectLine)
            ->replyTo($this->email, $this->name)
            ->view('emails.contact_message')
            ->with([
                'name' => $this->name,
                'email' => $this->email,
                'phone' => $this->phone,
                'subjectLine' => $this->subjectLine,
                'bodyMessage' => $this->bodyMessage,
            ]);
    }
}

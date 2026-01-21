<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nome',
        'email',
        'senha',
        'telefone',
        'cpf',
        'nivel',
        'token_senha',
        'email_verificado'
    ];

    protected $hidden = [
        'senha',
        'token_senha',
        'email_verificado'
    ];
    
    protected function casts(): array
    {
        return [
            'nivel' => 'string',
            'cpf' => 'string',
            'telefone' => 'string',
            'senha' => 'string',
            'token_senha' => 'string',
            'email' => 'string',
            'nome' => 'string',
            'email_verificado' => 'boolean'
        ];
    }
}

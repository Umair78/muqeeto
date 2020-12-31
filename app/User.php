<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'user_id';

    protected $casts = [
        'group_id' => 'int'
    ];

    protected $dates = [
        'email_verified_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        // 'fcm_token'
    ];

    protected $fillable = [
        'name',
        'email',
        'mobile',
        //'email_verified_at',
        'password',
        //'ppwd',
        'remember_token',
        //'fcm_token',
        //'group_id',
       // 'group_key',
        'provider',
        'provider_id'
    ];
}

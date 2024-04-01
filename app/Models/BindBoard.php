<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BindBoard extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'hash',
        'max_allowed_binds',
        'created_by',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'created_by',
        'password',
        'remember_token',
    ];

    public function binds()
    {
        return $this->hasMany(Bind::class);
    }

    public function guild()
    {
        return $this->hasOne(Guild::class);
    }

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function invites() {
        return $this->hasMany(Invite::class);
    }
}

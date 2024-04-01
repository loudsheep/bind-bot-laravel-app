<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;

    protected $fillable = [
        'hash',
        'active_until',
        'max_users',
        'active',
        'created_by'
    ];

    protected $hidden = [
        'id'
    ];

    public function bindboard()
    {
        return $this->belongsTo(BindBoard::class, 'bind_board_id');
    }
}

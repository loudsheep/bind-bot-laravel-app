<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bind_board_id',
        'permissions',
    ];

    public function bindBoard() {
        return $this->belongsTo(BindBoard::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}

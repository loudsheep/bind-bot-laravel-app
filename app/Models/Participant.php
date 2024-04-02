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

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'user_id',
        'updated_at',
        'bind_board_id',
    ];

    public function bindboard() {
        return $this->belongsTo(BindBoard::class, 'bind_board_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}

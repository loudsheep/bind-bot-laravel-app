<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guild extends Model
{
    use HasFactory;

    public function bindBoard()
    {
        return $this->belongsTo(BindBoard::class);
    }
}

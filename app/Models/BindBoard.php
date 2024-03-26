<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BindBoard extends Model
{
    use HasFactory;

    public function binds() {
        return $this->hasMany(Bind::class);
    }
}

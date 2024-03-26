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

    public function binds() {
        return $this->hasMany(Bind::class);
    }
}

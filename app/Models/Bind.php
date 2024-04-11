<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bind extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'created_by',
        'bind_board_id',
        'name',
        'bind_path',
        'use_count',
        'active',
    ];

    public function bindBoard()
    {
        return $this->belongsTo(BindBoard::class);
    }
}

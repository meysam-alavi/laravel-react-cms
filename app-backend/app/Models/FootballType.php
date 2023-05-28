<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FootballType extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'display_status',
        'parent_id',
        'num_of_players',
        'created_by',
        'updated_by'
    ];
}

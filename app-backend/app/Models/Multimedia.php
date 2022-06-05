<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Multimedia extends Model
{
    use HasFactory;

    protected $fillable = array(
        'group_type',
        'title',
        'description',
        'name',
        'is_dir',
        'quality',
        'created_by',
        'updated_by',
        'parent_id',
        'relation_type',
        'extra_info'
    );
}

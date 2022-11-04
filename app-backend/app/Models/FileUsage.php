<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileUsage extends Model
{
    use HasFactory;

    protected $fillable = [
        'content_id',
        'file_id',
        'module_id',
        'module_section',
        'usage',
        'gallery_id',
        'extra_info'
    ];
}

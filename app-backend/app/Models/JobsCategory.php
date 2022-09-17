<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * JobsCategory Class Model
 */
class JobsCategory extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'display_status',
        'parent_id',
        'created_by',
        'updated_by'
    ];
}

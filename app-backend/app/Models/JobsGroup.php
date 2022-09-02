<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * JobsGroup Class Model
 */
class JobsGroup extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'parent_id',
        'created_by',
        'updated_by'
    ];
}

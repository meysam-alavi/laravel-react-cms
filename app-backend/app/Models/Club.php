<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'surname',
        'description',
        'continent_id',
        'country_id',
        'city_id',
        'company_id',
        'date_establishment',
        'created_by',
        'updated_by'
    ];
}

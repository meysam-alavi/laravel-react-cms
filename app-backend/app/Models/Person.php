<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'birth_date',
        'national_code',
        'birth_certificate_code',
        'birth_certificate_series',
        'birth_certificate_serial',
        'country_of_birth',
        'city_of_birth',
        'country_of_citizenship',
        'city_of_citizenship',
        'address_of_citizenship',
        'skin_color',
        'gender',
        'weight',
        'height',
        'size'
    ];
}

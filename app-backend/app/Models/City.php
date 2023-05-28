<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class City extends Model
{
    use HasFactory, Searchable;
    protected $primaryKey = 'geo_name_id';

    /**
     * Get the value used to index the model
     *
     * @return mixed
     */
    public function getScoutKey(): mixed
    {
        return $this->geo_name_id;
    }

    /**
     * Get the key name used to index the model
     *
     * @return string
     */
    public function getScoutKeyName(): string
    {
        return 'geo_name_id';
    }
}

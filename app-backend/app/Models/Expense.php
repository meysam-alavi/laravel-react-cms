<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    /**
     * to enable our expenses model to be writable,
     * the following to specify the fields we can write to
     *
     * @var string[]
     */
    protected $fillable = ['name', 'description', 'amount'];

    /**
     * @var string
     */
    private $name;

    /**
     * @var integer
     */
    private $amount;

    /**
     * @var string
     */
    private $description;
}

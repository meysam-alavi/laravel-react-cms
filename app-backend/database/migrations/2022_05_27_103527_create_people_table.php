<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeopleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 20)->fulltext();
            $table->string('last_name', 30)->fulltext();
            $table->timestamp('birth_date');
            $table->string('national_code')->unique()->nullable();
            $table->string('birth_certificate_code')->nullable();
            $table->string('birth_certificate_series')->nullable();
            $table->string('birth_certificate_serial')->nullable();
            $table->integer('country_of_birth')->nullable();
            $table->integer('city_of_birth')->nullable();
            $table->integer('country_of_citizenship')->nullable();
            $table->integer('city_of_citizenship')->nullable();
            $table->string('address_of_citizenship')->nullable();
            $table->enum('skin_color', ['White', 'Yellow', 'Black', 'Brown', 'Tawny', 'Red'])->nullable();
            $table->enum('gender', ['M', 'F']);
            $table->float('weight')->nullable();
            $table->float('height')->nullable();
            $table->enum('size', ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('people');
    }
}

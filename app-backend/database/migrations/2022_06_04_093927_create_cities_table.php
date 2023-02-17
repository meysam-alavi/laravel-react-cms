<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('geo_name_id', false, true);
            $table->string('name', 255);
            $table->string('name_fa', 500)->nullable();
            $table->char('country_id', 2)->index();
            $table->string('ascii_name', 255)->nullable();
            $table->double('longitude')->index();
            $table->double('latitude')->index();
            $table->string('timezone', 255);
            $table->string('coordinates', 255);
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
        Schema::dropIfExists('cities');
    }
}

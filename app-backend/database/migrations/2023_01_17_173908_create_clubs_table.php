<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 60);
            $table->string('surname', 30)->nullable();
            $table->text('description')->nullable();
            $table->char('continent_id', '2')->nullable()->index();
            $table->char('country_id', '2')->nullable()->index();
            $table->bigInteger('city_id')->nullable()->index();
            $table->integer('company_id')->index();
            $table->timestamp('date_establishment')->nullable();
            $table->integer('created_by')->index();
            $table->integer('updated_by')->default(0)->index();
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
        Schema::dropIfExists('clubs');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('title', 60)->nullable();
            $table->text('description')->nullable();
            $table->char('continent_id', '2')->nullable()->index();
            $table->char('country_id', '2')->nullable()->index();
            $table->bigInteger('city_id')->nullable()->index();
            $table->integer('football_type_id')->index();
            $table->enum('gender', ['M', 'F'])->comment('M:Male,F:Female')->index();
            $table->char('team_type', 2)->comment('NT:National Team, CT:Club Team')->index();
            $table->integer('captain_id')->nullable()->index();
            $table->integer('coach_id')->nullable()->index();
            $table->integer('club_id')->nullable()->index();
            //$table->integer('league_id')->nullable()->index();
            $table->integer('stadium_id')->nullable()->index();
            $table->enum('age_category', ['Under12', 'Under13', 'Under14', 'Toddlers', 'Teenagers', 'Youth', 'Hope', 'Adults'])->comment('Under12: under 12 years old, Under13: under 13 years old, Under14: under 14 years old, Toddlers, Teenagers, Youth, Hope, Adults')->index();
            $table->timestamp('date_of_formation')->nullable();
            $table->integer('club_owner_id')->nullable()->index();
            $table->enum('ownership_type', ['G', 'P', 'G/I', 'P/I'])->comment('Governmental, Private, Government/Industrial, Private/Industrial')->index();
            $table->timestamps();
        });
        /*
         * موارد باقی مانده
         * رنگ لباس
         * لوگوی تیم
         *
         *https://creately.com/diagram/example/ivo7y4h11/football-management-erd-classic
         */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teams');
    }
}

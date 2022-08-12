<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonMultipleInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('person_multiple_infos', function (Blueprint $table) {
            $table->id();
            $table->integer('person_id')->index();
            $table->enum('type_info', ['mail', 'phone_number', 'mobile_number', 'detail_address'])->index();
            $table->string('content')->fulltext();
            $table->enum('type_of_usage',['personal', 'business', 'residence', 'workhouse', 'hangout']);
            $table->enum('default_selection', ['T', 'F'])->default('F')->index();
            $table->integer('created_by');
            $table->integer('updated_by');
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
        Schema::dropIfExists('person_multiple_infos');
    }
}

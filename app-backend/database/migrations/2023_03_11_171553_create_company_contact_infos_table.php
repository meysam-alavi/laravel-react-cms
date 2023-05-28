<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyContactInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_contact_infos', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('company_id')->index();
            $table->string('content_type')->index();
            $table->string('content');
            $table->enum('default', ['T', 'F'])->default('F');
            $table->enum('status', ['E', 'D', 'S'])->default('S');
            $table->enum('show', ['T', 'F'])->default('F');
            $table->bigInteger('order')->index();
            $table->bigInteger('created_by')->index();
            $table->bigInteger('updated_by')->index()->default(0);
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
        Schema::dropIfExists('company_contact_infos');
    }
}

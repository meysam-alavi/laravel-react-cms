<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFileUsageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('file_usages', function (Blueprint $table) {
            $table->id();
            $table->integer('content_id')->index();
            $table->integer('file_id')->index();
            $table->string('module_id')->index();
            $table->string('module_section')->index();
            $table->string('usage');
            $table->integer('gallery_id')->nullable();
            $table->string('extra_info')->nullable();
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
        Schema::dropIfExists('file_usage');
    }
}

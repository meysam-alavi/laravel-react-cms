<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContentUsagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content_usages', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('content_id1')->index();
            $table->bigInteger('content_id2')->index();
            $table->bigInteger('module_id');
            $table->string('module_section');
            $table->string('usage');
            $table->string('extra_info')->nullable();
            $table->bigInteger('add_by');
            $table->bigInteger('updated_by');
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
        Schema::dropIfExists('content_usages');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMultimediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('multimedia', function (Blueprint $table) {
            $table->id();
            $table->enum('group_type', ['I', 'S', 'V']);
            $table->string('title')->fulltext('title');
            $table->string('description');
            $table->string('name')->fulltext('name')->unique();
            $table->enum('is_dir', ['T', 'F']);
            $table->string('quality')->nullable();
            $table->integer('created_by')->default(0);
            $table->integer('updated_by')->default(0);
            $table->integer('parent_id')->default(0)->index('parent_id');
            $table->integer('relation_type')->default(0);
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
        Schema::dropIfExists('multimedia');
    }
}

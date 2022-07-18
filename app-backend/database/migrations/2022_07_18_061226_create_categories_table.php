<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 60)->fulltext();
            $table->string('name_en', 60)->fulltext();
            $table->string('description', 1000)->fulltext();
            $table->enum('status', ['T', 'F'])->default('F');
            $table->enum('display_status', ['T', 'F'])->default('F');
            $table->enum('service_content_type', ['news', 'newsletter'])->default('news');
            $table->enum('service_access_type', ['free', 'confidential'])->default('free');
            $table->string('redirect_to', 255)->default('');
            $table->integer('parent_id')->default(0)->index();
            $table->integer('created_by')->index();
            $table->integer('updated_by')->index();
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
        Schema::dropIfExists('categories');
    }
}

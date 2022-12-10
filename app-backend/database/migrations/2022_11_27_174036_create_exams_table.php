<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('title', 60);
            $table->string('description')->nullable();
            $table->enum('status', ['A', 'D'])->default('D')->index();
            $table->enum('display_status', ['A', 'D'])->default('D')->index();
            $table->bigInteger('num_of_questions')->index();
            $table->enum('exam_type', ['mc', 'de', 'mc-de'])->comment('mc: multi choice, de:descriptive');
            $table->integer('num_of_options')->nullable()->index();
            $table->integer('num_of_multi_choice')->nullable()->index();
            $table->integer('total')->default(0)->index();
            $table->float('exam_duration')->index();
            $table->timestamp('exam_date')->index();
            $table->bigInteger('parent_id')->index();
            $table->bigInteger('created_by')->index();
            $table->bigInteger('updated-by')->nullable()->index();
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
        Schema::dropIfExists('exams');
    }
}

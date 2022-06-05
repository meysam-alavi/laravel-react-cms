<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalGradesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educational_grades', function (Blueprint $table) {
            $table->id();
            $table->string('title')->fulltext();
            $table->string('alias')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['A', 'D'])->default('D');
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
        Schema::dropIfExists('educational_grades');
    }
}

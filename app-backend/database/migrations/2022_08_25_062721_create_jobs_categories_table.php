<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsCategoriesTable extends Migration
{
    /**
     * table name
     *
     * @var string
     */
    private static string $tableName = 'jobs_categories';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable(self::$tableName)) {
            Schema::create(self::$tableName, function (Blueprint $table) {
                $table->id();
                $table->string('title', 60)->fulltext();
                $table->text('description')->nullable();
                $table->enum('status', ['A', 'D'])->default('D')->index();
                $table->enum('display_status', ['A', 'D'])->default('D')->index();
                $table->integer('parent_id')->default(0)->index();
                $table->string('image', 255)->nullable();
                $table->integer('created_by')->index();
                $table->integer('updated_by')->index()->nullable();
                $table->timestamps();
            });
        } else {
            if(!Schema::hasColumn(self::$tableName, 'image')) {
                Schema::table(self::$tableName, function (Blueprint $table) {
                    $table->addColumn('string', 'image', ['length' => 255, 'nullable' => true]);
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs_categories');
    }
}

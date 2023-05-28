<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFootballTypesTable extends Migration
{
    /**
     * table name
     *
     * @var string
     */
    private static string $tableName = 'football_types';

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
                $table->string('title', 60);
                $table->string('description')->nullable();
                $table->enum('status', ['A', 'D'])->default('D')->index();
                $table->enum('display_status', ['A', 'D'])->default('D')->index();
                $table->integer('created_by')->index();
                $table->integer('updated_by')->default(0)->index();
                $table->integer('num_of_players')->nullable()->index();
                $table->integer('parent_id')->default(0)->index();
                $table->timestamps();
            });
        } else {
            if (!Schema::hasColumn(self::$tableName, 'num_of_players')) {
                Schema::table(self::$tableName, function (Blueprint $table) {
                    $table->addColumn('integer', 'num_of_players', ['nullable' => true]);
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
        Schema::dropIfExists(self::$tableName);
    }
}

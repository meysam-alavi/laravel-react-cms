<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_types', function (Blueprint $table) {
            $table->id();
            $table->string('id2')->index();
            $table->string('name_fa');
            $table->string('name_en');
            $table->mediumText('description')->nullable();
            $table->enum('statue', ['E', 'D'])->comment('E:Enabled, D:Disabled');
            $table->enum('display_status', ['E', 'D'])->comment('E:Enabled, D:Disabled');
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
        Schema::dropIfExists('company_types');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    private static string $tableName = 'personal_access_tokens';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable(self::$tableName)) {
            if(!Schema::hasColumn(self::$tableName, 'lang')) {
                Schema::table(self::$tableName, function (Blueprint $table) {
                    $table->addColumn('char', 'lang', ['length' => '2', 'default' => 'fa']);
                });
            }
        } else {
            Schema::create(self::$tableName, function (Blueprint $table) {
                $table->id();
                $table->morphs('tokenable');
                $table->string('name');
                $table->string('token', 64)->unique();
                $table->text('abilities')->nullable();
                $table->timestamp('last_used_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
    }
};

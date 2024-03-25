<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bind_boards', function (Blueprint $table) {
            $table->boolean('guild_verified')->default(0)->after('guildId');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bind_boards', function (Blueprint $table) {
            $table->dropColumn('guild_verified');
        });
    }
};

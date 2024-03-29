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
        Schema::create('guilds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bind_board_id');
            $table->string('guildId');
            $table->boolean('verified')->default(false);
            $table->json('voice_channels')->nullable();
            $table->string('selected_voice_channel')->nullable();
            $table->timestamps();

            $table->foreign('bind_board_id')->references('id')->on('bind_boards');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guilds');
    }
};

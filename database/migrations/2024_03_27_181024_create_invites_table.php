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
        Schema::create('invites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('bind_board_id');
            $table->string('hash');
            $table->dateTime('active_until');
            $table->unsignedInteger('max_users')->nullable()->default(null);
            $table->unsignedInteger('users_used')->default(0);
            $table->boolean('active')->default(true);

            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('bind_board_id')->references('id')->on('bind_boards');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invites');
    }
};

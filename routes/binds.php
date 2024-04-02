<?php

use App\Http\Controllers\BindBoardController;
use App\Http\Controllers\BindController;
use App\Http\Controllers\InviteController;
use Illuminate\Support\Facades\Route;


Route::prefix('/bindboard')->middleware('auth')->group(function () {
    Route::post('/create', [BindBoardController::class, 'store'])->name('bindboard.store');
    Route::get('/{bindboard:hash}', [BindBoardController::class, 'show'])->name('bindboard.show');
    Route::get('/{bindboard:hash}/edit', [BindBoardController::class, 'edit'])->name('bindboard.edit');
    Route::patch('/{bindboard:hash}', [BindBoardController::class, 'update'])->name('bindboard.update');
    Route::delete('/{bindboard:hash}', [BindBoardController::class, 'destroy'])->name('bindboard.destroy');
    Route::get('/{bindboard:hash}/bot', [BindBoardController::class, 'bot'])->name('bindboard.bot');
});


Route::prefix('/bind')->middleware('auth')->group(function () {
    Route::post('/create/{bindboard:hash}', [BindController::class, 'create'])->name('bind.create');
    Route::post('/{bind:bind_path}/play', [BindController::class, 'play'])->middleware('throttle:60,1')->name('bind.play');
});


Route::prefix('/invite')->middleware('auth')->group(function () {
    Route::post('/{bindboard:hash}/create', [InviteController::class, 'store'])->name('invite.store');
    Route::get('/{invite:hash}', [InviteController::class, 'show'])->name('invite.show');
    Route::get('/{invite:hash}/accept', [InviteController::class, 'accept'])->name('invite.accept');
    Route::delete('/{invite:hash}', [InviteController::class, 'destroy'])->name('invite.destroy');
});


Route::get('/binds/{bind:bind_path}', [BindController::class, 'file'])->middleware('auth')->name('bind.file');

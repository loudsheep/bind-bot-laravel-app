<?php

use App\Http\Controllers\BindBoardController;
use App\Http\Controllers\BindController;
use Illuminate\Support\Facades\Route;

Route::prefix('/bindboard')->middleware('auth')->group(function () {
    Route::get('/create', [BindBoardController::class, 'create'])->name('bindboard.create');
    Route::post('/create', [BindBoardController::class, 'store'])->name('bindboard.store');
    Route::get('/{bindboard:hash}', [BindBoardController::class, 'show'])->name('bindboard.show');
    Route::get('/{bindboard:hash}/edit', [BindBoardController::class, 'edit'])->name('bindboard.edit');
    Route::patch('/{bindboard:hash}', [BindBoardController::class, 'update'])->name('bindboard.update');
    Route::delete('/{bindboard:hash}', [BindBoardController::class, 'destroy'])->name('bindboard.destroy');
});

Route::prefix('/bind')->middleware('auth')->group(function () {
    Route::post('/create/{bindboard:hash}', [BindController::class, 'create'])->name('bind.create');
});

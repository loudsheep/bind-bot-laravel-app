<?php

namespace App\Http\Controllers;

use App\Models\BindBoard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BindBoardController extends Controller
{
    public function show(Request $request, BindBoard $bindboard)
    {
        $binds = $bindboard->binds()->get();
        return Inertia::render('BindBoard/Show', [
            'bindboard' => $bindboard,
            'binds' => $binds,
            'canAddMoreBinds' => $binds->count() < $bindboard->max_allowed_binds,
            'canPlayBindUsingBot' => $bindboard->guildId !== null && $bindboard->guild_verified,
        ]);
    }
}

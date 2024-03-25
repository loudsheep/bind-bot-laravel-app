<?php

namespace App\Http\Controllers;

use App\Models\BindBoard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BindBoardController extends Controller
{
    public function show(Request $request, BindBoard $bindboard)
    {
        return Inertia::render('BindBoard/Show', [
            'bindboard' => $bindboard,
        ]);
    }
}

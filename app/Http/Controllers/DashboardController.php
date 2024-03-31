<?php

namespace App\Http\Controllers;

use App\Models\BindBoard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $authoredBindBoards = $request->user()->createdBindBoards;
        $sharedBindBoards = $request->user()->sharedBindBoards;
        $canCreateBindboards = $authoredBindBoards->count() < $request->user()->max_bind_boards;

        return Inertia::render('Dashboard', [
            'authoredBindBoards' => $authoredBindBoards,
            'sharedBindBoards' => $sharedBindBoards,
            'canCreateBindboards' => $canCreateBindboards,
        ]);
    }
}

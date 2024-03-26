<?php

namespace App\Http\Controllers;

use App\Models\Bind;
use App\Models\BindBoard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BindController extends Controller
{
    public function create(Request $request, BindBoard $bindboard)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:50'],
            'bind' => ['required', 'file', 'mimes:mp3'],
        ]);

        if ($bindboard->binds()->count() >= $bindboard->max_allowed_binds) return back()->withErrors(['name' => 'Cannot add new Bind, bind limit depleted']);

        $bindPath = str_replace('binds/', '', Storage::put('binds', $request->bind));
        $bind = new Bind([
            'created_by' => $request->user()->id,
            'bind_board_id' => $bindboard->id,
            'name' => $request->name,
            'bind_path' => $bindPath,
            'use_count' => 0,
            'active' => true,
        ]);

        $bind->save();

        return redirect()->back();
    }

    public function file(Request $request, Bind $bind)
    {
        // TODO authorization
        if (!$bind->active) return abort(404);
        return response()->file(Storage::path('binds/' . $bind->bind_path));
    }
}

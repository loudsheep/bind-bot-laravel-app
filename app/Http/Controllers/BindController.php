<?php

namespace App\Http\Controllers;

use App\Models\Bind;
use App\Models\BindBoard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BindController extends Controller
{
    public function create(Request $request, BindBoard $bindboard)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:50'],
            'bind' => ['required', 'file', 'mimes:mp3'],
        ]);

        $bindFileName = Str::random(50) . ".mp3";
        $bindPath = Storage::put('binds', $request->bind);

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
}

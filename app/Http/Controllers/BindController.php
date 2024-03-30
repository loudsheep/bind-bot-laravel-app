<?php

namespace App\Http\Controllers;

use App\Models\Bind;
use App\Models\BindBoard;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;


class BindController extends Controller
{
    public function create(Request $request, BindBoard $bindboard)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:50'],
            'bind' => ['required', 'file', 'mimes:mp3', 'max:500'],
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

    public function play(Request $request, Bind $bind)
    {
        // TODO authorization
        if (!$bind->active || $bind->bindBoard->guild == null || $bind->bindBoard->guild->selected_voice_channel == null)
            return json_encode(['status' => 403, 'message' => 'This action is unauthorized']);

        $apiUrl = env('BOT_BACKEND_URL', 'http://localhost');
        try {
            $response = Http::post($apiUrl . '/play', [
                'body' => json_encode([
                    "url" => Storage::path('binds/' . $bind->bind_path),
                    "guildId" => $bind->bindBoard->guild->guildId,
                    "channelId" => $bind->bindBoard->guild->selected_voice_channel,
                ]),
            ]);

            $bind->use_count++;
            $bind->save();

            return $response->json();
        } catch (Exception $e) {
            return json_encode(['status' => 500, 'message' => 'Something went wrong. Try again later']);
        }

        // TODO: response status sent to web client
        return json_encode(['status' => 200, 'message' => 'Successfully played bind on server']);
    }
}

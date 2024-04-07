<?php

namespace App\Http\Controllers;

use App\Models\BindBoard;
use App\Models\Guild;
use App\Services\PermissionService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Bind;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;



class GuildController extends Controller
{
    public function reload(Request $request, BindBoard $bindboard)
    {
        $this->authorize('update', $bindboard);

        $guild = $bindboard->guild;

        $reloaded = RateLimiter::attempt(
            'reload' . $guild->id,
            1,
            function () use ($guild) {
                $apiUrl = env('BOT_BACKEND_URL', 'http://localhost');
                try {
                    $response = Http::post($apiUrl . '/channels', [
                        'body' => json_encode([
                            "guildId" => $guild->guildId,
                        ]),
                    ]);
                    return $response->json();
                } catch (Exception $e) {
                    return json_encode(['status' => 500, 'message' => 'Something went wrong. Try again later']);
                }
            },
            60
        );

        $bindboard->refresh();
        if ($reloaded) return json_encode(['status' => 200, 'message' => 'Channels updated!', 'data' => $bindboard->guild->voice_channels]);
        return json_encode(['status' => 429, 'message' => 'You can update channels only once every minute!']);
    }
}

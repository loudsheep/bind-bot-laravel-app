<?php

namespace App\Http\Controllers;

use App\Models\BindBoard;
use App\Models\Guild;
use App\Services\PermissionService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BindBoardController extends Controller
{
    protected $permissionService;
    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
    }

    public function show(Request $request, BindBoard $bindboard)
    {
        $this->authorize('view', $bindboard);

        $binds = $bindboard->binds()->get();
        $permissions = $this->permissionService->getUserPermissionsForBindboard($request->user(), $bindboard);
        return Inertia::render('BindBoard/Show', [
            'bindboard' => $bindboard,
            'binds' => $binds,
            'permissions' => $permissions,
            'canAddMoreBinds' => $binds->count() < $bindboard->max_allowed_binds,
            'canPlayBindUsingBot' => $bindboard->guild !== null && $bindboard->guild->verified && $bindboard->guild->selected_voice_channel,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', BindBoard::class);
        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:50'],
            'description' => ['nullable', 'string', 'min:2', 'max:150'],
        ]);

        // TODO max_allowed_binds
        $request->user()->createdBindBoards()->create([
            'name' => $request->name,
            'description' => $request->description,
            'hash' => Str::random(20),
            'max_allowed_binds' => 5,
        ]);

        return back();
    }

    public function edit(Request $request, BindBoard $bindboard)
    {
        $this->authorize('update', $bindboard);

        $guild = $bindboard->guild;
        $invites = $bindboard->invites()->where('active', 1)->where('active_until', '>=', Carbon::today())->get()->toArray();
        $participants = $bindboard->participants()->with('user')->get();

        return Inertia::render('BindBoard/Settings/Settings', [
            'bindboard' => $bindboard,
            'guild' => $guild,
            'invites' => $invites,
            'participants' => $participants,
        ]);
    }

    public function update(Request $request, BindBoard $bindboard)
    {
        $this->authorize('update', $bindboard);

        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:50'],
            'description' => ['nullable', 'string', 'min:2', 'max:200'],
            'voice_channel' => ['nullable', 'string'],
        ]);

        $bindboard->update($request->only('name', 'description'));
        if ($bindboard->guild) {
            $bindboard->guild->selected_voice_channel = $request->voice_channel;
        }
        $bindboard->push();


        return back();
    }

    public function bot(Request $request, BindBoard $bindboard)
    {
        $this->authorize('update', $bindboard);

        $guild = $bindboard->guild;
        if ($guild && $guild->verified) return abort(404);

        if (!$guild) {
            $guild = $bindboard->guild()->create([
                'verification_code' => Str::random(10),
            ]);
        }

        return Inertia::render('BindBoard/Bot', [
            'bindboard' => $bindboard,
            'guild' => $guild,
            'botUrl' => env('BOT_DISCORD_URL', '#')
        ]);
    }
}

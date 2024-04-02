<?php

namespace App\Http\Controllers;

use App\Models\BindBoard;
use App\Models\Invite;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InviteController extends Controller
{
    public function show(Request $request, Invite $invite)
    {
        if (!$invite->active || $invite->active_until < Carbon::today() || ($invite->max_users && $invite->users_used >= $invite->max_users)) {
            $invite->update(['active' => false]);
            return abort(404);
        }

        if (Gate::allows('view', $invite->bindboard)) return abort(404);

        return Inertia::render('Invite', [
            'invite' => $invite,
            'bindboard' => $invite->bindboard,
        ]);
    }

    public function store(Request $request, BindBoard $bindboard)
    {
        $this->authorize('update', $bindboard);

        $request->validate([
            'active_for' => ['required', 'integer', 'min:1', 'max:30'],
            'max_users' => ['nullable', 'integer', 'min:0', 'max:100']
        ]);

        $invites = $bindboard->invites->where('active', true)->where('active_until', '>=', Carbon::today());
        if ($invites->count() >= 5) return back()->withErrors(['active_for' => 'You can have up to 5 active invitations.']);

        $bindboard->invites()->create([
            'active_until' => Carbon::today()->addDays($request->active_for),
            'max_users' => $request->max_users,
            'hash' => Str::random(20),
            'active' => true,
            'created_by' => $request->user()->id,
        ]);

        return back();
    }

    public function destroy(Request $request, Invite $invite)
    {
        $this->authorize('update', $invite->bindboard);

        $invite->update(['active' => false]);

        return back();
    }

    public function accept(Request $request, Invite $invite)
    {
        if (!$invite->active || $invite->active_until < Carbon::today() || ($invite->max_users && $invite->users_used >= $invite->max_users)) {
            $invite->update(['active' => false]);
            return abort(404);
        }
        if (Gate::allows('view', $invite->bindboard)) return abort(404);

        $invite->increment('users_used');
        if ($invite->max_users && $invite->users_used >= $invite->max_users) {
            $invite->update(['active' => false]);
        }
        
        $invite->bindboard->participants()->create([
            'user_id' => $request->user()->id,
            'permissions' => config('constants.permissions.VIEW', 1),
        ]);

        return redirect()->route('bindboard.show', $invite->bindboard->hash);
    }
}

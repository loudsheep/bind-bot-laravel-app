<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function update(Request $request, Participant $participant)
    {
        $this->authorize('update', $participant->bindboard);
        if ($participant->user_id == $request->user()->id) return abort(403);

        $request->validate([
            'permissions' => ['required', 'integer', 'max:1024', 'min:1'],
        ]);

        $participant->update(['permissions' => $request->permissions]);

        return back();
    }

    public function destroy(Request $request, Participant $participant)
    {
        $this->authorize('update', $participant->bindboard);
        if ($participant->user_id == $request->user()->id) return abort(403);

        $participant->delete();

        return back();
    }
}

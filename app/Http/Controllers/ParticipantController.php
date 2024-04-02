<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    public function destroy(Request $request, Participant $participant)
    {
        $this->authorize('update', $participant->bindboard);

        $participant->delete();

        return back();
    }
}

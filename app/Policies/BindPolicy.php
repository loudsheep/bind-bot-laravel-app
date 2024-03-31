<?php

namespace App\Policies;

use App\Models\Bind;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BindPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Bind $bind): bool
    {
        if ($bind->bindBoard->created_by == $user->id) return true;
        $participant = $bind->bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return false;
        return $participant->permissions & config('constants.permissions.VIEW') > 0;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Bind $bind): bool
    {
        if ($bind->bindBoard->created_by == $user->id) return true;
        $participant = $bind->bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return false;
        return $participant->permissions & config('constants.permissions.EDIT_BIND') > 0;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Bind $bind): bool
    {
        if ($bind->bindBoard->created_by == $user->id) return true;
        $participant = $bind->bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return false;
        return $participant->permissions & config('constants.permissions.DELETE_BIND') > 0;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Bind $bind): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Bind $bind): bool
    {
        if ($bind->bindBoard->created_by == $user->id) return true;
        $participant = $bind->bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return false;
        return ($participant->permissions & config('constants.permissions.DELETE_BIND')) > 0;
    }

    /**
     * Determine whether the user can pplay bind on server using bot.
     */
    public function play(User $user, Bind $bind): bool
    {
        if ($bind->bindBoard->created_by == $user->id) return true;
        $participant = $bind->bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return false;
        return ($participant->permissions & config('constants.permissions.PLAY_BIND_ON_SERVER')) > 0;
    }
}

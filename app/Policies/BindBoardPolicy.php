<?php

namespace App\Policies;

use App\Models\BindBoard;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BindBoardPolicy
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
    public function view(User $user, BindBoard $bindBoard): bool
    {
        if ($bindBoard->created_by == $user->id) return true;
        $participant = $bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return false;
        return $participant->permissions & config('constants.permissions.VIEW') > 0;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->createdBindBoards->count() < $user->max_bind_boards;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, BindBoard $bindBoard): bool
    {
        if ($bindBoard->created_by == $user->id) return true;
        $participant = $bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return false;
        return $participant->permissions & config('constants.permissions.ADMIN') > 0;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, BindBoard $bindBoard): bool
    {
        return $bindBoard->created_by == $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, BindBoard $bindBoard): bool
    {
        return $bindBoard->created_by == $user->id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, BindBoard $bindBoard): bool
    {
        return $bindBoard->created_by == $user->id;
    }
}

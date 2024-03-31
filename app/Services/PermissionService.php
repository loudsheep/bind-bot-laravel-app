<?php

namespace App\Services;

use App\Models\BindBoard;
use App\Models\User;

class PermissionService
{
    public function getUserPermissionsForBindboard(User $user, BindBoard $bindBoard)
    {
        if ($bindBoard->created_by == $user->id) return config('constants.permissions', []);

        $participant = $bindBoard->participants()->where('user_id', $user->id)->first();
        if (!$participant) return [];

        $userPermissions = $participant->permissions;
        $permissions = config('constants.permissions', []);

        $result = [];
        foreach ($permissions as $key => $value) {
            if ($userPermissions & $value > 0) {
                array_push($result, $key);
            }
        }
        return $result;
    }
}

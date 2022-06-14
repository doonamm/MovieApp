<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MoviePolicy
{
    use HandlesAuthorization;

    public function onlyAdmin(User $user)
    {
        return $user->role === UserRole::Admin;
    }

    public function onlySelfAndAdmin(User $user, User $u)
    {
        return $user->role === UserRole::Admin || $user->id === $u->id;
    }
}

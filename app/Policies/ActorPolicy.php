<?php

namespace App\Policies;

use App\Models\Actor;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enums\UserRole;

class ActorPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return $user->role === UserRole::Admin;
    }

    public function onlyAdmin(User $user)
    {
        return $user->role === UserRole::Admin;
    }

    public function onlySelfAndAdmin(User $user, User $u)
    {
        return $user->role === UserRole::Admin || $user->id === $u->id;
    }
}

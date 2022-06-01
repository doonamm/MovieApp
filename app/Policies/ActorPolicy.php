<?php

namespace App\Policies;

use App\Models\Actor;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enums\UserRole;

class ActorPolicy
{
    use HandlesAuthorization;
    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->role === UserRole::Admin;
    }
}

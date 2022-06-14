<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Genre;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GenrePolicy
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
        return $user->id === UserRole::Admin;
    }
    public function onlySelfAndAdmin(User $user, User $u)
    {
        return $user->role === UserRole::Admin || $user->id === $u->id;
    }
    public function onlyAdmin(User $user)
    {
        return $user->role === UserRole::Admin;
    }
}

<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    public function onlySelfAndAdmin(User $user, Comment $comment){
        return $user->role === UserRole::Admin || $comment->user_id === $user->id; 
    }
}

<?php

namespace App\Providers;

use App\Models\Actor;
use App\Models\Comment;
use App\Models\Profile;
use App\Models\User;
use App\Policies\ActorPolicy;
use App\Policies\CommentPolicy;
use App\Policies\MoviePolicy;
use App\Policies\ProfilePolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Profile::class => ProfilePolicy::class,
        Comment::class => CommentPolicy::class,
        Actor::class => ActorPolicy::class,
        Comment::class => CommentPolicy::class,
        Movie::class => MoviePolicy::class,

    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use App\Models\Like;
use Illuminate\Validation\Rule;
use App\Models\Comment;
use App\Models\User;

class LikeController extends Controller
{
    public function create(Request $request)
    {
        Like::query()->create([
            'user_id' => $request->input('user_id'),
            'comment_id' => $request->input('comment_id'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Create Like successfully',
        ]);
    }

    public function update(Request $request)
    {
        // update
    }

    public function destroy(Request $request, Like $like)
    {

        $like->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete like successfully'
        ]);
    }

    public function show(Request $request, User $user, Comment $comment)
    {
        return response()->json([
            'data' => Like::query()
                ->where('user_id', $user)
                ->where('comment_id', $comment)
                ->get(),
            'success' => true,
            'message' => 'Show profile successfully'
        ]);
    }
}

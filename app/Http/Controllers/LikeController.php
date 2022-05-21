<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Like;
use App\Models\Comment;
use App\Models\Movie;

class LikeController extends Controller
{
    public function create(Request $request, Movie $movie, Comment $comment)
    {

        $user = JWTAuth::toUser($request->bearerToken());

        $like = Like::query()->create([
            'user_id' => $user->id,
            'comment_id' => $request->input('comment_id'),
        ]);

        $comment->like_count = $comment->like_count + 1;
        $comment->save();

        return response()->json([
            'success' => true,
            'message' => 'Create Like Successfully',
            'data' => $like,
        ]);
    }

    public function destroy(Request $request, Like $like)
    {
        $user = JWTAuth::toUser($request->bearerToken());

        $like->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Like Successfully'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Movie;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LikeController extends Controller
{
    public function create(Request $request, Movie $movie, Comment $comment){
        $userId = JWTAuth::toUser($request->bearerToken())->id;

        $like = Like::query()->where([
            ['user_id', '=', $userId],
            ['comment_id', '=', $comment->id]
        ])->first();

        if($like){
            return response()->json([
                'success' => false
            ]);
        }

        Like::query()->create([
            'user_id' => $userId,
            'comment_id' => $comment->id
        ]);

        $comment->like_count += 1;
        $comment->save();

        return response()->json([
            'success' => true
        ]);
    }

    public function destroy(Request $request, Movie $movie, Comment $comment){
        $userId = JWTAuth::toUser($request->bearerToken())->id;

        $like = Like::query()->where([
            ['user_id', '=', $userId],
            ['comment_id', '=', $comment->id]
        ])->first();

        if(!$like){
            return response()->json([
                'success' => false
            ]);
        }

        Like::query()->where([
            ['user_id', '=', $userId],
            ['comment_id', '=', $comment->id]
        ])->delete();

        $comment->like_count -= 1;
        $comment->save();

        return response()->json([
            'success' => true
        ]);
    }
}

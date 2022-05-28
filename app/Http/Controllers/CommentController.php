<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommentController extends Controller
{
    public function create(Request $request, Movie $movie){
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->toArray()
            ]);
        }

        $userId = JWTAuth::toUser($request->bearerToken())->id;

        $comment = Comment::query()->create([
            'user_id' => $userId,
            'movie_id' => $movie->id,
            'content' => $request->input('content'),
            'like_count' => 0
        ]);

        $movie->comment_count += 1;
        $movie->save();

        return response()->json([
            'success' => true,
            'data' => $comment
        ]);
    }

    public function showAll(Request $request, Movie $movie){
        $list = Comment::query()
                ->where('movie_id', '=', $movie->id)
                ->get();

        return response()->json([
            'success' => true,
            'data' => $list
        ]);
    }

    public function destroy(Request $request, Movie $movie, Comment $comment){
        $this->authorize('onlySelfAndAdmin', $comment);
        
        $comment->delete();
       
        $movie->comment_count -= 1;
        $movie->save();

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted'
        ]);
    }
}

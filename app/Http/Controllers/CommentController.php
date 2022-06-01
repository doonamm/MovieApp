<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommentController extends Controller
{
    public function create(Request $request, Movie $movie)
    {
        $validator = Validator::make($request->all(), [
            'movie_id' => 'required|integer',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'messsage' => 'Create Comment Failed!',
                'error' => $validator->errors()->toArray()
            ]);
        }

        $user = JWTAuth::toUser($request->bearerToken());

        $comment = Comment::query()->create([
            'user_id' => $user->id,
            'movie_id' => $request->input('movie_id'),
            'content' => $request->input('content'),
            'like_count' => 0
        ]);

        return response()->json([
            'success' => true,
            'data' => $comment,
        ]);
    }

    public function destroy(Request $request, Movie $movie, Comment $comment)
    {
        // Xóa một comment của film
        $comment->delete();

        $movie->comment_count = $movie->comment_count - 1;
        $movie->save();

        return response()->json([
            'success' => true,
            'deleted comment' => $comment,
        ]);
    }

    public function showAll(Request $request, Movie $movie)
    {
        $list =  Comment::query()
            ->where('movie_id', $movie->id)
            ->get();

        return response()->json([
            'data' => $list,
            'success' => true,
        ]);
    }
}

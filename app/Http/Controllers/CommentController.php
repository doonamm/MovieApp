<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommentController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'movie_id' => 'required|integer',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->toArray()
            ]);
        }

        $userId = JWTAuth::toUser($request->bearerToken())->id;

        $comment = Comment::query()->create([
            'user_id' => $userId,
            'movie_id' => $request->input('movie_id'),
            'content' => $request->input('content'),
            'like_count' => 0
        ]);

        return response()->json([
            'success' => true,
            'result' => [
                'comment' => $comment,
            ],
        ]);
    }

    public function destroy(Request $request, Comment $comment)
    {
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Comment Successfully',
        ]);
    }

    public function update(Request $request)
    {
        //
    }

    public function show(Request $request, Comment $comment)
    {
        return response()->json([
            'data' => Comment::find($comment),
            'success' => true,
            'message' => "Show Comment Successfully",
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Comment::all(),
            'success' => true,
            'message' => "Show All Comments Successfully",
        ]);
    }
}

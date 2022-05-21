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
            'messsage' => 'Create Comment Successfully!',
            'data' => $comment,
        ]);
    }

    public function destroy(Request $request, Comment $comment)
    {

        $user = JWTAuth::toUser($request->bearerToken());

        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Comment Successfully',
        ]);
    }

    public function update(Request $request, Comment $comment)
    {

        $user = JWTAuth::toUser($request->bearerToken());

        $comment = Comment::findOrFail($comment);
        $validator = Validator::make([
            'user_id' => $user->id,
            'movie_id' => $request->input('movie_id'),
            'content' => $request->input('content'),
            'like_count' => 0
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not correct!',
            ]);
        }

        $comment->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Update Comment Successfully',
            'data' => $comment,
        ]);
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

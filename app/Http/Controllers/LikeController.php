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

        $user = JWTAuth::toUser($request->bearerToken());

        $like = Like::query()->create([
            'user_id' => $user->id,
            'comment_id' => $request->input('comment_id'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Create Like Successfully',
            'data' => $like,
        ]);
    }

    public function update(Request $request, Like $like)
    {
        $user = JWTAuth::toUser($request->bearerToken());

        $like = Like::findOrFail($like);

        $like->update([
            'user_id' => $user->id,
            'comment_id' => $request->input('comment_id'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Update Like Successfully',
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

    public function show(Request $request)
    {
        return response()->json([
            'data' => Like::query()
                ->where('user_id', $request->user)
                ->where('comment_id', $request->comment)
                ->get(),
            'success' => true,
            'message' => 'Show Like Successfully'
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Like::all(),
            'success' => true,
            'message' => 'Show All Likes Successfully'
        ]);
    }
}

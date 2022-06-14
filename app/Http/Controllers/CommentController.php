<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Movie;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

        $profile = DB::table('profiles')->where('user_id', $comment->user_id)->get()[0];

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $comment->id,
                'user_id' => $comment->user_id,
                'nickname' => $profile->nickname,
                'avatar_url' => $profile->avatar_url,
                'content' => $comment->content,
                'like_count' => $comment->like_count,
                'created_at' => Carbon::now('GMT+7')->toDateTimeString(),
            ]
        ]);
    }

    public function showAll(Request $request, Movie $movie){
        $list = DB::table('comments');
        $list = $list->join('profiles', 'profiles.user_id', '=', 'comments.user_id')
                ->where('movie_id', '=', $movie->id)
                ->orderBy('comments.created_at', 'desc')
                ->select('comments.id', 'profiles.user_id', 'profiles.nickname', 'profiles.avatar_url', 'content', 'like_count', 'comments.created_at')
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

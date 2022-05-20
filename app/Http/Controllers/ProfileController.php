<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Profile;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

class ProfileController extends Controller
{
    // Profile 
    // create + update + destroy + show 

    public function create(Request $request)
    {
        $user = JWTAuth::toUser($request->bearerToken());

        $validator = Validator::make($request->all(), [
            'nickname' => 'required|string',
            'gender' => "in:'male','female'",
            'birthday' => 'required|date',
            'avatar_url' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Create Profile Failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        Profile::query()->create([
            'user_id' => $user->id,
            'nickname' => $request->input('nickname'),
            'gender' => $request->input('gender'),
            'birthday' => $request->input('birthday'),
            'avatar_url' => $request->input('avatar_url'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Create Profile Successfully'
        ]);
    }

    public function update(Request $request)
    {
        // Update
    }

    public function destroy(Request $request, Profile $profile)
    {

        $profile->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Profile Successfully'
        ]);
    }

    public function show(Request $request, User $user)
    {
        return response()->json([
            'data' => Profile::find($user),
            'success' => true,
            'message' => 'Show Profile Successfully'
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Profile::all(),
            'success' => true,
            'message' => 'Show All Profiles Successfully'
        ]);
    }
}

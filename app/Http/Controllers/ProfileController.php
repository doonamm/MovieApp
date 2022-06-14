<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileController extends Controller
{
    public function create(Request $request){
        $userId = JWTAuth::toUser($request->bearerToken())->id;

        if(Profile::query()->where('user_id', '=', $userId)->count() > 0){
            return response()->json([
                'success' => false,
                'message' => 'User is already have profile'
            ]);
        }

        $validator = Validator::make($request->all(), [
            'nickname' => 'required|string',
            'gender' => 'required|in:male,female',
            'birthday' => 'required|date'
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Create profile fail',
                'error' => $validator->errors()->toArray()
            ]);
        }

        $profile = Profile::query()->create([
            'user_id' => $userId,
            'nickname' => $request->input('nickname'),
            'gender' => $request->input('gender'),
            'birthday' => $request->input('birthday')
        ]);

        return response()->json([
            'success' => true,
            'data' => $profile
        ]);
    }

    public function showAll(Request $request){
        $this->authorize('onlyAdmin', Profile::class);

        $list = Profile::all();

        return response()->json([
            'success' => true,
            'data' => $list
        ]);
    }

    public function show(Request $request, User $user){
        $this->authorize('onlySelfAndAdmin', $user);

        $profile = Profile::query()->firstWhere('user_id', '=', $user->id);

        return response()->json([
            'success' => true,
            'data' => $profile
        ]);
    }

    public function showPublic(Request $request, User $user){
        $profile = Profile::where('user_id', '=', $user->id)->get(['nickname', 'gender', 'avatar_url']);

        return response()->json([
            'success' => true,
            'data' => $profile
        ]);
    }

    public function update(Request $request, User $user){
        $this->authorize('onlySelfAndAdmin', $user);

        $validator = Validator::make($request->all(), [
            'nickname' => 'string',
            'gender' => 'in:male,female',
            'birthday' => 'date',
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Create profile fail',
                'error' => $validator->errors()->toArray()
            ]);
        }

        $success = Profile::query()->where('user_id', '=', $user->id)->update($request->all());

        if(!$success){
            return response()->json([
                'success' => false,
                'message' => 'Can not update profile'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Update profile success'
        ]);
    }

    public function updateAvatar(Request $request){
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:png,jpg,jpeg|max:2048'
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Create profile fail',
                'error' => $validator->errors()->toArray()
            ]);
        }

        $userId = JWTAuth::toUser($request->bearerToken())->id;
        $profile = Profile::query()->where('user_id', '=', $userId);

        $image = $request->file('image');
        $filename = time().rand(100000, 999999).'.'.$image->getClientOriginalExtension();
        $image->move('uploads/', $filename);

        $profile->update(['avatar_url' => $filename]);

        return response()->json([
            'success' => true,
            'message' => 'Update profile success',
            'data' => $filename
        ]);
    }
}

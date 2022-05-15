<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => Status::FAIL,
                'message' => 'Register fail',
                'error' => $validator->errors()->toArray()
            ]);
        }

        User::query()->create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
            'role' => UserRole::Member
        ]);

        return response()->json([
            'status' => Status::SUCCESS,
            'message' => 'Register successfully'
        ]);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => Status::FAIL,
                'message' => 'Login fail',
                'error' => $validator->errors()->toArray()
            ]);
        }

        $credentials = $request->only('username', 'password');
        try{
            $token = JWTAuth::attempt($credentials);
            
            if(!$token){
                return response()->json([
                    'status' => Status::FAIL,
                    'message' => 'Wrong username or password'
                ]);
            }

            return response()->json([
                'status' => Status::SUCCESS,
                'token' => $token
            ]);
        }
        catch(JWTException $e){
            return response()->json([
                'status' => Status::FAIL,
                'error' => $e
            ]);
        }
    }

    public function logout(Request $request){
        JWTAuth::invalidate($request->bearerToken());

        return response()->json([
            'status' => Status::SUCCESS,
            'message' => 'Logout success'
        ]);
    }

    function getInfo(Request $request){
        $user = JWTAuth::toUser($request->bearerToken());

        return response()->json([
            'status' => Status::SUCCESS,
            'user' => $user
        ]);
    }

    function getUserInfo(Request $request, User $user){
        $this->authorize('getUserInfo', User::class);

        return response()->json([
            'status' => Status::SUCCESS,
            'user' => $user
        ]);
    }
}

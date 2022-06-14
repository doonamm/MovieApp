<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Register fail',
                'error' => $validator->errors()->toArray()
            ]);
        }

        $user = User::query()->create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
            'role' => UserRole::Member
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Register successfully',
            'data' => $user,
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Login fail',
                'error' => $validator->errors()->toArray()
            ]);
        }

        $credentials = $request->only('username', 'password');
        try {
            $token = JWTAuth::attempt($credentials);

            if (!$token) {
                return response()->json([
                    'success' => false,
                    'message' => 'Wrong username or password'
                ]);
            }

            $userId = Auth::guard('api')->user()->id;

            return response()->json([
                'success' => true,
                'user_id' => $userId,
                'token' => $token
            ]);

        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'error' => $e
            ]);
        }
    }

    public function logout(Request $request)
    {
        JWTAuth::invalidate($request->bearerToken());

        return response()->json([
            'success' => true,
            'message' => 'Logout success'
        ]);
    }

    public function getAllUser(Request $request)
    {
        $this->authorize('onlyAdmin', User::class);

        $list = User::all();

        return response()->json([
            'success' => true,
            'data' => $list,
        ]);
    }

    public function getUserInfo(Request $request, User $user)
    {
        $this->authorize('onlyAdmin', User::class);

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function destroy(Request $request, User $user)
    {
        $this->authorize('onlyAdmin', User::class);

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete user success'
        ]);
    }
}

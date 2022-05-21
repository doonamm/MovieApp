<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Actor;

class ActorController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'popularity' => 'numeric',
            'profile_path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Create Actor Failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        Actor::query()->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Create Actor Successfully',
        ]);
    }

    public function update(Request $request, Actor $actor)
    {
        $actor = Actor::findOrFail($actor);
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'popularity' => 'numeric',
            'profile_path' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not correct!',
            ]);
        }

        $actor->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Update Actor Successfully',
            'data' => $actor,
        ]);
    }

    public function destroy(Request $request, Actor $actor)
    {
        $actor->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Actor Successfully',
        ]);
    }

    public function show(Request $request, Actor $actor)
    {
        return response()->json([
            'data' => Actor::find($actor),
            'success' => true,
            'message' => 'Show Actor Successfully'
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Actor::all(),
            'success' => true,
            'message' => 'Show All Actors Successfully'
        ]);
    }
}

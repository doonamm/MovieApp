<?php

namespace App\Http\Controllers;

use App\Models\Cast;
use App\Models\Movie;
use App\Models\Actor;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class CastController extends Controller
{
    public function create(Request $request, Movie $movie, Actor $actor)
    {
        $validator = Validator::make($request->all(), [
            'character' => "required|string",
            'movie_id' => 'required|string',
            'actor_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Create Cast Failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        $cast = Cast::create([
            'movie_id' => $request->input($movie->id),
            'actor_id' => $request->input($actor->id),
            'character' => $request->input('character'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Create Cast Successfully',
            'data' => $cast,
        ]);
    }

    public function destroy(Request $request, Cast $cast)
    {
        $cast->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Cast Successfully',
        ]);
    }

    public function show(Request $request, Cast $cast)
    {
        return response()->json([
            'data' => $cast,
            'success' => true,
            'message' => 'Show Cast Successfully'
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Cast::all(),
            'success' => true,
            'message' => 'Show All Casts Successfully'
        ]);
    }
}

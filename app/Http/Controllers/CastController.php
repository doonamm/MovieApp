<?php

namespace App\Http\Controllers;

use App\Models\Cast;
use App\Models\Movie;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

use Illuminate\Http\Request;

class CastController extends Controller
{
    // public function create(Request $request, Movie $movie)
    // {
    //     $this->authorize('onlyAdmin', Cast::class);

    //     $validator = Validator::make($request->all(), [
    //         'character' => "required|string",
    //         'movie_id' => 'required|string',
    //         'actor_id' => 'required|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Create Cast Failed',
    //             'error' => $validator->errors()->toArray(),
    //         ]);
    //     }

    //     $cast = Cast::create($request->validated());

    //     return response()->json([
    //         'success' => true,
    //         'data' => $cast,
    //     ]);
    // }

    // public function destroy(Request $request, Cast $cast)
    // {
    //     $this->authorize('onlyAdmin', $cast);

    //     $cast->delete();

    //     return response()->json([
    //         'success' => true,
    //     ]);
    // }

    // public function show(Request $request, Cast $cast)
    // {
    //     return response()->json([
    //         'data' => $cast,
    //         'success' => true,
    //     ]);
    // }

    public function showAll(Request $request, Movie $movie)
    {
        $list = Cast::join('ACTORs', 'CASTs.actor_id', '=', 'ACTORs.id')
            ->where('movie_id', $movie->id)
            ->select('actors.id', 'actors.name', 'actors.profile_path')
            ->get();

        return response()->json([
            'data' => $list,
            'success' => true,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    //

    public function create(Request $request)
    {
        //this is a test

        $validator = Validator::make($request->all(), [
            'adult' => 'required|boolean',
            'title' => 'required|string',
            'tagline' => 'required|string',
            'overview' => 'required|string',
            'status' => 'required|string',
            'poster_path' => 'required|string',
            'language' => 'required|string',
            'popularity' => 'required|double',
            'vote_average' => 'required|numeric',
            'vote_count' => 'required|integer',
            'revenue' => 'required|integer',
            'comment' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Create Movie Failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        $movie = Movie::query()->create([$request->validated()]);

        return response()->json([
            'success' => true,
            'message' => 'Create Movie Successfully',
            'data' => $movie,
        ]);
    }

    public function update(Request $request, Movie $movie)
    {
        $movie = Movie::findOrFail($movie);
        $validator = Validator::make($request->all(), [
            'adult' => 'boolean',
            'title' => 'string',
            'tagline' => 'string',
            'overview' => 'string',
            'status' => 'string',
            'poster_path' => 'string',
            'language' => 'string',
            'popularity' => 'double',
            'vote_average' => 'numeric',
            'vote_count' => 'integer',
            'revenue' => 'integer',
            'comment' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not correct!',
            ]);
        }

        $movie->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Update Movie Successfully',
            'data' => $movie,
        ]);
    }

    public function destroy(Request $request, Movie $movie)
    {
        $movie->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Movie Successfully'
        ]);
    }

    public function show(Request $request, Movie $movie)
    {
        return response()->json([
            'data' => Movie::find($movie),
            'success' => true,
            'message' => 'Show Movie Successfully'
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Movie::all(),
            'success' => true,
            'message' => 'Show All Movies Successfully'
        ]);
    }
}

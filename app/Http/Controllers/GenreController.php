<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Genre;

class GenreController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Create Genre Failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        $genre = Genre::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Create Genre Successful',
            'data' => $genre,
        ]);
    }

    public function destroy(Request $request, Genre $genre)
    {
        $genre->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Genre Successfully',
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Genre::all(),
            'success' => true,
            'message' => 'Show All Genre Successfully',
        ]);
    }
}

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
                'message' => 'Create Gerne failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        Genre::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Create Gerne successful',
        ]);
    }

    public function update()
    {
        // Update
    }

    public function destroy(Request $request, Genre $genre)
    {
        $genre->delete();

        return response()->json([
            'success' => true,
            'message' => 'Show genre successfully',
        ]);
    }
}

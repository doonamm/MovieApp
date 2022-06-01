<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Genre;

class GenreController extends Controller
{
    public function create(Request $request)
    {
        $this->authorize('create', Genre::class);

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

        $genre = Genre::query()->create([
            'name' => $request->input('name')
        ]);

        return response()->json([
            'success' => true,
            'data' => $genre,
        ]);
    }

    public function destroy(Request $request, Genre $genre)
    {
        $genre->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    public function showAll(Request $request)
    {
        $list = Genre::all();

        return response()->json([
            'data' => $list,
            'success' => true,
        ]);
    }
}

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
                'message' => 'Create Gerne Failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        Genre::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Create Gerne Successful',
        ]);
    }

    public function update(Request $request, Genre $genre)
    {
        $genre = Genre::findOrFail($genre);
        $validator = Validator::make($request->all(), [
            'name' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not correct!',
            ]);
        }

        $genre->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Update Genre Successfully',
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

    public function show(Request $request, Genre $genre)
    {
        return response()->json([
            'data' => Genre::find($genre),
            'success' => true,
            'message' => 'Show Genre Successfully',
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

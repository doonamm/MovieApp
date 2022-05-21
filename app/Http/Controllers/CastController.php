<?php

namespace App\Http\Controllers;

use App\Models\Cast;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class CastController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'character' => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Create Cast Failed',
                'error' => $validator->errors()->toArray(),
            ]);
        }

        $cast = Cast::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Create Cast Successfully',
            'data' => $cast,
        ]);
    }

    public function update(Request $request, Cast $cast)
    {
        $cast = Cast::findOrFail($cast);
        $validator = Validator::make($request->all(), [
            'character' => "string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not correct!',
            ]);
        }

        $cast->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Update Cast Successfully',
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
        $cast = Cast::findOrFail($cast);
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
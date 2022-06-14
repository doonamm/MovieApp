<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Actor;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ActorController extends Controller
{

    public function create(Request $request)
    {
        $this->authorize('onlyAdmin', Actor::class);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'birthday' => 'required|date',
            'gender' => 'required|in:female,male',
            'place_of_birth' => 'required|string',
            'profile_path' => 'required|string',
            'biography' => 'required|string',
            'imdb_id' => 'required|string',
            'popularity' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->toArray(),
            ]);
        }
        $actor = Actor::create([
            'name' => $request->input('name'),
            'birthday' => $request->input('birthday'),
            'gender' => $request->input('gender'),
            'place_of_birth' => $request->input('place_of_birth'),
            'profile_path' => $request->input('profile_path'),
            'biography' => $request->input('biography'),
            'imdb_id' => $request->input('imdb_id'),
            'popularity' => $request->input('popularity'),
        ]);

        return response()->json([
            'success' => true,
            'data' => $actor,
        ]);
    }

    public function update(Request $request, Actor $actor)
    {
        $this->authorize('onlyAdmin');

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'birthday' => 'date',
            'gender' => 'in:female,male',
            'place_of_birth' => 'string',
            'profile_path' => 'string',
            'biography' => 'string',
            'imdb_id' => 'string',
            'popularity' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Data is not correct!',
            ]);
        }

        $actor->update([
            'name' => $request->input('name'),
            'birthday' => $request->input('birthday'),
            'gender' => $request->input('gender'),
            'place_of_birth' => $request->input('place_of_birth'),
            'profile_path' => $request->input('profile_path'),
            'biography' => $request->input('biography'),
            'imdb_id' => $request->input('imdb_id'),
            'popularity' => $request->input('popularity'),
        ]);

        return response()->json([
            'success' => true,
            'data' => $actor,
        ]);
    }

    public function destroy(Request $request, Actor $actor)
    {

        $this->authorize('onlyAdmin');

        $actor->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Actor Successfully',
        ]);
    }

    public function show(Request $request, Actor $actor)
    {
        return response()->json([
            'data' => $actor,
            'success' => true,
        ]);
    }

    public function showAll(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sort_by' => ['regex:/(id|popularity|name)\.(asc|desc)/'],
            'limit' => 'integer|gte:1|lte:100',
            'next' => 'integer|gte:1',
            'search' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->toArray()
            ]);
        }

        $list = DB::table('actors');

        if ($request->has('search')) {
            $search = $request->input('search');
            $list->where('name', 'LIKE', "%$search%");
        }

        if ($request->has('sort_by')) {
            $sortBy = explode('.', $request->input('sort_by'));
            $list->orderBy($sortBy[0], $sortBy[1]);
        }

        $length = $list->count();

        if ($request->has('next')) {
            $next = $request->input('next');
            $list = $list->skip($next);
        }

        $limit = $request->input('limit', 20);
        $list->limit($limit);

        $list = $list->distinct()->get();

        return response()->json([
            'success' => true,
            'data' => $list,
            'totalLength' => $length
        ]);
    }
}

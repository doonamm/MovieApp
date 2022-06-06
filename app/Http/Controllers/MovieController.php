<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    //

    public function create(Request $request){
        
    }

    public function show(Request $request){
        $validator = Validator::make($request->all(), [
            'sort-by' => 'regex:/(id|popularity|title|release_date|vote_average|vote_count)\.(asc|desc)/',
            'casts' => 'array',
            'casts.*' => 'string',
            'genres' => 'array',
            'genres.*' => 'string',
            'month' => 'integer',
            'year' => 'integer',
            'release_date' => 'date',
            'limit' => 'interger|gt:-1'
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => true,
                'error' => $validator->errors()->toArray()
            ]);
        }

        $list = new Movie;

        if($request->input('release_date')){
            $date = $request->input('release_date');
            $list = $list->where('release_date', $date);
        }

        $limit = $request->input('limit', 40);
        if($limit > -1){
            $list = $list->limit($limit);
        }

        if($request->input('sortby')){
            $sortBy = $request->input('sort-by')->explode('.');
            $list = $list->orderBy([$sortBy[0], $sortBy[1]]);
        }

        $list = $list->get();

        return response()->json([
            'success' => true,
            'data' => $list
        ]);
    }

    public function destory(Request $request, Movie $movie){
        $movie->delete();

        return response()->json([
            'success' => true,
            'message' => 'Deleted movie'
        ]);
    }
}

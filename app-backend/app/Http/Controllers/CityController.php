<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * get all Cities
     *
     * @return JsonResponse
     */
    public function all(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => null, 'success' => false];

        $columns = $request->input('columns');
        $conditions = $request->input('condition');

        if (is_array($conditions) && !empty($conditions)) {
            $cities = City::query();

            foreach ($conditions as $key => $value) {
                $keyParts = explode(' ', $key);
                $cities->where($keyParts[0], $keyParts[1], $value);
            }

            $cities = $cities->get($columns);
        } else {
            $cities = City::all($columns);
        }

        if ($cities->isNotEmpty()) {
            $result['data'] = $cities;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    public function citiesByCountryId($lang, $countryId, Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => null, 'success' => false];
        $columns = $request->input('columns');

        $cities = City::query()->where('country_id', '=', $countryId)->get($columns);

        if($cities) {
            $result['data'] = $cities;
            $result['success'] = true;
        }


        return response()->json($result);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\City $city
     * @return \Illuminate\Http\Response
     */
    public function show(City $city)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\City $city
     * @return \Illuminate\Http\Response
     */
    public function edit(City $city)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\City $city
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, City $city)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\City $city
     * @return \Illuminate\Http\Response
     */
    public function destroy(City $city)
    {
        //
    }
}

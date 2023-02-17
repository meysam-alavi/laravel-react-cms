<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PhpParser\Lexer\TokenEmulator\FlexibleDocStringEmulator;

/**
 * CountryController class
 */
class CountryController extends Controller
{
    /**
     * get all country
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function all(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => null, 'success' => false];

        $columns = $request->input('columns');
        $conditions = $request->input('conditions');

        if (is_array($conditions) && !empty($conditions)) {
            $countries = Country::query();

            foreach ($conditions as $key => $value) {
                $keyParts = explode(' ', $key);
                $countries->where($keyParts[0], $keyParts[1], $value);
            }

            $countries = $countries->get($columns);
        } else {
            $countries = Country::all($columns);
        }


        if ($countries->isNotEmpty()) {
            $result['data'] = $countries;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * get countries by continentId
     *
     * @param string $lang
     * @param string $continentId
     * @param Request $request
     * @return JsonResponse
     */
    public function countriesByContinentId(string $lang, string $continentId, Request $request): JsonResponse
    {
        $request->merge(['continent_id' => $continentId]);
        $request->validate([
            // TODO: |exist:continents,iso2,
            'continent_id' => 'required',
            'columns' => 'required|array'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $columns = $request->input('columns', ['*']);
        $countries = Country::query()->where('continent_id', '=', $continentId)->get($columns);

        if ($countries->isNotEmpty()) {
            $result['data'] = $countries;
            $result['success'] = true;
        }

        return response()->json($result);
    }
}

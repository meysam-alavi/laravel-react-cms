<?php

namespace App\Http\Controllers;

use App\Models\Continent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ContinentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $rpp = $request->rpp;

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $continents = Continent::query()
            ->orderBy('id', 'DESC')
            ->paginate($rpp);


        if ($continents->isNotEmpty()) {
            $result['data'] = $continents;
            $result['success'] = true;
        }


        return response()->json($result);
    }

    /**
     * @return JsonResponse
     */
    public function all(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => null, 'success' => false];

        $columns = $request->input('columns');

        $continents = Continent::all($columns);

        if ($continents->isNotEmpty()) {
            $result['data'] = $continents;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param Continent $continent
     * @return Response
     */
    public function show(Continent $continent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Continent $continent
     * @return Response
     */
    public function edit(Continent $continent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Continent $continent
     * @return Response
     */
    public function update(Request $request, Continent $continent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Continent $continent
     * @return Response
     */
    public function destroy(Continent $continent)
    {
        //
    }
}

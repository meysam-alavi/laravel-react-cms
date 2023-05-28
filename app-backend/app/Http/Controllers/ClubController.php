<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\FileUsage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * create new club
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $request['created_by'] = 1;

        $club = Club::query()->create($request->all());
        if ($club) {
            $imageId = $request->input('imageId');

            if ($imageId) {
                $fileUsageData = [
                    'content_id' => $club->id,
                    'file_id' => $imageId,
                    'module_id' => 6,
                    'module_section' => 'club',
                    'usage' => 'main-image'
                ];

                FileUsage::query()->create($fileUsageData);
            }

            $result['data'] = $club;
            $result['success'] = true;
        }

        return response()->json($result);
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
     * @param Club $club
     * @return Response
     */
    public function show(Club $club)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Club $club
     * @return Response
     */
    public function edit(Club $club)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Club $club
     * @return Response
     */
    public function update(Request $request, Club $club)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Club $club
     * @return Response
     */
    public function destroy(Club $club)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\JobsGroup;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class JobsGroupController extends Controller
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
     * create JobsGroup
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $request['created_by'] = 1;
        $request['updated_by'] = 1;

        $jobsGroup = JobsGroup::query()->create($request->all());

        if ($jobsGroup) {
            $result['data'] = $jobsGroup;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * jobs group paginate list
     *
     * @return JsonResponse
     */
    public function paginateList(): JsonResponse
    {
        $jobsGroups = JobsGroup::query()
            ->orderBy('id', 'desc')
            ->paginate(2);

        return response()->json($jobsGroups);
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
     * @param JobsGroup $jobsGroup
     * @return Response
     */
    public function show(JobsGroup $jobsGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param JobsGroup $jobsGroup
     * @return Response
     */
    public function edit(JobsGroup $jobsGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param JobsGroup $jobsGroup
     * @return Response
     */
    public function update(Request $request, JobsGroup $jobsGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param JobsGroup $jobsGroup
     * @return Response
     */
    public function destroy(JobsGroup $jobsGroup)
    {
        //
    }
}

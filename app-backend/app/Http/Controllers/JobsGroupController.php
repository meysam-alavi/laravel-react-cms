<?php

namespace App\Http\Controllers;

use App\Models\JobsCategory;
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
     * create JobsCategory
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required',
            'status' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $request['created_by'] = 1;
        $request['updated_by'] = 1;

        $jobsGroup = JobsCategory::query()->create($request->all());

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
        $jobsGroups = JobsCategory::query()
            ->orderBy('id', 'desc')
            ->paginate(12);

        return response()->json($jobsGroups);
    }

    public function getAll()
    {
        $result = array('data' => null, 'messages' => null, 'success' => false);

        $jobsGroups = JobsCategory::query()
            ->where('parent_id', '=', 0)
            ->get();

        if($jobsGroups->isNotEmpty()) {
            $result['data'] = $jobsGroups;
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
     * @param JobsCategory $jobsGroup
     * @return Response
     */
    public function show(JobsCategory $jobsGroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param JobsCategory $jobsGroup
     * @return Response
     */
    public function edit(JobsCategory $jobsGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param JobsCategory $jobsGroup
     * @return Response
     */
    public function update(Request $request, JobsCategory $jobsGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param JobsCategory $jobsGroup
     * @return Response
     */
    public function destroy(JobsCategory $jobsGroup)
    {
        //
    }
}

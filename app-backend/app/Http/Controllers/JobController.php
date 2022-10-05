<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobsCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobController extends Controller
{
    private static $jobsRootPath = 'public/jobs/jobs/';

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
     * add new job
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required',
            'parent_id' => 'required'
        ]);

        $result = array('data' => null, 'messages' => null, 'success' => false);

        $request['created_by'] = 1;

        $job = JobsCategory::query()->create($request->all());

        if($job) {

            $imageFile = $request->file('image');
            if($imageFile) {
                $id = $job->id;
                $imageExtension = $imageFile->clientExtension();
                $imageName = $id.'.'.$imageExtension;

                $imageDir = self::$jobsRootPath.$id.'/image/';
                $imageFile->storeAs($imageDir, $imageName);

                $job->image = str_replace('public/', '/storage/', $imageDir.$imageName);
                $job->save();
            }

            $result['data'] = $job;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function show(Job $job)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job $job)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Job  $job
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job $job)
    {
        //
    }
}

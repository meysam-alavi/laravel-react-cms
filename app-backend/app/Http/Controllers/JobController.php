<?php

namespace App\Http\Controllers;

use App\Models\FileUsage;
use App\Models\JobsCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Morilog\Jalali\Jalalian;

class JobController extends Controller
{
    //private static $jobsRootPath = 'public/jobs/jobs/';

    private static array $statusToggleMap = array(
        'A' => 'D',
        'D' => 'A'
    );

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

        if ($job) {

            $fileUsageData = array(
                'content_id' => $job->id,
                'file_id' => $request->input('image_id'),
                'module_id' => 5,
                'module_section' => 'job',
                'usage' => 'main-image',
            );

            $fileUsage = FileUsage::query()->create($fileUsageData);

            if($fileUsage) {
                $result['data'] = $job;
                $result['success'] = true;
            }


            /*$imageFile = $request->file('image');
            if ($imageFile) {
                $id = $job->id;
                $imageExtension = $imageFile->clientExtension();
                $imageName = $id . '.' . $imageExtension;

                $imageDir = self::$jobsRootPath . $id . '/image/';
                $imageFile->storeAs($imageDir, $imageName);

                $job->image = str_replace('public/', '/storage/', $imageDir . $imageName);
                $job->save();
            }*/
        }

        return response()->json($result);
    }

    /**
     * get paginate list
     *
     * @return JsonResponse
     */
    public function paginateList(): JsonResponse
    {
        $jobs = JobsCategory::query()
            ->where('parent_id', '!=', 0)
            ->orderBy('id', 'desc')
            ->paginate(10);

        if ($jobs->isNotEmpty()) {
            foreach ($jobs as $job) {
                $job->created_at = Jalalian::fromCarbon($job->created_at);
                $job->updated_at = Jalalian::fromCarbon($job->updated_at);
            }
        }

        return response()->json($jobs);
    }

    public function toggleStatus($lang, $id, Request $request)
    {
        $request->merge(['id' => $id]);
        $request->validate([
            'id' => 'required',
            'status-type' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $statusType = $request->input('status-type');

        $job = JobsCategory::query()->find($id);

        if ($job) {
            if ($statusType === 'status') {
                $job->status = self::$statusToggleMap[$job->status];
            } else {
                $job->display_status = self::$statusToggleMap[$job->display_status];
            }

            $job->save();

            $result['data'] = $job;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * delete job by id
     *
     * @param $lang
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function delete($lang, $id, Request $request): JsonResponse
    {
        $request->merge(['id' => $id]);
        $request->validate([
            'id' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $job = JobsCategory::query()
            ->where('id', '=', $id)
            ->delete();

        if ($job) {
            $result['success'] = true;
        }

        return response()->json($result);
    }
}

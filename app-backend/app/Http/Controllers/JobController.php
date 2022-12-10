<?php

namespace App\Http\Controllers;

use App\Models\FileUsage;
use App\Models\JobsCategory;
use App\Models\Multimedia;
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
            $imageId = $request->input('imageId');
            if ($imageId) {
                $fileUsageData = array(
                    'content_id' => $job->id,
                    'file_id' => $imageId,
                    'module_id' => 5,
                    'module_section' => 'job',
                    'usage' => 'main-image'
                );

                FileUsage::query()->create($fileUsageData);
            }

            $result['data'] = $job;
            $result['success'] = true;


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
                $image = FileUsage::query()
                    ->where('content_id', '=', $job->id)
                    ->where('usage', '=', 'main-image')
                    ->get(['file_id']);

                $job->imageId = '';
                $job->imagePath = '';
                if ($image->isNotEmpty()) {
                    $imageId = $image[0]['file_id'];
                    $job->imageId = $imageId;

                    $multimedia = Multimedia::query()
                        ->where('id', '=', $imageId)
                        ->get(['name','extra_info']);

                    if ($multimedia->isNotEmpty()) {
                        $extraInfo = json_decode($multimedia[0]['extra_info']);

                        if ($extraInfo->path) {
                            $job->imagePath = $extraInfo->path.'/'.$multimedia[0]['name'];
                        }
                    }
                }

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


    /**
     * find by id
     *
     * @param string $lang
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function findById(string $lang, int $id, Request $request): JsonResponse
    {
        $request->merge(['id' => $request]);
        $request->validate([
            'id' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $job = JobsCategory::query()
            ->where('id', '=', $id)
            ->get(['title', 'description', 'parent_id']);

        if ($job->isNotEmpty()) {
            $imageUsage = FileUsage::query()
                ->where('content_id', '=', $id)
                ->where('usage', '=', 'main-image')
                ->get(['file_id']);

            if ($imageUsage->isNotEmpty()) {
                $imageId = $imageUsage[0]['file_id'];
                $job[0]['imageId'] = $imageId;
                $imageExtraInfo = Multimedia::query()
                    ->where('id', '=', $imageId)
                    ->get(['name', 'extra_info']);

                if ($imageExtraInfo->isNotEmpty()) {
                    $extraInfo = json_decode($imageExtraInfo[0]['extra_info']);
                    if (isset($extraInfo->path)) {
                        $path = $extraInfo->path . '/' . $imageExtraInfo[0]['name'];
                        $job[0]['imagePath'] = $path;
                    }
                }
            }

            $result['data'] = $job[0];
            $result['success'] = true;
        }

        return response()->json($result);
    }

    public function edit($lang, $id, Request $request)
    {
        $request->merge(['id' => $id]);
        $request->validate([
            'id' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $job = JobsCategory::query()->find($id);

        if ($job) {
            $job->title = $request->title;
            $job->description = $request->description;
            $job->parent_id = $request->parentId;

            if ($job->save()) {
                if ($request->imageId) {
                    $row = array(
                        'content_id' => $job->id,
                        'file_id' => $request->imageId,
                        'module_id' => 5,
                        'module_section' => 'job',
                        'usage' => 'main-image'
                    );

                    FileUsage::query()->create($row);
                }

                $result['data'] = ['imageId' => $request->imageId];
                $result['success'] = true;
            }
        }

        return response()->json($result);
    }

    /**
     * delete file
     *
     * @param $lang
     * @param $jobId
     * @param $fileId
     * @param $usage
     * @return JsonResponse
     */
    public function deleteFile($lang, $jobId, $fileId, $usage): JsonResponse
    {
        $result = ['data' => null, 'message' => null, 'success' => false];

        $delete = FileUsage::query()
            ->where('content_id', '=', $jobId)
            ->where('file_id', '=', $fileId)
            ->where('usage', '=', $usage)
            ->delete();

        if($delete) {
            $result['success'] = true;
        }

        return response()->json($result);
    }
}

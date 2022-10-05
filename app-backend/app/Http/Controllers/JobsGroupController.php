<?php

namespace App\Http\Controllers;

use App\Models\JobsCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Morilog\Jalali\Jalalian;


class JobsGroupController extends Controller
{
    private static string $jobsGroupRootPath = 'public/jobs/jobs-group/';

    private static array $statusToggleMap = array(
        'A' => 'D',
        'D' => 'A'
    );

    public function __construct()
    {
        parent::__construct();
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
            $imageFile = $request->file('image');

            if ($imageFile) {
                $id = $jobsGroup->id;
                $fileExtension = $imageFile->clientExtension();
                $imageDir = self::$jobsGroupRootPath . $id . '/image/';
                $imageName = $id . '.' . $fileExtension;
                $imageFile->storeAs($imageDir, $imageName);

                $jobsGroup->image = str_replace('public/', '/storage/', $imageDir . $imageName);
                $jobsGroup->save();
            }

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
            ->where('parent_id', '=', 0)
            ->orderBy('id', 'desc')
            ->paginate(10);


        if ($jobsGroups->isNotEmpty()) {
            foreach($jobsGroups as $jobsGroup) {
                $jobsGroup->created_at = Jalalian::fromCarbon($jobsGroup->created_at);
                $jobsGroup->updated_at = Jalalian::fromCarbon($jobsGroup->updated_at);
            }
        }

        return response()->json($jobsGroups);
    }

    public function getAll()
    {
        $result = array('data' => null, 'messages' => null, 'success' => false);

        $jobsGroups = JobsCategory::query()
            ->where('parent_id', '=', 0)
            ->get();

        if ($jobsGroups->isNotEmpty()) {
            $result['data'] = $jobsGroups;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'status-type' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $id = $request->input('id');
        $statusType = $request->input('status-type');
        $jobsGroup = JobsCategory::query()->find($id);

        if ($jobsGroup) {
            if ($statusType == 'status') {
                $jobsGroup->status = self::$statusToggleMap[$jobsGroup->status];

                $jobs = JobsCategory::query()->where('parent_id', '=', $id)->get();

                if ($jobs) {
                    foreach ($jobs as $job) {
                        $job->status = self::$statusToggleMap[$job->status];
                        $job->save();
                    }
                }
            } else {
                $jobsGroup->display_status = self::$statusToggleMap[$jobsGroup->display_status];

                $jobs = JobsCategory::query()->where('parent_id', '=', $id)->get();

                if ($jobs) {
                    foreach ($jobs as $job) {
                        $job->display_status = self::$statusToggleMap[$job->display_status];
                        $job->save();
                    }
                }
            }


            $jobsGroup->save();

            $result['data'] = $jobsGroup;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
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

        $jobsOfJobsGroup = JobsCategory::query()
            ->where('parent_id', '=', $id);

        $result['messages']['errors'] = array(
            $id => " گروه شغلی با شناسه ی {$id} دارای مشاغل می باشد."

        );
        /*if(!$jobsOfJobsGroup) {
            $jobsGroup = JobsCategory::query()
                ->where('id', '=', $id)
                ->delete();

            if ($jobsGroup) {
                $result['success'] = true;
                $result['messages'] = null;
            }
        }*/

        return response()->json($result);
    }

    /**
     * find jobs group by id
     *
     * @param $lang
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function findById($lang, $id, Request $request): JsonResponse
    {
        $request->merge(['id' => $id]);

        $request->validate([
            'id' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $jobsGroup = JobsCategory::query()->find($id);

        if ($jobsGroup) {
            $result['data'] = $jobsGroup;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * edit jobs group info
     *
     * @param $lang
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function edit($lang, $id, Request $request): JsonResponse
    {
        $request->merge(['id' => $id]);
        $request->validate([
            'title' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $jobsGroup = JobsCategory::query()->find($id);

        if ($jobsGroup) {

            $jobsGroup->title = $request->title;
            $jobsGroup->description = $request->description;

            $imageObject = $request->file('image');
            if ($imageObject) {
                $imageExtension = $imageObject->getClientOriginalExtension();
                $imageName = $id.'.'.$imageExtension;

                $imageDir = self::$jobsGroupRootPath.$id.'/image/';
                $imageFullPath = $imageDir.$imageName;

                $imageObject->storeAs($imageDir, $imageName);

                $jobsGroup->image = str_replace('public/', '/storage/', $imageFullPath);
            }

            $jobsGroup->save();

            $result['data'] = $jobsGroup;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * delete main image on jobs group
     *
     * @param $lang
     * @param $jobsGroupId
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteMainImage($lang, $jobsGroupId, Request $request): JsonResponse
    {
        $request->merge(['id' => $jobsGroupId]);
        $request->validate([
            'id' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $jobsGroup = JobsCategory::query()->find($jobsGroupId);

        if($jobsGroup) {
            $imagePath = str_replace('/storage/', '/public/', $jobsGroup->image);
            if (Storage::delete($imagePath)) {
                $jobsGroup->image = null;
                $jobsGroup->save();

                $result['success'] = true;
            }
        }


        return response()->json($result);
    }
}

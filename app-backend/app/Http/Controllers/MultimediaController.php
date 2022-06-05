<?php

namespace App\Http\Controllers;

use App\Models\Multimedia;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Morilog\Jalali\Jalalian;
use phpDocumentor\Reflection\Types\Self_;

class MultimediaController extends Controller
{
    public static $multimediaBasePath = '/public/multimedia';
    public static $videoBasePath = '/public/multimedia/videos';
    private $multimediaDirInStorage;


    public function __construct()
    {
        $this->multimediaDirInStorage = storage_path('app/public/multimedia/');

        parent::__construct();
    }

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
     * @return JsonResponse
     */
    public function directoryMap(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => null, 'success' => false];

        $groupType = $request->input('groupType');

        $videos = Multimedia::query()->where('group_type', '=', $groupType)->get();
        $directoryTree = $this->getDirectoryTree($videos);

        $result['data'] = $directoryTree;
        $result['success'] = true;

        return response()->json($result);
    }

    private function getDirectoryTree($items, $directoryTree = [])
    {
        $rootId = 0;
        if ($items->isNotEmpty()) {
            foreach ($items as $key => $item) {
                if ($item->parent_id == 0) {
                    $rootId = $item->id;
                    $root = array(
                        'id' => $item->id,
                        'name' => $item->name,
                        'dateCreated' => Jalalian::forge($item->created_at)->toString(),
                        'dateModified' => Jalalian::forge($item->updated_at)->toString(),
                        'isDirectory' => true,
                        'parentId' => $item->parent_id
                    );
                } elseif ($item->parent_id == $rootId) {
                    $directoryTree[$item->id] = array(
                        'id' => $item->id,
                        'name' => $item->name,
                        'dateCreated' => Jalalian::forge($item->created_at)->toString(),
                        'dateModified' => Jalalian::forge($item->updated_at)->toString(),
                        'isDirectory' => false,
                        'parentId' => $item->parent_id
                    );

                    if ($item->is_dir === 'T') {
                        $directoryTree[$item->id]['isDirectory'] = true;
                        $directoryTree[$item->id]['items'] = $this->getChildes($items, $item->id);
                    }

                    $root['items'][] = $directoryTree[$item->id];
                }

                $items->forget($key);
            }
        }

        return $root;
    }

    private function getChildes($items, $id): array
    {
        $result = array();
        foreach ($items as $item) {
            if ($item->parent_id == $id) {
                $result[] = array(
                    'id' => $item->id,
                    'name' => $item->name,
                    'dateCreated' => Jalalian::forge($item->created_at)->toString(),
                    'dateModified' => Jalalian::forge($item->updated_at)->toString(),
                    'isDirectory' => ($item->is_dir == 'T'),
                    'parentId' => $item->parent_id
                );
            }
        }

        return $result;
    }

    /**
     * send video
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addVideo(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|max:25',
            'video' => 'required|mimes:avi, mp4, mov, ogg, qt, mkv|max:1024000'
        ]);


        $result = ['data' => null, 'messages' => null, 'success' => false];

        $selectedPath = $request->input('selected-path');

        $videoFile = $request->file('video');
        $fileName = $videoFile->getClientOriginalName();

        if ($videoFile->storeAs(self::$videoBasePath . $selectedPath, $fileName)) {
            $record = array(
                'type' => 'Video',
                'title' => $request->title,
                'description' => $request->description,
                'file_name' => $fileName,
                'quality' => '',
                'created_by' => 0,
                'updated_by' => 0,
                'parent_id' => 0,
                'relation_type' => 0,
                'extra_info' => ''
            );

            if (Multimedia::query()->create($record)) {
                $result['success'] = true;
            }
        }

        return response()->json($result);
    }

    /**
     * create folder
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createFolder(Request $request): JsonResponse
    {
        $request->validate([
            'parentId' => 'required|int',
            'name' => 'required|unique:multimedia',
            'groupType' => 'required|in:I,V,S'
        ]);


        $result = ['data' => null, 'messages' => null, 'success' => false];

        $currentPath = $request->input('currentPath');
        $folderName = $request->input('name');
        $parentId = $request->input('parentId');
        $groupType = $request->input('groupType');

        $destination = self::$multimediaBasePath . '/' . $currentPath . '/' . $folderName;

        if (Storage::makeDirectory($destination)) {
            //TODO: Ability insert title and description
            $record = array(
                'group_type' => $groupType,
                'title' => '',
                'description' => '',
                'name' => $folderName,
                'is_dir' => 'T',
                'created_by' => 1,
                'parent_id' => $parentId,
            );

            if (Multimedia::query()->create($record)) {
                $result['success'] = true;
            }
        }


        return response()->json($result);
    }

    /**
     * move item
     *
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function moveItem($id, Request $request): JsonResponse
    {
        //$request->validate([]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $parentId = $request->input('parentId');
        $destinationId = $request->input('destinationId');

        $items = Multimedia::query()->where('id', '=', $id)->where('parent_id', '=', $id)->get();

        $itemsCount = 0;
        if ($items->isNotEmpty()) {
            $itemsCount = $items->count();
            foreach ($items as $item) {
                $item->parent_id = $destinationId;
                $item->save();
                $itemsCount--;
            }
        }

        if ($itemsCount == 0) {
            $name = $request->input('name');
            $path = $request->input('path');
            $destinationPath = $request->input('destinationPath');

            File::move($this->multimediaDirInStorage . $path, $this->multimediaDirInStorage . $destinationPath . '/' . $name);

            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * rename item (file or directory)
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function renameItem(int $id, Request $request): JsonResponse
    {
        $request->merge(['id' => $id]);
        $request->validate([
            'id' => 'required|int',
            'path' => 'required',
            'oldName' => 'required',
            'newName' => 'required'
        ]);

        $result = array('data' => null, 'messages' => null, 'success' => false);

        $path = $request->input('path');
        $isDir = $request->input('isDir');
        $oldName = $request->input('oldName');
        $newName = $request->input('newName');

        $item = Multimedia::query()->find($id);
        $item->name = $newName;

        //TODO: rename file or directory and update record in database
        if ($item->save()) {
            if ($isDir) {
                $from = $this->multimediaDirInStorage . $path;
                $newPath = str_replace('/' . $oldName, '/' . $newName, $path);
                $to = $this->multimediaDirInStorage . $newPath;
            } else {
                $from = $this->multimediaDirInStorage . $path . '/' . $oldName;
                $to = $this->multimediaDirInStorage . $path . '/' . $newName;
            }

            if (rename($from, $to)) {
                $result['success'] = true;
            } else {
                // rollback change
                $item->name = $oldName;
                $item->save();
            }
        }


        return response()->json($result);
    }

    /**
     * delete item
     *
     * @param $id
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteItem($id, Request $request): JsonResponse
    {
        //$request->validate([]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        if (Multimedia::query()->find($id)->delete()) {
            //$isDirectory = $request->input('isDir');
            $path = $request->input('path');
            $pathInStorageDir = $this->multimediaDirInStorage . $path;

            @unlink($pathInStorageDir);

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
     * @param Multimedia $multimedia
     * @return Response
     */
    public function show(Multimedia $multimedia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Multimedia $multimedia
     * @return Response
     */
    public function edit(Multimedia $multimedia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Multimedia $multimedia
     * @return Response
     */
    public function update(Request $request, Multimedia $multimedia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Multimedia $multimedia
     * @return Response
     */
    public function destroy(Multimedia $multimedia)
    {
        //
    }
}

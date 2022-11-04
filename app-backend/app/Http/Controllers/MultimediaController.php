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
use function MongoDB\BSON\toJSON;

class MultimediaController extends Controller
{
    public static $multimediaBasePath = '/public/multimedia';
    public static $multimediaBasePublic = '/storage/multimedia/';
    public static $videoBasePath = '/public/multimedia/videos';
    private $multimediaDirInStorage;


    public function __construct()
    {
        $this->multimediaDirInStorage = storage_path('app/public/multimedia/');

        parent::__construct();
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function directoryMap(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => null, 'success' => false];

        $groupType = $request->input('groupType');

        $videos = Multimedia::query()->where('group_type', '=', $groupType)->get();

        $directoryTree = $this->getDirectoryTree($videos);

        if (!empty($directoryTree)) {
            $result['data'] = $directoryTree[0];
            $result['success'] = true;
        }

        return response()->json($result);
    }

    private function buildTreeOld($elements, $parentId = 0) {
        $branch = array();

        foreach ($elements as $element) {
            if ($element['parent_id'] == $parentId) {
                $children = $this->buildTree($elements, $element['id']);
                if ($children) {
                    $element['children'] = $children;
                }
                $branch[] = $element;
            }
        }

        return $branch;
    }

    /**
     * get directory tree
     *
     * @param $items
     * @param int $parentId
     * @return array
     */
    private function getDirectoryTree($items, int $parentId = 0): array
    {
        $branch = array();
        foreach ($items as $item) {
            if ($item['parent_id'] == $parentId) {
                $children = $this->getDirectoryTree($items, $item['id']);

                $isDir = ($item['is_dir'] === 'T');
                $item = array(
                    'id' =>  $item['id'],
                    'name' =>  $item['name'],
                    'dateCreated' => Jalalian::forge($item['created_at'])->toString(),
                    'dateModified' => Jalalian::forge($item['updated_at'])->toString(),
                    'isDirectory' => $isDir,
                    'parentId' => $item['parent_id'],
                    'items' => $isDir ? $children : false,
                );

                $branch[] = $item;
            }
        }

       return $branch;
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
        $pathInPublic = self::$multimediaBasePublic.'/'.$currentPath;

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
                'extra_info' => json_encode(['path' => $pathInPublic])
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
     * upload file
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function uploadFile(Request $request):JsonResponse
    {
        $request->validate([
            'image' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $dest = $request->input('destination');
        $parentId = $request->input('parentId');
        $imageObj = $request->file('image');
        $name = $imageObj->getClientOriginalName();
        //$ext = $imageObj->getClientOriginalExtension();
        //$fullName = $name.$ext;
        $fullPath = $this->multimediaDirInStorage.$dest;
        if($imageObj->storeAs($fullPath, $name)) {

            $extraInfo = array(
                'path' => self::$multimediaBasePublic.$dest
            );

            $record = array(
                'group_type' => 'I',
                'title' => '',
                'description' => '',
                'name' => $name,
                'is_dir' => 'F',
                'created_by' => 1,
                'parent_id' => $parentId,
                'extra_info' => json_encode($extraInfo)
            );

            if(Multimedia::query()->create($record)) {
                $result['success'] = true;
            }
        }

        return response()->json($result);
    }
}

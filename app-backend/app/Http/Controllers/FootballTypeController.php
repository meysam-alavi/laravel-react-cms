<?php

namespace App\Http\Controllers;

use App\Models\FootballType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FootballTypeController extends Controller
{
    /**
     * get all footballType
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAll(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => null, 'success' => true];

        $columns = $request->input('columns');
        $allFootballTypes = FootballType::all($columns);

        if ($allFootballTypes->isNotEmpty()) {
            $result['data'] = $allFootballTypes;
            $result['success'] = true;
        }

        return response()->json($result);
    }


    /**
     * get all parents
     *
     * @return JsonResponse
     */
    public function getAllParents(): JsonResponse
    {
        $parents = FootballType::query()->where('parent_id', '=', 0);

        $result = ['data' => $parents, 'messages' => null, 'success' => true];
        return response()->json($result);
    }

    /**
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addType(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required'
        ]);

        $result = ['data' => null, 'messages' => null, 'success' => false];

        $request->merge(['created_by' => 0, 'updated_by' => 0]);
        if (FootballType::query()->create($request->all())) {
            $result['success'] = true;
        }

        return response()->json($result);
    }
}

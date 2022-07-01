<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * expense controller class
 */
class ExpenseController extends AdminController
{
    /**
     * constructor
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $expenses = Expense::query()
            ->orderBy('id', 'desc')
            ->paginate(2);


        return response()->json($expenses);
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
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => [], 'success' => false];

        $request->validate([
            'name' => 'required',
            'amount' => 'required|number',
        ]);

        if ($expense = Expense::query()->create($request->all())) {
            $result['data'] = $expense;
            $result['messages'][] = 'Expense created';
            $result['success'] = true;
        }

        return response()->json($result);
    }


    /**
     * delete specific expense by id
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => [], 'success' => false];

        $request->validate([
            'id' => 'number'
        ]);

        $expense = Expense::query()->find($request->id());
        if ($expense->delete()) {
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => [], 'success' => false];

        $expenseId = $request->id; // ~ $request->route('id');
        $request->merge(['id' => $expenseId]);
        $request->validate([
            'id' => 'required'
        ]);

        if ($expense = Expense::query()->find($expenseId)) {
            $result['data'] = $expense;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function edit(Request $request): JsonResponse
    {
        $result = ['data' => null, 'messages' => [], 'success' => false];

        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'amount' => 'required'
        ]);

        if ($expense = Expense::query()->find($request->id)) {
            $expense->name = $request->name;
            $expense->amount = $request->amount;
            $expense->description = $request->description;

            if ($expense->save()) {
                $result['success'] = true;
            }
        }


        return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Expense $expense
     * @return JsonResponse
     */
    public function update(Request $request, Expense $expense): JsonResponse
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' // optional if you want this to be required
        ]);

        $expense->name = $request->name();
        $expense->amount = $request->amount();
        $expense->description = $request->description();
        $expense->save();

        $response = array(
            'message' => 'expense updated !',
            'expense' => $expense
        );

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Expense $expense
     * @return Response
     */
    public function destroy(Expense $expense)
    {
        //
    }
}

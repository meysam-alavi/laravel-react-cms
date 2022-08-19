<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PersonController extends Controller
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
     * create
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|min:5',
            'last_name' => 'required|min:5',
            'birth_date' => 'required',
            'gender' => 'required',
        ]);


        $result = ['data' => null, 'messages' => null, 'success' => false];

        $birthDate = $request->input('birthDate');
        $birthDate = str_replace(['T', 'Z'], [' ', ''], $birthDate);

        $data = array(
            'first_name' => $request->input('firstName'),
            'last_name' => $request->input('lastName'),
            'birth_date' => $birthDate,
            'national_code' => $request->input('nationalCode'),
            'gender' => $request->input('gender'),
            'size' => $request->input('size')
        );

        $person = Person::query()->create($data);

        if ($person) {
            $result['data'] = $person;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * paginate list
     *
     * @return JsonResponse
     */
    public function paginateList(): JsonResponse
    {
        $persons = Person::query()
            ->orderBy('id', 'desc')
            ->paginate(2);

        return response()->json($persons);
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
     * @param Person $person
     * @return Response
     */
    public function show(Person $person)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Person $person
     * @return Response
     */
    public function edit(Person $person)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Person $person
     * @return Response
     */
    public function update(Request $request, Person $person)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Person $person
     * @return Response
     */
    public function destroy(Person $person)
    {
        //
    }
}

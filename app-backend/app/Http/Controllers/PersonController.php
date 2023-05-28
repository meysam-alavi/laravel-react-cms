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
     * registration
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function registration(Request $request): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|min:5',
            'last_name' => 'required|min:5',
            'birth_date' => 'required',
            'gender' => 'required',
        ]);


        $result = ['data' => null, 'messages' => null, 'success' => false];

        $birthDate = $request->input('birth_date');
        $birthDate = str_replace(['T', 'Z'], [' ', ''], $birthDate);

        $data = array(
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'birth_date' => $birthDate,
            'national_code' => $request->input('national_code'),
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
            ->paginate(1);

        return response()->json($persons);
    }

    public function search(Request $request)
    {
        $result = ['data' => null, 'messages' => null, 'success' => false];

        $firstName = $request->get('first_name');
        $lastName = $request->get('last_name');

        $persons = Person::query();
        if(!empty($firstName)) {
            $persons->where('first_name', 'like', '%'.$firstName.'%');

            $result['data'] = $persons->get();
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

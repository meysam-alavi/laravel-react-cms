<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PersonController extends Controller
{
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
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|min:5'
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

        if($person) {
            $result['data'] = $person;
            $result['success'] = true;
        }

        return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Person $person
     * @return \Illuminate\Http\Response
     */
    public function show(Person $person)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Person $person
     * @return \Illuminate\Http\Response
     */
    public function edit(Person $person)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Person $person
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Person $person)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Person $person
     * @return \Illuminate\Http\Response
     */
    public function destroy(Person $person)
    {
        //
    }
}

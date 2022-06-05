<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Expense::truncate();
        $faker = Factory::create();
        for ($i = 0; $i <= 10; $i++) {
            Expense::create([
                'name' => $faker->title,
                'description' => $faker->sentence,
                'amount' => $faker->numberBetween(0, 5624458)
            ]);
        }

        User::truncate();
        User::create([
            'name' => 'Meysam',
            'email' => 'meysam.alavi1990@gmail.com',
            'password' => Hash::make('123456')
        ]);
    }
}

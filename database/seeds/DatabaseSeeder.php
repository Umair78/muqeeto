<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        DB::table('defaults')->insert([
            'defaults_id' => 1,
            'name' => 'About Us',
            'value' => 'Investment Decisoons are crucial for everyone',
            'key' => 'About us',
            'status' => 1,
            'created_at' => '2020-06-17 03:09:20.0',
            'updated_at' => '2020-06-17 03:09:20.0',

            
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\RegisterCode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegisterCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create random register code
        RegisterCode::factory(5)->create();
    }
}

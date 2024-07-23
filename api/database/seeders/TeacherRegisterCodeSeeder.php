<?php

namespace Database\Seeders;

use App\Models\Auth\TeacherRegisterCode;
use Illuminate\Database\Seeder;

class TeacherRegisterCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create random register code
        TeacherRegisterCode::factory(5)->create();
    }
}

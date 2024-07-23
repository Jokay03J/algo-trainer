<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("associated_students", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("student_id")->constrained("users");
            $table->foreignUuid("teacher_id")->constrained("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("associated_students");
    }
};

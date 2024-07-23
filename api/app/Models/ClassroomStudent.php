<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ClassroomStudent extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = ["student_id", "classroom_id"];

    public function classroom(): HasOne
    {
        // Get classroom
        return $this->hasOne(Classroom::class, "id", "classroom_id");
    }
}

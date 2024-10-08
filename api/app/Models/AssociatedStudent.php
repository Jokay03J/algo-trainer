<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssociatedStudent extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = ["student_id", "teacher_id"];
}

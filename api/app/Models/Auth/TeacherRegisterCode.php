<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherRegisterCode extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = ["code", "name"];
}

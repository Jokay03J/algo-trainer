<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAttachCode extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = ["code", "user_id"];
}

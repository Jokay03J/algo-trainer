<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Train extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = ["classroom_id", "content", "expected"];

    public function classroom(): HasOne
    {
        // Get classroom
        return $this->hasOne(Classroom::class, "id", "classroom_id");
    }
}

<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post("/registerTeacher", [AuthController::class, "registerTeacher"]);
Route::post("/login", [AuthController::class, "login"]);

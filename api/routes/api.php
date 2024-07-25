<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\TrainController;
use App\Http\Middleware\MustBeStudent;
use App\Http\Middleware\MustBeTeacher;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post("/registerTeacher", "registerTeacher");
    Route::post("/registerStudent", "registerStudent");
    Route::post("/login", "login");
    Route::post("/studentCode", "createStudentCode")->middleware([
        "auth:sanctum",
        MustBeTeacher::class,
    ]);
    Route::post("/attachStudent", "attachStudent")->middleware([
        "auth:sanctum",
        MustBeStudent::class,
    ]);
});

Route::controller(ClassroomController::class)
    ->prefix("/classroom")
    ->middleware(["auth:sanctum", MustBeTeacher::class])
    ->group(function () {
        Route::post("/", "create");
        Route::post("/add", "addStudent");
        Route::delete("/remove", "removeStudent");
        Route::delete("/{classroom}/delete", "destroy")->whereUuid("classroom");
    });

Route::controller(ClassroomController::class)
    ->prefix("/classroom")
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/", "index");
        Route::get("/{classroom}/trains", "trains");
    });

Route::controller(TrainController::class)
    ->prefix("/train")
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::post("/", "create")->middleware(MustBeTeacher::class);
        Route::delete("/{train}", "destroy")->middleware(MustBeTeacher::class);
        Route::post("/{train}", "do");
    });

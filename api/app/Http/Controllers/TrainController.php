<?php

namespace App\Http\Controllers;

use App\Http\Requests\Train\CreateTrainRequest;
use App\Models\Classroom;
use App\Models\Train;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TrainController extends Controller
{
    public function create(CreateTrainRequest $request): Response
    {
        // Get classroom
        $classroom = Classroom::find($request->input("classroom_id"));
        // Check if current user is the classroom teacher
        if ($classroom->teacher_id !== $request->user()->id) {
            return response(["message" => "Unauthorized."], 401);
        }
        // Create train and return its id
        $createdTrain = Train::create($request->all());
        return response(["id" => $createdTrain->id]);
    }
}

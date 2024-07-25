<?php

namespace App\Http\Controllers;

use App\Http\Requests\Train\CreateTrainRequest;
use App\Http\Requests\Train\DoTrainRequest;
use App\Models\Classroom;
use App\Models\ClassroomStudent;
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
            return response(["message" => "Forbidden."], 403);
        }
        // Create train and return its id
        $createdTrain = Train::create($request->all());
        return response(["id" => $createdTrain->id]);
    }

    public function destroy(Request $request, Train $train): Response
    {
        // Check if user is author train
        if ($train->classroom->teacher_id !== $request->user()->id) {
            return response(["message" => "Unauthorized.", 419]);
        }
        // Delete train
        Train::destroy($train->id);
        return response(status: 204);
    }

    public function do(DoTrainRequest $request, Train $train): Response
    {
        // Get student classroom
        $studentInsideClassroom = ClassroomStudent::where([
            ["classroom_id", "=", $train->classroom_id],
            ["student_id", "=", $request->user()->id],
        ])->first();
        // Check if student is inside the classroom
        if (!$studentInsideClassroom) {
            return response(["message" => "Forbidden."], 403);
        }
        // Check if expected is the same value between provided value
        return response([
            "result" => (string) $request->input("result") === $train->expected,
        ]);
    }
}

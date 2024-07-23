<?php

namespace App\Http\Controllers;

use App\Http\Requests\Classroom\AddStudentRequest;
use App\Http\Requests\Classroom\CreateClassroomRequest;
use App\Http\Requests\Classroom\RemoveStudentRequest;
use App\Models\AssociatedStudent;
use App\Models\Classroom;
use App\Models\ClassroomStudent;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClassroomController extends Controller
{
    public function index(Request $request): array
    {
        if ($request->user()->type === "teacher") {
            // Get all classrooms
            $classrooms = Classroom::where(
                "teacher_id",
                "=",
                $request->user()->id
            )->get();
            // Return them
            return $classrooms->toArray();
        }
        // Get all classroom where student is in
        $studentClassrooms = ClassroomStudent::where(
            "student_id",
            "=",
            $request->user()->id
        )->get();
        // On each row, get classroom detail and return as an array
        return $studentClassrooms
            ->map(function ($studentClassroom) {
                return $studentClassroom->classroom;
            })
            ->toArray();
    }

    public function create(CreateClassroomRequest $request): Response
    {
        // Create classroom
        $createdclassroom = Classroom::create([
            ...$request->all(),
            "teacher_id" => $request->user()->id,
        ]);
        // Return created classroom id
        return response(["id" => $createdclassroom->id], 201);
    }

    public function destroy(Request $request, Classroom $classroom): mixed
    {
        // Check if classroom author is the current user
        if ($classroom->teacher_id !== $request->user()->id) {
            return response("Forbidden", 403);
        }
        // Delete classroom
        $classroom->destroy($classroom->id);
        return response("Deleted", 204);
    }

    public function addStudent(AddStudentRequest $request): array|Response
    {
        // Check if classroom is owned by the current teacher
        $classroom = Classroom::find($request->input("classroom_id"));
        if (!$classroom || $classroom->teacher_id !== $request->user()->id) {
            return response(["message" => "Unauthorized."], 403);
        }
        // Get associated student
        $associatedStudent = AssociatedStudent::where([
            ["student_id", "=", $request->input("student_id")],
            ["teacher_id", "=", $request->user()->id],
        ])->first();
        // Check if student has been attached to current teacher
        if (!$associatedStudent) {
            return response(
                [
                    "message" =>
                        "The student must be attached to the current teacher to be added in this classroom",
                ],
                403
            );
        }
        // Check if student is already inside the classroom
        $classroomStudent = ClassroomStudent::where([
            ["student_id", "=", $request->input("student_id")],
            ["classroom_id", "=", $request->input("classroom_id")],
        ])->first();
        if ($classroomStudent) {
            return response(
                [
                    "message" => "The student is already inside the classroom",
                ],
                419
            );
        }
        // Add student to the classroom
        $createdClassromStudent = ClassroomStudent::create([
            "student_id" => $request->input("student_id"),
            "classroom_id" => $request->input("classroom_id"),
        ]);
        return ["id" => $createdClassromStudent->id];
    }

    public function removeStudent(RemoveStudentRequest $request): Response
    {
        // Check if classroom is owned by the current teacher
        $classroom = Classroom::find($request->input("classroom_id"));
        if (!$classroom || $classroom->teacher_id !== $request->user()->id) {
            return response(["message" => "Unauthorized."], 403);
        }
        // Get student classroom
        $classroomStudent = ClassroomStudent::where([
            ["student_id", "=", $request->input("student_id")],
            ["classroom_id", "=", $request->input("classroom_id")],
        ])->first();
        // If student classroom not found, return 404
        if (!$classroomStudent) {
            return response(
                ["message" => "Student inside this classroom not found"],
                404
            );
        }
        // Remove student from the classroom
        ClassroomStudent::destroy($classroomStudent->id);
        return response(["message" => "Removed"]);
    }
}

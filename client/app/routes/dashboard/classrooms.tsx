import { UpdateIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useGetClassrooms } from "~/hooks/useGetClassrooms";

const Classrooms = () => {
  const { data, isPending, error } = useGetClassrooms();

  if (isPending)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <UpdateIcon className="animate-spin" />
      </div>
    );

  if (error) return <>error: {error.message}</>;

  return (
    <section className="p-3">
      <h1 className="text-3xl font-bold">Mes classes</h1>
      <div className="flex flex-wrap mt-2">
        {data!.map((classroom) => {
          console.log(classroom.students);

          return (
            <Link
              to={"/dashboard/classrooms/" + classroom.id}
              key={classroom.id}
            >
              <Card className="w-fit">
                <CardHeader>
                  <h2 className="font-bold">{classroom.name}</h2>
                </CardHeader>
                <CardContent>
                  {classroom.students && classroom.students.length > 0
                    ? classroom.students.map((student) => {
                        return (
                          <TooltipProvider key={student.id}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Avatar>
                                  <AvatarImage
                                    src={student.avatar}
                                    alt={student.name}
                                  />
                                  <AvatarFallback>
                                    {student.name.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{student.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })
                    : null}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Classrooms;

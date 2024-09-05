import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@remix-run/react";
import { useGetClassrooms } from "hooks/useGetClassrooms";
import { routes } from "types/routes";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { CircleX } from "lucide-react";
import { hasRights, Rights } from "utils/hasRight";

export default function Classes() {
  const { data: classrooms, isLoading, isError } = useGetClassrooms();
  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full gap-2 my-3">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant={"destructive"} className="mt-4">
        <CircleX className="h-4 w-4" />
        <AlertTitle>Erreur !</AlertTitle>
        <AlertDescription>Une erreur est survenue !</AlertDescription>
      </Alert>
    );
  }

  console.log(isError);

  return (
    <div className="flex flex-col items-center">
      {hasRights(Rights.canCreateClassroom) && (
        <Button asChild>
          <Link to={routes.NEW_CLASSROOM}>Crée une classe</Link>
        </Button>
      )}
      <Table className="w-fit">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classrooms!.map((classroom, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{classroom.name}</TableCell>
              <TableCell>
                <Button asChild>
                  <Link to={`${routes.CLASSE}/${classroom.id}`}>
                    Voir les étudiants
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

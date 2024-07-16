import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@remix-run/react";
import { routes } from "types/routes";
import { Button } from "~/components/ui/button";

export default function Classes() {
  return (
    <div className="flex flex-col items-center">
      <Table className="w-fit">
        {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Nom</TableCell>
            <TableCell>
              <Button asChild>
                <Link to={`${routes.CLASSES}/2`}>Voir les étudiants</Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

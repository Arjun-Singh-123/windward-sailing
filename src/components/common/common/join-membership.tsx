import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Compass } from "lucide-react";
import ToJoin from "./to-join";

export default function JoinMembership() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-sky-500 text-white">
        <CardTitle className="flex items-center text-2xl font-semibold">
          <ToJoin />
          {/* <span className="mr-2">To Join</span> */}
          <Compass className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                One-Time Initial Fee
              </TableCell>
              <TableCell className="text-right">$550</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Damage Deposit</TableCell>
              <TableCell className="text-right">$500</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                One time member Fee (First & Last Months Required, membership
                fee that is applied towards boat use or charter)
              </TableCell>
              <TableCell className="text-right">$380</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Certification Ride (2 Hours on the water)
              </TableCell>
              <TableCell className="text-right">Free</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell className="text-right font-bold">$1,430</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="bg-sky-100 p-4 mt-4">
          <p className="text-sky-800">
            <span className="font-bold">Note:</span> Monthly dues total $190
            ($80 per month administration fee plus the $110 membership fee that
            is applied towards boat use or charter).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

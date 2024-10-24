"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export default function NoDataFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center  p-10  ">
      <Card className=" border-none w-full mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <FileQuestion className="h-24 w-24 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            No Data Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            We couldn't find the data you're looking for. It may have been moved
            or doesn't exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={() => router.push("/")} variant="outline">
            Go Home
          </Button>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

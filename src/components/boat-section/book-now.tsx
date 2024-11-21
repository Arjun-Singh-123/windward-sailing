import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const BookNow = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="hidden lg:flex h-24 rounded-none bg-fontColor backdrop-blur-sm text-white"
          onClick={() => setIsOpen(true)}
        >
          <CalendarDays className="h-5 w-5 mr-2" />
          <span className="flex items-center h-full justify-between p-4 text-lg font-semibold">
            Book Now
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-[540px] p-0">
        <ScrollArea className="h-full">
          <Card className="border-0 rounded-none h-full">
            <CardHeader className="sticky top-0 z-10 bg-white border-b">
              <CardTitle className="text-2xl font-bold">
                Request a Reservation
              </CardTitle>
              <p className="text-gray-600">
                Accepting requests for {new Date().getMonth() + 1}/2024
              </p>
              <p className="text-sm text-gray-500">
                You will be emailed confirmations
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <BoatReservationForm />
            </CardContent>
          </Card>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default BookNow;

"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  contentFont,
  cursiveHeadingFont,
  mainHeadingFont,
} from "@/app/ui/fonts";
import DecoratorLine from "./decorator-icon-line";
import { supabase } from "@/lib/supabase";
// Define the interface for a rental entry
interface RentalEntry {
  vesselName: string;
  length: string;
  halfDay: string;
  weekday: string;
  weekend: string;
}
interface RentalTableProps {
  data: RentalEntry[]; // The data array for either members or non-members
  type: string; // The type of the table, e.g., 'Member' or 'Non-Member'
}

interface Vessel {
  vesselName: string;
  length: string;
  halfDay: string;
  weekday: string;
  weekend: string;
}

interface Rental {
  id: string;
  members: Vessel[];
  non_members: Vessel[];
}

export default function RentalFeesTable() {
  const [activeTab, setActiveTab] = useState("member");
  const [rentalData, setRentalData] = useState<any>({});

  // Fetch Rentals
  useEffect(() => {
    const fetchRentals = async () => {
      const { data, error } = await supabase
        .from("rentals")
        .select("*")
        .single();
      if (error) console.error("Error fetching rentals:", error);
      else setRentalData(data || []);
    };

    fetchRentals();
  }, []);
  console.log("checking renals data", rentalData);

  const RentalTable: React.FC<RentalTableProps> = ({ data, type }) => (
    <Card className="  container w-full max-w-[1630px] px-[15px] mx-auto">
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <Table className="w-full">
            <TableHeader className="whitespace-nowrap">
              <TableRow>
                {/* <TableHead className="w-[150px] bg-white sticky left-0 z-20">
                  {type} Rental Fees
                </TableHead> */}
                <TableHead>Vessel Name</TableHead>
                <TableHead>Length</TableHead>
                <TableHead>Half-Day</TableHead>
                <TableHead>Weekday</TableHead>
                <TableHead>Sat/Sun/Holidays</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold bg-white sticky left-0 z-20">
                  Sail Boat
                </TableCell>
                <TableCell colSpan={5}></TableCell>
              </TableRow>
              {data?.map((row, index) => (
                <TableRow key={index} className="whitespace-nowrap">
                  {/* <TableCell className="font-medium bg-white sticky left-0 z-20">
                    {row.vesselName}
                  </TableCell> */}
                  <TableCell>{row.vesselName}</TableCell>
                  <TableCell>{row.length}</TableCell>
                  <TableCell>{row.halfDay}</TableCell>
                  <TableCell>{row.weekday}</TableCell>
                  <TableCell>{row.weekend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const CompareTable = () => (
    <Card className="w-full">
      <CardContent className="p-0">
        {/* mobile  */}
        <div className="block md:hidden">
          <ScrollArea className="w-full h-[500px]">
            <Table className="w-full">
              <TableHeader>
                {/* <TableRow>
                <TableHead className="w-[150px] bg-white sticky left-0 z-20">
                  Compare Fees
                </TableHead>
                <TableHead colSpan={2}>Member Rental Fees</TableHead>
                <TableHead colSpan={2}>Non-Member Rental Fees</TableHead>
              </TableRow> */}
              </TableHeader>
              <TableBody>
                <TableRow className="whitespace-nowrap">
                  <TableCell className="font-bold bg-white sticky left-0 z-20   "></TableCell>
                  <TableCell colSpan={2}> Member Rental Fees</TableCell>
                  <TableCell colSpan={2}>Non-Member Rental Fees</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold bg-white sticky left-0 z-20">
                    Vessel Name
                  </TableCell>
                  <TableCell colSpan={2}>Sail Boat</TableCell>
                  <TableCell colSpan={2}>Sail Boat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold bg-white sticky left-0 z-20">
                    Length
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold bg-white sticky left-0 z-20">
                    Half-Day
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold bg-white sticky left-0 z-20">
                    Weekday
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold bg-white sticky left-0 z-20">
                    Sat/Sun/Holidays
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>

                {rentalData?.members?.map((memberRow: any, index: number) => {
                  const nonMemberRow = rentalData.non_members[index];
                  return (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                          Vessel Name
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {memberRow.vesselName}
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {nonMemberRow.vesselName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                          Length
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {memberRow.length}
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {nonMemberRow.length}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                          Half-Day
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {memberRow.halfDay}
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {nonMemberRow.halfDay}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                          Weekday
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {memberRow.weekday}
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {nonMemberRow.weekday}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                          Sat/Sun/Holidays
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {memberRow.weekend}
                        </TableCell>
                        <TableCell colSpan={2} className="whitespace-nowrap">
                          {nonMemberRow.weekend}
                        </TableCell>
                      </TableRow>
                      {rentalData &&
                        rentalData.members &&
                        index < rentalData.members.length - 1 && (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="h-4 bg-gray-100"
                            ></TableCell>
                          </TableRow>
                        )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* desktop  */}
        <div className="hidden md:block">
          <Table className="w-full">
            <TableHeader></TableHeader>
            <TableBody>
              <TableRow className="whitespace-nowrap">
                <TableCell className="font-bold bg-white sticky left-0 z-20   "></TableCell>
                <TableCell colSpan={2}> Member Rental Fees</TableCell>
                <TableCell colSpan={2}>Non-Member Rental Fees</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-white sticky left-0 z-20">
                  Vessel Name
                </TableCell>
                <TableCell colSpan={2}>Sail Boat</TableCell>
                <TableCell colSpan={2}>Sail Boat</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-white sticky left-0 z-20">
                  Length
                </TableCell>
                <TableCell colSpan={2}></TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-white sticky left-0 z-20">
                  Half-Day
                </TableCell>
                <TableCell colSpan={2}></TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-white sticky left-0 z-20">
                  Weekday
                </TableCell>
                <TableCell colSpan={2}></TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold bg-white sticky left-0 z-20">
                  Sat/Sun/Holidays
                </TableCell>
                <TableCell colSpan={2}></TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>

              {rentalData?.members?.map((memberRow: any, index: number) => {
                const nonMemberRow = rentalData.non_members[index];
                return (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                        Vessel Name
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {memberRow.vesselName}
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {nonMemberRow.vesselName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                        Length
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {memberRow.length}
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {nonMemberRow.length}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                        Half-Day
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {memberRow.halfDay}
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {nonMemberRow.halfDay}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                        Weekday
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {memberRow.weekday}
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {nonMemberRow.weekday}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                        Sat/Sun/Holidays
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {memberRow.weekend}
                      </TableCell>
                      <TableCell colSpan={2} className="whitespace-nowrap">
                        {nonMemberRow.weekend}
                      </TableCell>
                    </TableRow>
                    {rentalData &&
                      rentalData.members &&
                      index < rentalData.members.length - 1 && (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-4 bg-gray-100"
                          ></TableCell>
                        </TableRow>
                      )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container w-full max-w-[1630px] px-[15px] mx-auto  space-y-6 ">
      <div className="text-start space-y-2 mt-4">
        {/* <h1
          className={` text-start  text-xl text-flatBlue ${cursiveHeadingFont.className}`}
          style={{ marginTop: "1.25rem" }}
        >
          Windward Sailing Club
        </h1> */}
        <h2 className={`text-4xl ${mainHeadingFont.className}`}>Rental Fees</h2>
        {/* <DecoratorLine /> */}
        <p
          className={`text-start mt-8   mx-auto text-sm ${contentFont.className}`}
        >
          Enjoy a day out on the waves—without owning your own boat! Our rental
          services are perfect for people looking to experience the joys of
          sailing without worrying about the upkeep, capital investment, and
          ownership of an expensive sailboat. All prices below include insurance
          and cleanup after your charter.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <TabsTrigger
            value="member"
            className="px-4 py-2 text-sm font-medium  data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Member Rental Fees
          </TabsTrigger>
          <TabsTrigger
            value="nonMember"
            className="px-4 py-2 text-sm font-medium  data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Non-Member Rental Fees
          </TabsTrigger>
          <TabsTrigger
            value="compare"
            className="px-4 py-2 text-sm font-medium  data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Compare Fees
          </TabsTrigger>
        </TabsList>
        <TabsContent value="member">
          <RentalTable data={rentalData.members} type="Member" />
        </TabsContent>
        <TabsContent value="nonMember">
          <RentalTable data={rentalData.non_members} type="Non-Member" />
        </TabsContent>
        <TabsContent value="compare">
          <CompareTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

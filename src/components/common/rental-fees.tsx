"use client";

import React, { useState } from "react";
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
import { contentFont, mainHeadingFont } from "@/app/ui/fonts";

// Define the interface for a rental entry
interface RentalEntry {
  vessel_name: string;
  length: string;
  half_day: string;
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
  half_day: string;
  weekday: string;
  weekend: string;
}

interface Rental {
  id: string;
  members: Vessel[];
  non_members: Vessel[];
}

export default function RentalFeesTable({ rentalData }: any) {
  console.log(rentalData);
  const [activeTab, setActiveTab] = useState("member");

  const RentalTable: React.FC<RentalTableProps> = ({ data, type }) => (
    <Card className="container w-full max-w-[1630px] px-[15px] mx-auto">
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <Table className="w-full">
            <TableHeader className="whitespace-nowrap">
              <TableRow>
                {/* <TableHead className="w-[150px] bg-white sticky left-0 z-20">
                  {type} Rental Fees
                </TableHead> */}
                <TableHead>Vessel Name</TableHead>
                <TableHead>Make/Size</TableHead>
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
              {data?.map((row, index) => {
                console.log(row);
                return (
                  <TableRow key={index} className="whitespace-nowrap">
                    {/* <TableCell className="font-medium bg-white sticky left-0 z-20">
                {row.vesselName}
              </TableCell> */}
                    <TableCell>{row?.vessel_name}</TableCell>
                    <TableCell>{row.length}</TableCell>
                    <TableCell>{row.half_day}</TableCell>
                    <TableCell>{row.weekday}</TableCell>
                    <TableCell>{row.weekend}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );

  interface RentalData {
    vessel_name: string;
    length: string;
    half_day: string;
    weekday: string;
    weekend: string;
  }

  interface CompareTableProps {
    rentalData: {
      members: RentalData[];
      non_members: RentalData[];
    };
  }

  const CompareTable: React.FC<CompareTableProps> = ({ rentalData }) => {
    const renderTableContent = (isMobile: boolean) => (
      <Table className="w-full">
        <TableHeader>
          <TableRow className="whitespace-nowrap">
            <TableCell className="font-bold bg-white sticky left-0 z-20"></TableCell>
            <TableCell className="font-bold" colSpan={2}>
              Member Rental Fees
            </TableCell>
            <TableCell className="font-bold" colSpan={2}>
              Non-Member Rental Fees
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentalData?.members?.map((memberRow, index) => {
            const nonMemberRow = rentalData?.non_members[index] || {};
            return (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                    Vessel Name
                  </TableCell>
                  <TableCell colSpan={2} className="whitespace-nowrap">
                    {memberRow.vessel_name}
                  </TableCell>
                  <TableCell colSpan={2} className="whitespace-nowrap">
                    {nonMemberRow.vessel_name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold bg-white sticky left-0 z-20 whitespace-nowrap">
                    Make/Size
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
                    {memberRow.half_day}
                  </TableCell>
                  <TableCell colSpan={2} className="whitespace-nowrap">
                    {nonMemberRow.half_day}
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
                {index < rentalData.members.length - 1 && (
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
    );

    return (
      <Card className="w-full">
        <CardContent className="p-0">
          {/* Mobile */}
          <div className="block md:hidden">
            <ScrollArea className="w-full h-[500px]">
              {renderTableContent(true)}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">{renderTableContent(false)}</div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container w-full max-w-[1630px] px-[15px] mx-auto">
      <div className="text-start">
        <h2 className={`text-4xl mb-4 ${mainHeadingFont.className}`}>
          Rental Fees
        </h2>

        <p className={`text-start mx-auto text-sm ${contentFont.className}`}>
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
          <RentalTable data={rentalData?.members} type="Member" />
        </TabsContent>
        <TabsContent value="nonMember">
          <RentalTable data={rentalData?.non_members} type="Non-Member" />
        </TabsContent>
        <TabsContent value="compare">
          <CompareTable rentalData={rentalData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

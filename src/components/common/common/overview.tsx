import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const YachtOverview = () => {
  return (
    <Card className="mb-8 border-[#1e40af]">
      <CardHeader className="bg-[#1e40af] text-white">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold">
              Windward 28' - EVENING STAR
            </CardTitle>
            <CardDescription className="text-[#fbbf24]">
              A charming embodiment of maritime excellence
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="text-lg bg-[#fbbf24] text-[#1e40af]"
          >
            28 ft
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="mb-4">
          The Windward 28' - EVENING STAR brings together classic elegance and
          seafaring adventure. At 28 feet in length, this yacht offers an
          inviting blend of intimacy and exploration. Its sleek hull design
          ensures a steady and pleasurable journey, whether you're gliding
          through calm waters or embracing the exhilaration of the open sea.
        </p>
        <p className="mb-4">
          Stepping on board, you're welcomed into a world of sophistication. The
          interior is a testament to Windward Yachts' unwavering dedication to
          quality, with carefully chosen materials and meticulous craftsmanship
          that exude an ambiance of refined opulence.
        </p>
        <p>
          Despite its modest size, the EVENING STAR comes equipped with a range
          of contemporary amenities. An efficiently designed galley is perfect
          for onboard dining, and the open deck invites you to soak up the sun
          and enjoy the sea breeze.
        </p>
      </CardContent>
    </Card>
  );
};

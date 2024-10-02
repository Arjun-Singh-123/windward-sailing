"use client ";
import { useState } from "react";
import TopBar from "./head/top";
import MainHeader from "./head/main";
import MobileMenu from "./head/mobile";
import MobileDetails from "./head/mobile-detail";
import DesktopNavigation from "./head/desktop";

export const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Membership Fees", path: "/membership-fees" },
  { label: "Rental Fees", path: "/rental-fees" },
  { label: "Boats", path: "/boats" },
  { label: "Members", path: "/members" },
];

export default function HeaderNew() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 lg:relative md:top-auto">
      hello
      {/* <TopBar /> */}
      {/* <MainHeader
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        setIsDetailsOpen={setIsDetailsOpen}
      /> */}
      {/* <MobileMenu isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} /> */}
      {/* <MobileDetails isDetailsOpen={isDetailsOpen} /> */}
      {/* <DesktopNavigation /> */}
    </header>
  );
}
 

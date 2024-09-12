"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MoreHorizontal, ChevronRight } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Membership Fees", path: "/membership-fees" },
  { label: "Rental Fees", path: "/rental-fees" },
  { label: "Boats", path: "/boats" },
  { label: "Members", path: "/members" },
];

const Header = () => {
  const pathname = usePathname();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <header className="bg-[#f0f8ff] text-[#00008b]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link
            href="mailto:support@windwardsailingclub.com"
            className="text-sm hover:underline hidden md:block"
          >
            support@windwardsailingclub.com
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2">
              <Link href="#" aria-label="Facebook">
                <Facebook
                  size={20}
                  className="text-[#00008b] hover:text-[#4267B2] transition-colors"
                />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter
                  size={20}
                  className="text-[#00008b] hover:text-[#1DA1F2] transition-colors"
                />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram
                  size={20}
                  className="text-[#00008b] hover:text-[#E1306C] transition-colors"
                />
              </Link>
              <Link href="#" aria-label="Pinterest">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00008b] hover:text-[#E60023] transition-colors"
                >
                  <path d="M8 12a4 4 0 1 0 8 0a4 4 0 0 0-8 0"></path>
                  <path d="M12 2v6"></path>
                  <path d="M12 22v-6"></path>
                  <path d="M6 12H2"></path>
                  <path d="M22 12h-4"></path>
                </svg>
              </Link>
            </div>
            <Separator orientation="vertical" className="h-6 hidden md:block" />
            <Button
              variant="default"
              size="sm"
              className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#052449] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logoo.png"
                alt="Windward Sailing Club"
                className="h-16 w-auto"
                width={277.75}
                height={84.984}
              />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6" />
                <div>
                  <div className="text-sm">CALL US</div>
                  <div className="font-bold">(949) 675-9060</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6" />
                <div>
                  <div className="text-sm">HOURS OF OPERATION</div>
                  <div className="font-bold">Monday — Sunday</div>
                  <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <div>
                  <div className="text-sm">COMPANY / LOCATION</div>
                  <div className="font-bold">
                    3300 Via Lido, Windward Beach, CA 92663
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-white">
                  <nav className="flex flex-col space-y-4">
                    {navItems.map(({ label, path }) => (
                      <Link
                        key={label}
                        href={path}
                        className={`flex items-center justify-between py-2 ${
                          pathname === path ? "text-[#00bfff]" : "text-black"
                        }`}
                      >
                        {label}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              >
                <MoreHorizontal className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isDetailsOpen && (
        <div className="md:hidden bg-[#052449] text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6" />
                <div>
                  <div className="text-sm">CALL US</div>
                  <div className="font-bold">(949) 675-9060</div>
                </div>
              </div>
              <Separator className="bg-white/20" />
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6" />
                <div>
                  <div className="text-sm">HOURS OF OPERATION</div>
                  <div className="font-bold">Monday — Sunday</div>
                  <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
                </div>
              </div>
              <Separator className="bg-white/20" />
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <div>
                  <div className="text-sm">COMPANY / LOCATION</div>
                  <div className="font-bold">
                    3300 Via Lido, Windward Beach, CA 92663
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav className="bg-[#c5dfff] text-[#00008b] py-2">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex justify-between items-center">
            <div className="flex space-x-4">
              {navItems.map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  className={`hover:underline px-3 py-2 rounded ${
                    pathname === path ? "bg-[#00bfff] text-white" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <Button
              variant="default"
              className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
            >
              BOOKING NOW
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

// const navItems = [
//   { label: "Home", path: "/" },
//   { label: "About Us", path: "/about-us" },
//   { label: "Membership Fees", path: "/membership-fees" },
//   { label: "Rental Fees", path: "/rental-fees" },
//   { label: "Boats", path: "/boats" },
//   { label: "Members", path: "/members" },
// ];

// const Header = () => {
//   const pathname = usePathname();

//   return (
//     <header className="bg-[#f0f8ff] text-[#00008b]">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-2">
//           <Link
//             href="mailto:support@windwardsailingclub.com"
//             className="text-sm hover:underline"
//           >
//             support@windwardsailingclub.com
//           </Link>
//           <div className="flex items-center space-x-4">
//             <div className="flex space-x-2">
//               <Link href="#" aria-label="Facebook">
//                 <Facebook
//                   size={20}
//                   className="text-[#00008b] hover:text-[#4267B2] transition-colors"
//                 />
//               </Link>
//               <Link href="#" aria-label="Twitter">
//                 <Twitter
//                   size={20}
//                   className="text-[#00008b] hover:text-[#1DA1F2] transition-colors"
//                 />
//               </Link>
//               <Link href="#" aria-label="Instagram">
//                 <Instagram
//                   size={20}
//                   className="text-[#00008b] hover:text-[#E1306C] transition-colors"
//                 />
//               </Link>
//               <Link href="#" aria-label="Pinterest">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="text-[#00008b] hover:text-[#E60023] transition-colors"
//                 >
//                   <path d="M8 12a4 4 0 1 0 8 0a4 4 0 0 0-8 0"></path>
//                   <path d="M12 2v6"></path>
//                   <path d="M12 22v-6"></path>
//                   <path d="M6 12H2"></path>
//                   <path d="M22 12h-4"></path>
//                 </svg>
//               </Link>
//             </div>
//             <Separator orientation="vertical" className="h-6" />
//             <Button
//               variant="default"
//               size="sm"
//               className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
//             >
//               Login
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className="bg-[#052449] text-white py-4">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
//               <img
//                 src="/images/logoo.png"
//                 alt="Windward Sailing Club"
//                 className="h-16 w-auto"
//               />
//             </Link>
//             <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
//               <div className="flex items-center space-x-2">
//                 <Phone className="w-6 h-6" />
//                 <div>
//                   <div className="text-sm">CALL US</div>
//                   <div className="font-bold">(949) 675-9060</div>
//                 </div>
//               </div>
//               <Separator
//                 orientation="vertical"
//                 className="h-10 hidden md:block"
//               />
//               <div className="flex items-center space-x-2">
//                 <Clock className="w-6 h-6" />
//                 <div>
//                   <div className="text-sm">HOURS OF OPERATION</div>
//                   <div className="font-bold">Monday — Sunday</div>
//                   <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
//                 </div>
//               </div>
//               <Separator
//                 orientation="vertical"
//                 className="h-10 hidden md:block"
//               />
//               <div className="flex items-center space-x-2">
//                 <MapPin className="w-6 h-6" />
//                 <div>
//                   <div className="text-sm">COMPANY / LOCATION</div>
//                   <div className="font-bold">
//                     3300 Via Lido, Windward Beach, CA 92663
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <nav className="bg-[#c5dfff] text-[#00008b] py-2">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap justify-between items-center">
//             <div className="flex flex-wrap space-x-4">
//               {navItems.map(({ label, path }) => (
//                 <Link
//                   key={label}
//                   href={path}
//                   className={`hover:underline px-3 py-2 rounded ${
//                     pathname === path ? "bg-[#00bfff] text-white" : ""
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </div>
//             <Button
//               variant="default"
//               className="bg-[#00bfff] hover:bg-[#0080ff] text-white mt-2 md:mt-0"
//             >
//               BOOKING NOW
//             </Button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// // Define the navigation items
// const navItems = [
//   { label: "Home", path: "/" },
//   { label: "About Us", path: "/about-us" },
//   { label: "Membership Fees", path: "/membership-fees" },
//   { label: "Rental Fees", path: "/rental-fees" },
//   { label: "Boats", path: "/boats" },
//   { label: "Members", path: "/members" },
// ];

// const Header = () => {
//   const pathname = usePathname();

//   return (
//     <header className="bg-[#f0f8ff] text-[#00008b]  ">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-2 ">
//           <Link
//             href="mailto:support@windwardsailingclub.com"
//             className="  hover:underline text-[24px]"
//           >
//             support@windwardsailingclub.com
//           </Link>
//           <div className="flex space-x-4">
//             <Link href="#" aria-label="Facebook">
//               <Facebook
//                 size={26}
//                 className="text-[#00008b] hover:text-[#4267B2] transition-colors"
//               />
//             </Link>
//             <Link href="#" aria-label="Twitter">
//               <Twitter
//                 size={26}
//                 className="  hover:bg-slate-700  transition-colors"
//               />
//             </Link>
//             <Link href="#" aria-label="Instagram">
//               <Instagram
//                 size={26}
//                 className="text-[#00008b] hover:text-[#E1306C] transition-colors"
//               />
//             </Link>
//             <Link href="#" aria-label="Pinterest">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="text-[#00008b] hover:text-[#E60023] transition-colors"
//               >
//                 <path d="M8 12a4 4 0 1 0 8 0a4 4 0 0 0-8 0"></path>
//                 <path d="M12 2v6"></path>
//                 <path d="M12 22v-6"></path>
//                 <path d="M6 12H2"></path>
//                 <path d="M22 12h-4"></path>
//               </svg>
//             </Link>
//           </div>
//           <Button
//             variant="default"
//             className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
//           >
//             Login
//           </Button>
//         </div>
//       </div>
//       <div className="bg-[#052449] text-white py-4">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
//               <img
//                 src="/images/logoo.png"
//                 alt="Windward Sailing Club"
//                 className="h-[85px] w-auto"
//               />
//               {/* <span className="text-xl font-bold">WINDWARD SAILING CLUB</span> */}
//             </Link>
//             <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
//               <div className="flex items-center space-x-2">
//                 <Phone className="w-6 h-6" />
//                 <div>
//                   <div className="text-sm">CALL US</div>
//                   <div className="font-bold">(949) 675-9060</div>
//                 </div>
//               </div>
//               <div className="w-px h-10 bg-white hidden md:block"></div>
//               <div className="flex items-center space-x-2">
//                 <Clock className="w-6 h-6" />
//                 <div>
//                   <div className="text-sm">HOURS OF OPERATION</div>
//                   <div className="font-bold">Monday — Sunday</div>
//                   <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
//                 </div>
//               </div>
//               <div className="w-px h-10 bg-white hidden md:block"></div>
//               <div className="flex items-center space-x-2">
//                 <MapPin className="w-6 h-6" />
//                 <div>
//                   <div className="text-sm">COMPANY / LOCATION</div>
//                   <div className="font-bold">
//                     3300 Via Lido, Windward Beach, CA 92663
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <nav className="bg-[#c5dfff] text-[#00008b] py-2   ">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap justify-between items-center">
//             <div className="flex flex-wrap space-x-4">
//               {navItems.map(({ label, path }) => (
//                 <Link
//                   key={label}
//                   href={path}
//                   className={`hover:underline px-3 py-2 rounded ${
//                     pathname === path ? "bg-[#00bfff] text-white" : ""
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               ))}
//             </div>
//             <Button
//               variant="default"
//               className="bg-[#00bfff] hover:bg-[#0080ff] text-white mt-2 md:mt-0"
//             >
//               BOOKING NOW
//             </Button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// const Footer = () => {
//   return (
//     <footer
//       className=" text-white py-8 relative  "
//       style={{
//         backgroundImage:
//           'url("https://dev.windwardsailingclub.com/img/Sections/footer-bg.jpg")',
//       }}
//     >
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <Link href="/" className="flex items-center space-x-2 mb-4">
//               {/* <img
//                 src="https://dev.windwardsailingclub.com/img/Sections/boat-graphic.png"
//                 alt="Windward Sailing Club"
//                 className="h-12 w-auto"
//               /> */}
//               <span className="text-xl font-bold">WINDWARD SAILING CLUB</span>
//             </Link>
//             <p>3300 Via Lido, Windward Beach, CA92663</p>
//             <p className="mt-4">
//               <strong>Service Area:</strong>
//               <br />
//               Windward Beach, California, and the Surrounding Areas
//             </p>
//           </div>
//           <div className="  grid grid-cols-2 gap-4">
//             {[
//               "Home",
//               "About Us",
//               "Membership Fees",
//               "Rental Fees",
//               "Boats",
//               "Basic Sailing Certificate",
//               "Advanced Sailing",
//               "Coastal Navigation",
//               "Privacy Policy",
//               "Terms of Conditions",
//             ].map((item) => (
//               <Link
//                 key={item}
//                 href={`/${item.toLowerCase().replace(" ", "-")}`}
//                 className="hover:underline"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>
//           {/* <div>
//             <h3 className="text-lg font-bold mb-4">Newsletter</h3>
//             <p className="mb-2">
//               Stay updated with our latest news and offers!
//             </p>
//             <form className="flex">
//               <Input type="email" placeholder="Your email" className="mr-2" />
//               <Button
//                 type="submit"
//                 variant="default"
//                 className="bg-[#00bfff] hover:bg-[#0080ff]"
//               >
//                 Subscribe
//               </Button>
//             </form>
//           </div> */}
//         </div>
//         <div className="mt-8 pt-4 border-t border-gray-600 text-center">
//           <p>Copyright © 2023 Windward Sailing Club. All rights reserved.</p>
//         </div>
//       </div>
//       <div
//         className="absolute left-0 bottom-0"
//         style={{ width: "227px", height: "394px", overflow: "hidden" }}
//       >
//         <img
//           src="https://dev.windwardsailingclub.com/img/Sections/boat-graphic.png"
//           alt="Footer decoration"
//           className="object-cover w-full h-full"
//         />
//       </div>
//     </footer>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-[#1e40af] text-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <Link href="/" className="flex items-center space-x-2 mb-4">
//               <img
//                 src="/logo-white.png"
//                 alt="Windward Sailing Club"
//                 className="h-10 w-auto"
//               />
//               <span className="text-xl font-bold">WINDWARD SAILING CLUB</span>
//             </Link>
//             <p className="mb-4">3300 Via Lido, Windward Beach, CA 92663</p>
//             <div className="flex space-x-4">
//               <Link href="#" aria-label="Facebook">
//                 <Facebook
//                   size={24}
//                   className="text-[#fbbf24] hover:text-white"
//                 />
//               </Link>
//               <Link href="#" aria-label="Twitter">
//                 <Twitter
//                   size={24}
//                   className="text-[#fbbf24] hover:text-white"
//                 />
//               </Link>
//               <Link href="#" aria-label="Instagram">
//                 <Instagram
//                   size={24}
//                   className="text-[#fbbf24] hover:text-white"
//                 />
//               </Link>
//               <Link href="#" aria-label="LinkedIn">
//                 <Linkedin
//                   size={24}
//                   className="text-[#fbbf24] hover:text-white"
//                 />
//               </Link>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-[#fbbf24]">
//               Quick Links
//             </h3>
//             <nav className="flex flex-col space-y-2">
//               {[
//                 "Home",
//                 "About",
//                 "Yachts",
//                 "Membership",
//                 "Contact",
//                 "Privacy Policy",
//                 "Terms of Service",
//               ].map((item) => (
//                 <Link
//                   key={item}
//                   href={`/${item.toLowerCase().replace(" ", "-")}`}
//                   className="hover:text-[#fbbf24]"
//                 >
//                   {item}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-4 text-[#fbbf24]">
//               Newsletter
//             </h3>
//             <p className="mb-4">
//               Stay updated with our latest news and offers!
//             </p>
//             <form className="flex flex-col space-y-2">
//               <Input
//                 type="email"
//                 placeholder="Your email"
//                 className="bg-[#2563eb] border-[#3b82f6] text-white placeholder-[#93c5fd]"
//               />
//               <Button
//                 type="submit"
//                 variant="secondary"
//                 className="bg-[#fbbf24] text-[#1e40af] hover:bg-white"
//               >
//                 Subscribe
//               </Button>
//             </form>
//           </div>
//         </div>
//         <div className="mt-8 pt-8 border-t border-[#3b82f6] text-center">
//           <p>
//             &copy; {new Date().getFullYear()} Windward Sailing Club. All rights
//             reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };
// Adjust if you're using a different routing library

const Footer: React.FC = () => {
  return (
    <footer className="relative py-8 text-white">
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#00008b] via-[#00008b] to-transparent"
        style={{ zIndex: -1 }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/footer-bg.jpg")',
          zIndex: -2,
        }}
      />
      <div
        className="absolute -top-[180px] left-20 bottom-4 z-[3]"
        style={{ width: "227px", height: "394px", overflow: "hidden" }}
      >
        <Image
          src="/images/footer-boat.png"
          alt="Footer decoration"
          className="object-cover w-full h-full"
          height={227}
          width={394}
        />
      </div>
      <div className="container mx-auto px-4 relative left-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ab ">
          <div>
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/logoo.png"
                  alt="Windward Sailing Club"
                  className="h-[85px] w-auto"
                  width={277.75}
                  height={84.984}
                />
              </Link>
            </div>
            <h3 className="text-xl font-bold mb-4">WINDWARD SAILING CLUB</h3>
            <p>3300 Via Lido, Windward Beach, CA 92663</p>
            <p className="mt-4">
              <strong>Service Area:</strong>
              <br />
              Windward Beach, California, and the Surrounding Areas
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Home",
              "About Us",
              "Membership Fees",
              "Rental Fees",
              "Boats",
              "Basic Sailing Certificate",
              "Advanced Sailing",
              "Coastal Navigation",
              "Privacy Policy",
              "Terms of Conditions",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:underline"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <Separator className="my-8 bg-white/20" />
        <div className="text-center">
          <p>Copyright © 2023 Windward Sailing Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export { Header, Footer };

// import React from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// const Header = () => {
//   return (
//     <header className="bg-[#f0f8ff] text-[#00008b] p-2">
//       <div className="container mx-auto flex justify-between  ">
//         <div className="flex items-center justify-end space-x-4">
//           <Link
//             href="mailto:support@windwardsailingclub.com"
//             className="text-sm hover:underline"
//           >
//             support@windwardsailingclub.com
//           </Link>
//         </div>

//         <div className="flex justify-between gap-4">
//           <div className="flex space-x-2">
//             <Link href="#" aria-label="Facebook">
//               <Facebook size={16} />
//             </Link>
//             <Link href="#" aria-label="Twitter">
//               <Twitter size={16} />
//             </Link>
//             <Link href="#" aria-label="Instagram">
//               <Instagram size={16} />
//             </Link>
//             <Link href="#" aria-label="LinkedIn">
//               <Linkedin size={16} />
//             </Link>
//           </div>
//           <Button
//             variant="default"
//             size="sm"
//             className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
//           >
//             Login
//           </Button>
//         </div>
//       </div>
//       <div className="bg-[#00008b] text-white py-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <Link href="/" className="flex items-center space-x-2">
//             <img
//               src="https://dev.windwardsailingclub.com/img/Windward/Logo_black.png"
//               alt="Windward Sailing Club"
//               className="h-12 w-auto"
//             />
//             <span className="text-xl font-bold">WINDWARD SAILING CLUB</span>
//           </Link>
//           <div className="flex items-center space-x-6">
//             <div className="flex items-center space-x-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                 />
//               </svg>
//               <div>
//                 <div className="text-sm">CALL US</div>
//                 <div className="font-bold">(949) 675-9060</div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <div>
//                 <div className="text-sm">HOURS OF OPERATION</div>
//                 <div className="font-bold">Monday — Sunday</div>
//                 <div className="text-sm">9:00 a.m. — 5:00 p.m.</div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//               <div>
//                 <div className="text-sm">COMPANY / LOCATION</div>
//                 <div className="font-bold">
//                   3300 Via Lido, Windward Beach, CA 92663
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <nav className="bg-[#87cefa] text-[#00008b] py-2">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex space-x-4">
//             {[
//               "Home",
//               "About Us",
//               "Membership Fees",
//               "Rental Fees",
//               "Boats",
//               "Members",
//             ].map((item) => (
//               <Link
//                 key={item}
//                 href={`/${item.toLowerCase().replace(" ", "-")}`}
//                 className="hover:underline"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>
//           <Button
//             variant="default"
//             size="sm"
//             className="bg-[#00bfff] hover:bg-[#0080ff] text-white"
//           >
//             BOOKING NOW
//           </Button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-[#00008b] text-white py-8">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <Link href="/" className="flex items-center space-x-2 mb-4">
//             <img
//               src="https://dev.windwardsailingclub.com/img/Sections/boat-graphic.png"
//               alt="Windward Sailing Club"
//               className="h-12 w-auto"
//             />
//             <span className="text-xl font-bold">WINDWARD SAILING CLUB</span>
//           </Link>
//           <p>3300 Via Lido, Windward Beach, CA92663</p>
//           <p className="mt-4">
//             <strong>Service Area:</strong>
//             <br />
//             Windward Beach, California, and the Surrounding Areas
//           </p>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           {[
//             "Home",
//             "About Us",
//             "Membership Fees",
//             "Rental Fees",
//             "Boats",
//             "Basic Sailing Certificate",
//             "Advanced Sailing",
//             "Coastal Navigation",
//             "Privacy Policy",
//             "Terms of Conditions",
//           ].map((item) => (
//             <Link
//               key={item}
//               href={`/${item.toLowerCase().replace(" ", "-")}`}
//               className="hover:underline"
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//         <div>
//           <h3 className="text-lg font-bold mb-4">Newsletter</h3>
//           <p className="mb-2">Stay updated with our latest news and offers!</p>
//           <form className="flex">
//             <Input type="email" placeholder="Your email" className="mr-2" />
//             <Button
//               type="submit"
//               variant="default"
//               className="bg-[#00bfff] hover:bg-[#0080ff]"
//             >
//               Subscribe
//             </Button>
//           </form>
//         </div>
//       </div>
//       <div className="container mx-auto mt-8 pt-4 border-t border-gray-600 text-center">
//         <p>Copyright © 2023 Windward Sailing Club. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export { Header, Footer };

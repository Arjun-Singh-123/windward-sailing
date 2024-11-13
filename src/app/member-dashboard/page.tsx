"use client";

import * as React from "react";
import { Mail, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const members = [
  {
    id: "1",
    name: "Amanda Martin",
    profileImage: "https://dev.windwardsailingclub.com/img/users/User51.jpg",
    address1: "68---1330 Mauna Lani Dr, Bldg 1---A",
    address2: "",
    city: "Kohala Coast",
    state: "HI",
    zipcode: "96743",
    country: "United States",
    email: "amanda.martin@example.com",
    phone: "(555) 234-5678",
    access: "Member",
    jobRole: "Safety Officer",
    about:
      "Ensures adherence to safety protocols and conducts safety briefings for members.",
    emergencyContact: {
      name: "Penelope Young",
      relation: "Sister",
      contact: "480-685-4226",
    },
  },
  {
    id: "2",
    name: "Brian Taylor",
    profileImage:
      "https://dev.windwardsailingclub.com/img/FoundingMembers/User2.jpg",
    address1: "201 Bellevue Square, Space 201",
    address2: "",
    city: "Bellevue",
    state: "WA",
    zipcode: "98004",
    country: "United States",
    email: "brian.taylor@example.com",
    phone: "(555) 987-6543",
    access: "Member",
    jobRole: "Harbor Master",
    about:
      "Manages the harbor area, assigns moorings, and enforces harbor rules and regulations.",
    emergencyContact: {
      name: "Daniel Young",
      relation: "Friend",
      contact: "612-555-5412",
    },
  },
  {
    id: "3",
    name: "Christopher Brown",
    profileImage:
      "https://dev.windwardsailingclub.com/img/FoundingMembers/User3.jpg",
    address1: "343 Sardis Station",
    address2: "",
    city: "Minneapolis",
    state: "Minnesota",
    zipcode: "55402",
    country: "United States",
    email: "christopher.brown@example.com",
    phone: "612-555-5412",
    access: "Member",
    jobRole: "Security Personnel",
    about:
      "Provides security services to ensure the safety of the club’s facilities and members.",
    emergencyContact: {
      name: "ThomasGarden",
      relation: "Brother",
      contact: "612-555-5412",
    },
  },
  {
    id: "4",
    name: "Daniel Davis",
    profileImage:
      "https://dev.windwardsailingclub.com/img/FoundingMembers/User13.jpg",
    address1: "Waikoloa Beach Resort, Unit D---8250 Waikoloa Beach",
    address2: "",
    city: "Waikoloa",
    state: "HI",
    zipcode: "96738",
    country: "United States",
    email: "daniel.davis@example.com",
    phone: "(555) 456-7890",
    access: "Member",
    jobRole: "Marketing and Communications Coordinator",
    about:
      "Develops marketing strategies, manages social media, and handles communications.",
    emergencyContact: {
      name: "Aiden King",
      relation: "Brother",
      contact: "412-882-9003",
    },
  },
  {
    id: "5",
    name: "David Thompson",
    profileImage:
      "https://dev.windwardsailingclub.com/img/FoundingMembers/User8.jpg",
    address1: "1520 E Buena Vista Drive 8A",
    address2: "",
    city: "Lake Buena Vista",
    state: "FL",
    zipcode: "32830",
    country: "United States",
    email: "david.thompson@example.com",
    phone: "(821) 036-2224",
    access: "Member",
    jobRole: "Catering and Hospitality Staff",
    about:
      "Assists members with boat rentals, ensuring they have a safe and enjoyable experience.",
    emergencyContact: {
      name: "Ryan Green",
      relation: "Brother",
      contact: "(271) 201-1925",
    },
  },
  {
    id: "6",
    name: "Emily Turner",
    profileImage: "https://dev.windwardsailingclub.com/img/users/User52.jpg",
    address1: "3115 Hillside Street",
    address2: "",
    city: "Paradise Valley",
    state: "Arizona",
    zipcode: "85253",
    country: "United States",
    email: "emily.turner@example.com",
    phone: "(651) 822-8462",
    access: "Member",
    jobRole: "Environmental Officer",
    about:
      "Manages the marina area, coordinating boat launches, moorings, and dock upkeep.",
    emergencyContact: {
      name: "Merry Doe",
      relation: "Sister",
      contact: "(361) 378-8634",
    },
  },
  {
    id: "7",
    name: "Jason Wilson",
    profileImage:
      "https://dev.windwardsailingclub.com/img/FoundingMembers/User6.jpg",
    address1: "1409 Trouser Log Road",
    address2: "",
    city: "Agawam",
    state: "Massachusetts",
    zipcode: "01001",
    country: "United States",
    email: "jason.wilson@example.com",
    phone: "413-822-9995",
    access: "Member",
    jobRole: "Sailing Instructor/Coach",
    about:
      "Experienced instructor passionate about teaching sailing techniques to all skill levels.",
    emergencyContact: {
      name: "Bravo Davis",
      relation: "Brother",
      contact: "412-882-9000",
    },
  },
  {
    id: "8",
    name: "Jennifer Smith",
    profileImage: "https://dev.windwardsailingclub.com/img/users/User2.jpg",
    address1: "15205 North Kierland Blvd. Suite 100",
    address2: "",
    city: "Scottsdale",
    state: "AZ",
    zipcode: "85254",
    country: "United States",
    email: "jennifer.smith@example.com",
    phone: "(713) 873-4244",
    access: "Member",
    jobRole: "Accountant/Financial Officer",
    about:
      "Manages financial operations, budgets, and payroll for the sailing club.",
    emergencyContact: {
      name: "Daniel Scott",
      relation: "Brother",
      contact: "(116) 920-2153",
    },
  },
  {
    id: "9",
    name: "Jessica Martinez",
    profileImage: "https://dev.windwardsailingclub.com/img/users/User3.jpg",
    address1: "2829 Ala Kalaniakaumaka, Kukui’ula Village",
    address2: "",
    city: "Koloa",
    state: "HI",
    zipcode: "96756",
    country: "United States",
    email: "jessica.martinez@example.com",
    phone: "(449) 646-6041",
    access: "Member",
    jobRole: "Dockhand/Marina Attendants",
    about:
      "Oversees daily operations, event planning, and ensures member satisfaction.",
    emergencyContact: {
      name: "William Hernandez",
      relation: "Brother",
      contact: "(305) 648-6041",
    },
  },
  {
    id: "10",
    name: "Jessica Turner",
    profileImage: "https://dev.windwardsailingclub.com/img/users/User5.jpg",
    address1: "854 Avocado Ave.",
    address2: "",
    city: "Windward Beach",
    state: "CA",
    zipcode: "92660",
    country: "United States",
    email: "jessica.turner@example.com",
    phone: "(555) 456-7890",
    access: "Member",
    jobRole: "Youth Program Coordinator",
    about:
      "Organizes and manages sailing programs and activities for children and teenagers.",
    emergencyContact: {
      name: "Harper Harris",
      relation: "Friend",
      contact: "412-882-9002",
    },
  },
];

export default function Component() {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set()
  );

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === members.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(members.map((member) => member.id)));
    }
  };

  const handleEmailClick = (email: string, id: any) => {
    if (!selectedRows.has(id)) {
      return;
    }
    window.location.href = `mailto:${email}`;
  };

  const handleEmailClickAll = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className=" container mx-auto  ">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px] p-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedRows.size === members.length}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleEmailClickAll(
                      members
                        .filter((member) => selectedRows.has(member.id))
                        .map((member) => member.email)
                        .join(";")
                    )
                  }
                  disabled={selectedRows.size === 0}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead className="w-[100px] p-2">Action</TableHead>
            <TableHead className="w-[40px] p-2">#</TableHead>
            <TableHead className="w-[40px] p-2">Profile</TableHead>
            <TableHead className="p-2">Name</TableHead>
            <TableHead className="p-2">Address1</TableHead>
            <TableHead className="p-2">Address2</TableHead>
            <TableHead className="p-2">City</TableHead>
            <TableHead className="p-2">State</TableHead>
            <TableHead className="p-2">Zipcode</TableHead>
            <TableHead className="p-2">Country</TableHead>
            <TableHead className="p-2">Email</TableHead>
            <TableHead className="p-2">Phone</TableHead>
            <TableHead className="p-2">Access</TableHead>
            <TableHead className="p-2">Job Role</TableHead>
            <TableHead className="p-2">About</TableHead>

            <TableHead colSpan={3} className="p-2">
              <div className="space-y-2">
                <div className="bg-red-500  text-white text-center text-[0.625rem]   rounded-t-sm">
                  Emergency Contact Information
                </div>

                <div className="grid grid-cols-3 gap-2 pb-4">
                  <div>Name</div>
                  <div>Relation</div>
                  <div>Contact</div>
                </div>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member, index) => (
            <TableRow key={member.id} className="border-b">
              <TableCell className="p-2">
                <Checkbox
                  checked={selectedRows.has(member.id)}
                  onCheckedChange={() => toggleRow(member.id)}
                  aria-label={`Select ${member.name}`}
                />
              </TableCell>
              <TableCell className="p-2">
                <div className="flex items-center  ">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEmailClick(member.email, member.id)}
                    disabled={!selectedRows.has(member.id)}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="p-2">{index + 1}</TableCell>
              <TableCell className="p-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.profileImage} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap ">
                {member.name}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap ">
                {member.address1}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap ">
                {member.address2}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                {member.city}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                {member.state}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                {member.zipcode}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                {member.country}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                {member.email}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                {member.phone}
              </TableCell>
              <TableCell className="p-2">{member.access}</TableCell>
              <TableCell className="p-2">{member.jobRole}</TableCell>
              <TableCell className="p-2">{member.about}</TableCell>
              <TableCell className="p-2">
                {member.emergencyContact.name}
              </TableCell>
              <TableCell className="p-2">
                {member.emergencyContact.relation}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                {member.emergencyContact.contact}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, X, Check } from "lucide-react";

const initialBoats = [
  {
    id: 1,
    name: "Catalina",
    size: "36 ft",
    availableNo: 2,
    bookedStatus: "Booked",
    bookedStartDate: "2023-07-15",
    bookedEndDate: "2023-07-20",
    bookedBy: {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    availabilityTime: "9 AM - 5 PM",
  },
  {
    id: 2,
    name: "Duffield Southern Park",
    size: "42 ft",
    availableNo: 1,
    bookedStatus: "Available",
    bookedStartDate: "",
    bookedEndDate: "",
    bookedBy: {
      name: "",
      email: "",
      phone: "",
    },
    availabilityTime: "8 AM - 6 PM",
  },
  {
    id: 3,
    name: "Hunter 40",
    size: "38 ft",
    availableNo: 3,
    bookedStatus: "Booked",
    bookedStartDate: "2023-08-01",
    bookedEndDate: "2023-08-05",
    bookedBy: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
    },
    availabilityTime: "10 AM - 4 PM",
  },
];

export default function AdminBoatTable() {
  const [boats, setBoats] = useState(initialBoats);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedBoat, setEditedBoat] = useState<any>(null);

  const handleEdit = (boat: any) => {
    console.log("checing boat", boat);
    setEditingId(boat.id);
    setEditedBoat({ ...boat });
  };

  const handleSave = () => {
    setBoats(boats.map((boat) => (boat.id === editingId ? editedBoat : boat)));
    setEditingId(null);
    setEditedBoat(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedBoat(null);
  };

  const handleDelete = (id: number) => {
    console.log("checking id", id);
    const boat = [...boats];
    const indexToDelete = boat.findIndex((item) => item.id === id);
    console.log("checking id to delete", indexToDelete);
    console.log("before boats", boats);

    if (indexToDelete !== -1) {
      boat.splice(indexToDelete, 1);
    }
    console.log("after boats", boats);
    setBoats(boat);
    return boat;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedBoat({ ...editedBoat, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Boat Management</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Controls</TableHead>
              <TableHead>Boat Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Available No.</TableHead>
              <TableHead>Booked Status</TableHead>
              <TableHead>Booked Start Date</TableHead>
              <TableHead>Booked End Date</TableHead>
              <TableHead>Booked By</TableHead>
              <TableHead>Availability Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boats?.map((boat) => (
              <TableRow key={boat.id}>
                <TableCell>
                  {editingId === boat.id ? (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(boat)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(boat.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Input
                      name="name"
                      value={editedBoat.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    boat.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Input
                      name="size"
                      value={editedBoat.size}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    boat.size
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Input
                      name="availableNo"
                      type="number"
                      value={editedBoat.availableNo}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    boat.availableNo
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Input
                      name="bookedStatus"
                      value={editedBoat.bookedStatus}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    boat.bookedStatus
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Input
                      name="bookedStartDate"
                      type="date"
                      value={editedBoat.bookedStartDate}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    boat.bookedStartDate
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Input
                      name="bookedEndDate"
                      type="date"
                      value={editedBoat.bookedEndDate}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    boat.bookedEndDate
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <div className="space-y-2">
                      <Input
                        name="bookedBy.name"
                        value={editedBoat.bookedBy.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="w-full"
                      />
                      <Input
                        name="bookedBy.email"
                        value={editedBoat.bookedBy.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full"
                      />
                      <Input
                        name="bookedBy.phone"
                        value={editedBoat.bookedBy.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <p>{boat.bookedBy.name}</p>
                      <p>{boat.bookedBy.email}</p>
                      <p>{boat.bookedBy.phone}</p>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Input
                      name="availabilityTime"
                      value={editedBoat.availabilityTime}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    boat.availabilityTime
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

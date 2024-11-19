"use client";

"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Pencil, Trash2, X, Plus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import { supabase } from "@/lib/supabase";

const boatSchema = z.object({
  name: z.string().min(1, "Boat name is required"),
  size: z.string().min(1, "Size is required"),
  available_no: z.number().int().positive("Available number must be positive"),
  booked_status: z.string().min(1, "Booked status is required"),
  booked_start_date: z.string().optional(),
  booked_end_date: z.string().optional(),
  booked_by_name: z.string().optional(),
  booked_by_email: z.string().email().optional().or(z.literal("")),
  booked_by_phone: z.string().optional(),
  availability_time: z.string().min(1, "Availability time is required"),
});

type BoatFormData = z.infer<typeof boatSchema>;

export default function AdminBoatTable() {
  const [boats, setBoats] = useState<(BoatFormData & { id: number })[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoatFormData>({
    resolver: zodResolver(boatSchema),
    defaultValues: {
      name: "",
      size: "",
      available_no: 1,
      booked_status: "Available",
      booked_start_date: "",
      booked_end_date: "",
      booked_by_name: "",
      booked_by_email: "",
      booked_by_phone: "",
      availability_time: "9 AM - 5 PM",
    },
  });

  useEffect(() => {
    fetchBoats();
  }, []);

  async function fetchBoats() {
    const { data, error } = await supabase.from("boats").select("*");
    if (error) {
      console.error("Error fetching boats:", error);
      toast.error("Failed to fetch boats");
    } else {
      setBoats(data as any);
    }
  }

  const handleEdit = (boat: BoatFormData & { id: number }) => {
    setEditingId(boat.id);
    reset(boat);
  };

  const handleSave = async (data: BoatFormData) => {
    if (editingId) {
      const { error } = await supabase
        .from("boats")
        .update(data)
        .eq("id", editingId);

      if (error) {
        console.error("Error updating boat:", error);
        toast.error("Failed to update boat");
      } else {
        setEditingId(null);
        fetchBoats();
        toast.success("Boat updated successfully");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
  };

  const handleDelete = async () => {
    if (deleteId) {
      const { error } = await supabase
        .from("boats")
        .delete()
        .eq("id", deleteId);

      if (error) {
        console.error("Error deleting boat:", error);
        toast.error("Failed to delete boat");
      } else {
        setDeleteDialogOpen(false);
        setDeleteId(null);
        fetchBoats();
        toast.success("Boat deleted successfully");
      }
    }
  };

  const handleCreate = async (data: BoatFormData) => {
    const { error } = await supabase.from("boats").insert([data]);

    if (error) {
      console.error("Error creating boat:", error);
      toast.error("Failed to create boat");
    } else {
      setCreateDialogOpen(false);
      reset();
      fetchBoats();
      toast.success("Boat created successfully");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-40">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Boat Management</h1>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Boat
        </Button>
      </div>
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
            {boats.map((boat) => (
              <TableRow key={boat.id}>
                <TableCell>
                  {editingId === boat.id ? (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSubmit(handleSave)}>
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
                        onClick={() => {
                          setDeleteId(boat.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} className="w-full" />
                      )}
                    />
                  ) : (
                    boat.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Controller
                      name="size"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} className="w-full" />
                      )}
                    />
                  ) : (
                    boat.size
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Controller
                      name="available_no"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="number" className="w-full" />
                      )}
                    />
                  ) : (
                    boat.available_no
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Controller
                      name="booked_status"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} className="w-full" />
                      )}
                    />
                  ) : (
                    boat.booked_status
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Controller
                      name="booked_start_date"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="date" className="w-full" />
                      )}
                    />
                  ) : (
                    boat.booked_start_date
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Controller
                      name="booked_end_date"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="date" className="w-full" />
                      )}
                    />
                  ) : (
                    boat.booked_end_date
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <div className="space-y-2">
                      <Controller
                        name="booked_by_name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Name"
                            className="w-full"
                          />
                        )}
                      />
                      <Controller
                        name="booked_by_email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Email"
                            className="w-full"
                          />
                        )}
                      />
                      <Controller
                        name="booked_by_phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Phone"
                            className="w-full"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>{boat.booked_by_name}</p>
                      <p>{boat.booked_by_email}</p>
                      <p>{boat.booked_by_phone}</p>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === boat.id ? (
                    <Controller
                      name="availability_time"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} className="w-full" />
                      )}
                    />
                  ) : (
                    boat.availability_time
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this boat? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Boat</DialogTitle>
            <DialogDescription>
              Enter the details for the new boat.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleCreate)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input id="name" className="col-span-3" {...field} />
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="size" className="text-right">
                  Size
                </label>
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <Input id="size" className="col-span-3" {...field} />
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="available_no" className="text-right">
                  Available No.
                </label>
                <Controller
                  name="available_no"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="available_no"
                      type="number"
                      className="col-span-3"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="booked_status" className="text-right">
                  Booked Status
                </label>
                <Controller
                  name="booked_status"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="booked_status"
                      className="col-span-3"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="availability_time" className="text-right">
                  Availability Time
                </label>
                <Controller
                  name="availability_time"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="availability_time"
                      className="col-span-3"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Boat</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Check, Pencil, Trash2, X } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { supabase } from "@/lib/supabase";

// // Zod schema for form validation
// const boatSchema = z.object({
//   name: z.string().min(1, "Boat name is required"),
//   size: z.string().min(1, "Size is required"),
//   available_no: z.number().int().positive("Available number must be positive"),
//   booked_status: z.string().min(1, "Booked status is required"),
//   booked_start_date: z.string().optional(),
//   booked_end_date: z.string().optional(),
//   booked_by_name: z.string().optional(),
//   booked_by_email: z.string().email().optional(),
//   booked_by_phone: z.string().optional(),
//   availability_time: z.string().min(1, "Availability time is required"),
// });

// type BoatFormData = z.infer<typeof boatSchema>;

// export default function AdminBoatTable() {
//   const [boats, setBoats] = useState<BoatFormData[]>([]);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState<number | null>(null);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<BoatFormData>({
//     resolver: zodResolver(boatSchema),
//   });

//   useEffect(() => {
//     fetchBoats();
//   }, []);

//   async function fetchBoats() {
//     const { data, error } = await supabase.from("boats").select("*");
//     if (error) {
//       console.error("Error fetching boats:", error);
//     } else {
//       setBoats(data);
//     }
//   }

//   const handleEdit = (boat: BoatFormData & { id: number }) => {
//     setEditingId(boat.id);
//     reset(boat);
//   };

//   const handleSave = async (data: BoatFormData) => {
//     if (editingId) {
//       const { error } = await supabase
//         .from("boats")
//         .update(data)
//         .eq("id", editingId);

//       if (error) {
//         console.error("Error updating boat:", error);
//       } else {
//         setEditingId(null);
//         fetchBoats();
//       }
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     reset();
//   };

//   const handleDelete = async () => {
//     if (deleteId) {
//       const { error } = await supabase
//         .from("boats")
//         .delete()
//         .eq("id", deleteId);

//       if (error) {
//         console.error("Error deleting boat:", error);
//       } else {
//         setDeleteDialogOpen(false);
//         setDeleteId(null);
//         fetchBoats();
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 pt-40">
//       <h1 className="text-2xl font-bold mb-4">Admin Boat Management</h1>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Controls</TableHead>
//               <TableHead>Boat Name</TableHead>
//               <TableHead>Size</TableHead>
//               <TableHead>Available No.</TableHead>
//               <TableHead>Booked Status</TableHead>
//               <TableHead>Booked Start Date</TableHead>
//               <TableHead>Booked End Date</TableHead>
//               <TableHead>Booked By</TableHead>
//               <TableHead>Availability Time</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {boats?.map((boat) => (
//               <TableRow key={boat.id}>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <div className="flex space-x-2">
//                       <Button size="sm" onClick={handleSubmit(handleSave)}>
//                         <Check className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={handleCancel}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex space-x-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleEdit(boat)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => {
//                           setDeleteId(boat.id);
//                           setDeleteDialogOpen(true);
//                         }}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Controller
//                       name="name"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} className="w-full" />
//                       )}
//                     />
//                   ) : (
//                     boat.name
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Controller
//                       name="size"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} className="w-full" />
//                       )}
//                     />
//                   ) : (
//                     boat.size
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Controller
//                       name="available_no"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} type="number" className="w-full" />
//                       )}
//                     />
//                   ) : (
//                     boat.available_no
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Controller
//                       name="booked_status"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} className="w-full" />
//                       )}
//                     />
//                   ) : (
//                     boat.booked_status
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Controller
//                       name="booked_start_date"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} type="date" className="w-full" />
//                       )}
//                     />
//                   ) : (
//                     boat.booked_start_date
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Controller
//                       name="booked_end_date"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} type="date" className="w-full" />
//                       )}
//                     />
//                   ) : (
//                     boat.booked_end_date
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <div className="space-y-2">
//                       <Controller
//                         name="booked_by_name"
//                         control={control}
//                         render={({ field }) => (
//                           <Input
//                             {...field}
//                             placeholder="Name"
//                             className="w-full"
//                           />
//                         )}
//                       />
//                       <Controller
//                         name="booked_by_email"
//                         control={control}
//                         render={({ field }) => (
//                           <Input
//                             {...field}
//                             placeholder="Email"
//                             className="w-full"
//                           />
//                         )}
//                       />
//                       <Controller
//                         name="booked_by_phone"
//                         control={control}
//                         render={({ field }) => (
//                           <Input
//                             {...field}
//                             placeholder="Phone"
//                             className="w-full"
//                           />
//                         )}
//                       />
//                     </div>
//                   ) : (
//                     <div>
//                       <p>{boat.booked_by_name}</p>
//                       <p>{boat.booked_by_email}</p>
//                       <p>{boat.booked_by_phone}</p>
//                     </div>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Controller
//                       name="availability_time"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} className="w-full" />
//                       )}
//                     />
//                   ) : (
//                     boat.availability_time
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this boat? This action cannot be
//               undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Pencil, Trash2, X, Check } from "lucide-react";
// import HeroFallback from "@/components/common/hero-slider-check";

// const initialBoats = [
//   {
//     id: 1,
//     name: "Catalina",
//     size: "36 ft",
//     availableNo: 2,
//     bookedStatus: "Booked",
//     bookedStartDate: "2023-07-15",
//     bookedEndDate: "2023-07-20",
//     bookedBy: {
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "123-456-7890",
//     },
//     availabilityTime: "9 AM - 5 PM",
//   },
//   {
//     id: 2,
//     name: "Duffield Southern Park",
//     size: "42 ft",
//     availableNo: 1,
//     bookedStatus: "Available",
//     bookedStartDate: "",
//     bookedEndDate: "",
//     bookedBy: {
//       name: "",
//       email: "",
//       phone: "",
//     },
//     availabilityTime: "8 AM - 6 PM",
//   },
//   {
//     id: 3,
//     name: "Hunter 40",
//     size: "38 ft",
//     availableNo: 3,
//     bookedStatus: "Booked",
//     bookedStartDate: "2023-08-01",
//     bookedEndDate: "2023-08-05",
//     bookedBy: {
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "987-654-3210",
//     },
//     availabilityTime: "10 AM - 4 PM",
//   },
// ];

// export default function AdminBoatTable() {
//   const [boats, setBoats] = useState(initialBoats);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editedBoat, setEditedBoat] = useState<any>(null);

//   const handleEdit = (boat: any) => {
//     console.log("checing boat", boat);
//     setEditingId(boat.id);
//     setEditedBoat({ ...boat });
//   };

//   const handleSave = () => {
//     setBoats(boats.map((boat) => (boat.id === editingId ? editedBoat : boat)));
//     setEditingId(null);
//     setEditedBoat(null);
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEditedBoat(null);
//   };

//   const handleDelete = (id: number) => {
//     console.log("checking id", id);
//     const boat = [...boats];
//     const indexToDelete = boat.findIndex((item) => item.id === id);
//     console.log("checking id to delete", indexToDelete);
//     console.log("before boats", boats);

//     if (indexToDelete !== -1) {
//       boat.splice(indexToDelete, 1);
//     }
//     console.log("after boats", boats);
//     setBoats(boat);
//     return boat;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedBoat({ ...editedBoat, [name]: value });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <HeroFallback />
//       <h1 className="text-2xl font-bold mb-4">Admin Boat Management</h1>
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Controls</TableHead>
//               <TableHead>Boat Name</TableHead>
//               <TableHead>Size</TableHead>
//               <TableHead>Available No.</TableHead>
//               <TableHead>Booked Status</TableHead>
//               <TableHead>Booked Start Date</TableHead>
//               <TableHead>Booked End Date</TableHead>
//               <TableHead>Booked By</TableHead>
//               <TableHead>Availability Time</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {boats?.map((boat) => (
//               <TableRow key={boat.id}>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <div className="flex space-x-2">
//                       <Button size="sm" onClick={handleSave}>
//                         <Check className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={handleCancel}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex space-x-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleEdit(boat)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="destructive"
//                         onClick={() => handleDelete(boat.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Input
//                       name="name"
//                       value={editedBoat.name}
//                       onChange={handleInputChange}
//                       className="w-full"
//                     />
//                   ) : (
//                     boat.name
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Input
//                       name="size"
//                       value={editedBoat.size}
//                       onChange={handleInputChange}
//                       className="w-full"
//                     />
//                   ) : (
//                     boat.size
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Input
//                       name="availableNo"
//                       type="number"
//                       value={editedBoat.availableNo}
//                       onChange={handleInputChange}
//                       className="w-full"
//                     />
//                   ) : (
//                     boat.availableNo
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Input
//                       name="bookedStatus"
//                       value={editedBoat.bookedStatus}
//                       onChange={handleInputChange}
//                       className="w-full"
//                     />
//                   ) : (
//                     boat.bookedStatus
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Input
//                       name="bookedStartDate"
//                       type="date"
//                       value={editedBoat.bookedStartDate}
//                       onChange={handleInputChange}
//                       className="w-full"
//                     />
//                   ) : (
//                     boat.bookedStartDate
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Input
//                       name="bookedEndDate"
//                       type="date"
//                       value={editedBoat.bookedEndDate}
//                       onChange={handleInputChange}
//                       className="w-full"
//                     />
//                   ) : (
//                     boat.bookedEndDate
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <div className="space-y-2">
//                       <Input
//                         name="bookedBy.name"
//                         value={editedBoat.bookedBy.name}
//                         onChange={handleInputChange}
//                         placeholder="Name"
//                         className="w-full"
//                       />
//                       <Input
//                         name="bookedBy.email"
//                         value={editedBoat.bookedBy.email}
//                         onChange={handleInputChange}
//                         placeholder="Email"
//                         className="w-full"
//                       />
//                       <Input
//                         name="bookedBy.phone"
//                         value={editedBoat.bookedBy.phone}
//                         onChange={handleInputChange}
//                         placeholder="Phone"
//                         className="w-full"
//                       />
//                     </div>
//                   ) : (
//                     <div>
//                       <p>{boat.bookedBy.name}</p>
//                       <p>{boat.bookedBy.email}</p>
//                       <p>{boat.bookedBy.phone}</p>
//                     </div>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {editingId === boat.id ? (
//                     <Input
//                       name="availabilityTime"
//                       value={editedBoat.availabilityTime}
//                       onChange={handleInputChange}
//                       className="w-full"
//                     />
//                   ) : (
//                     boat.availabilityTime
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

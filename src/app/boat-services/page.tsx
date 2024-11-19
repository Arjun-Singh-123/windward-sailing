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
    <div className="w-full pt-40">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ml-4">Admin Boat Management</h1>
        <Button
          className="bg-black text-white"
          onClick={() => setCreateDialogOpen(true)}
        >
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

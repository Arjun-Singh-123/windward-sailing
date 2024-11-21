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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const renderFormField = (
    name: keyof BoatFormData,
    label: string,
    type: string = "text"
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="grid grid-cols-2 gap-2 items-center py-2">
          <span className="font-medium text-sm text-right pr-2">{label}:</span>
          <Input {...field} type={type} className="w-full" />
        </div>
      )}
    />
  );

  const renderEditableCell = (
    field: keyof BoatFormData,
    value: any,
    type: string = "text"
  ) => {
    if (editingId) {
      return (
        <Controller
          name={field}
          control={control}
          render={({ field: controlField }) => (
            <Input
              {...controlField}
              type={type}
              className="w-full"
              // error={errors[field]?.message as any}
            />
          )}
        />
      );
    }
    return <span>{value}</span>;
  };

  return (
    <div className="w-full pt-40">
      <Toaster />
      <div className="flex justify-between items-center mb-4 px-4">
        <h1 className="text-2xl font-bold">Admin Boat Management</h1>
        <Button
          className="bg-black text-white"
          onClick={() => setCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Boat
        </Button>
      </div>

      <div className="hidden md:block overflow-x-auto">
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
                  <div className="flex space-x-2">
                    {editingId === boat.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={handleSubmit(handleSave)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {editingId === boat.id
                    ? renderEditableCell("name", boat.name)
                    : boat.name}
                </TableCell>
                <TableCell>
                  {editingId === boat.id
                    ? renderEditableCell("size", boat.size)
                    : boat.size}
                </TableCell>
                <TableCell>
                  {editingId === boat.id
                    ? renderEditableCell(
                        "available_no",
                        boat.available_no,
                        "number"
                      )
                    : boat.available_no}
                </TableCell>
                <TableCell>
                  {editingId === boat.id
                    ? renderEditableCell("booked_status", boat.booked_status)
                    : boat.booked_status}
                </TableCell>
                <TableCell>
                  {editingId === boat.id
                    ? renderEditableCell(
                        "booked_start_date",
                        boat.booked_start_date,
                        "date"
                      )
                    : boat.booked_start_date}
                </TableCell>
                <TableCell>
                  {editingId === boat.id
                    ? renderEditableCell(
                        "booked_end_date",
                        boat.booked_end_date,
                        "date"
                      )
                    : boat.booked_end_date}
                </TableCell>
                <TableCell>
                  <div>
                    {editingId === boat.id ? (
                      <>
                        {renderEditableCell(
                          "booked_by_name",
                          boat.booked_by_name
                        )}
                        {renderEditableCell(
                          "booked_by_email",
                          boat.booked_by_email,
                          "email"
                        )}
                        {renderEditableCell(
                          "booked_by_phone",
                          boat.booked_by_phone,
                          "tel"
                        )}
                      </>
                    ) : (
                      <>
                        <p>{boat.booked_by_name}</p>
                        <p>{boat.booked_by_email}</p>
                        <p>{boat.booked_by_phone}</p>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {editingId === boat.id
                    ? renderEditableCell(
                        "availability_time",
                        boat.availability_time
                      )
                    : boat.availability_time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <TableBody>
            {boats.map((boat) => (
              <TableRow key={boat.id}>
                <TableCell>
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
                </TableCell>
                <TableCell>{boat.name}</TableCell>
                <TableCell>{boat.size}</TableCell>
                <TableCell>{boat.available_no}</TableCell>
                <TableCell>{boat.booked_status}</TableCell>
                <TableCell>{boat.booked_start_date}</TableCell>
                <TableCell>{boat.booked_end_date}</TableCell>
                <TableCell>
                  <div>
                    <p>{boat.booked_by_name}</p>
                    <p>{boat.booked_by_email}</p>
                    <p>{boat.booked_by_phone}</p>
                  </div>
                </TableCell>
                <TableCell>{boat.availability_time}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}

      <div className="md:hidden space-y-4 px-4">
        {boats.map((boat) => (
          <Card key={boat.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{boat.name}</span>
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
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1 text-sm">
              {editingId === boat.id ? (
                <form onSubmit={handleSubmit(handleSave)} className="space-y-2">
                  {renderFormField("size", "Size")}
                  {renderFormField("available_no", "Available No.", "number")}
                  {renderFormField("booked_status", "Booked Status")}
                  {renderFormField("booked_start_date", "Start Date", "date")}
                  {renderFormField("booked_end_date", "End Date", "date")}
                  {renderFormField("booked_by_name", "Booked By")}
                  {renderFormField("booked_by_email", "Email")}
                  {renderFormField("booked_by_phone", "Phone")}
                  {renderFormField("availability_time", "Availability")}
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button size="sm" onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" type="submit">
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">Size:</span>
                    <span>{boat.size}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">
                      Available:
                    </span>
                    <span>{boat.available_no}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">Status:</span>
                    <span>{boat.booked_status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">
                      Start Date:
                    </span>
                    <span>{boat.booked_start_date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">
                      End Date:
                    </span>
                    <span>{boat.booked_end_date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">
                      Booked By:
                    </span>
                    <span>{boat.booked_by_name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">Email:</span>
                    <span>{boat.booked_by_email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-right pr-2">Phone:</span>
                    <span>{boat.booked_by_phone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <span className="font-medium text-right pr-2">
                      Availability:
                    </span>
                    <span>{boat.availability_time}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
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
              {renderFormField("name", "Name")}
              {renderFormField("size", "Size")}
              {renderFormField("available_no", "Available No.", "number")}
              {renderFormField("booked_status", "Booked Status")}
              {renderFormField("availability_time", "Availability Time")}
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

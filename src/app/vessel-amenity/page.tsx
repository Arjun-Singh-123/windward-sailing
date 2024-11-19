"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Check, X, Plus } from "lucide-react";
import { toast } from "sonner";

type Vessel = {
  id?: string;
  vessel: string;
  mfg: string;
  size: string;
  autopilot: boolean;
  bimini: boolean;
  refrigerator: boolean;
  heater: boolean;
  microwave_stove: boolean;
  cabins: string;
  cockpit_table: boolean;
  shower_system: boolean;
  depth_fish: boolean;
  dodger: boolean;
  gps: boolean;
  head_shower: boolean;
  ice_box: boolean;
  microwave: boolean;
  marine_radio: boolean;
  stereo: boolean;
  swim_platform: boolean;
  stove: boolean;
  sails: boolean;
  bbq: boolean;
  fuel_tank_size: string;
  water_tank_size: string;
  max_persons: string;
};

const vesselSchema = z.object({
  vessel: z.string().min(1, "Vessel name is required"),
  mfg: z.string().min(1, "Manufacturer is required"),
  size: z.string().min(1, "Size is required"),
  autopilot: z.boolean().default(false),
  bimini: z.boolean().default(false),
  refrigerator: z.boolean().default(false),
  heater: z.boolean().default(false),
  microwave_stove: z.boolean().default(false),
  cabins: z.string().nullable(),
  cockpit_table: z.boolean().default(false),
  shower_system: z.boolean().default(false),
  depth_fish: z.boolean().default(false),
  dodger: z.boolean().default(false),
  gps: z.boolean().default(false),
  head_shower: z.boolean().default(false),
  ice_box: z.boolean().default(false),
  microwave: z.boolean().default(false),
  marine_radio: z.boolean().default(false),
  stereo: z.boolean().default(false),
  swim_platform: z.boolean().default(false),
  stove: z.boolean().default(false),
  sails: z.boolean().default(false),
  bbq: z.boolean().default(false),
  fuel_tank_size: z.string().nullable(),
  water_tank_size: z.string().nullable(),
  max_persons: z.string().nullable(),
});

const columns: (keyof Vessel)[] = [
  "vessel",
  "mfg",
  "size",
  "autopilot",
  "bimini",
  "refrigerator",
  "heater",
  "microwave_stove",
  "cabins",
  "cockpit_table",
  "shower_system",
  "depth_fish",
  "dodger",
  "gps",
  "head_shower",
  "ice_box",
  "microwave",
  "marine_radio",
  "stereo",
  "swim_platform",
  "stove",
  "sails",
  "bbq",
  "fuel_tank_size",
  "water_tank_size",
  "max_persons",
];

export default function Component() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [editingVessel, setEditingVessel] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vesselToDelete, setVesselToDelete] = useState<string | null>(null);

  const form = useForm<Vessel>({
    resolver: zodResolver(vesselSchema),
    defaultValues: {
      vessel: "",
      mfg: "",
      size: "",
      autopilot: false,
      bimini: false,
      refrigerator: false,
      heater: false,
      microwave_stove: false,
      cabins: "",
      cockpit_table: false,
      shower_system: false,
      depth_fish: false,
      dodger: false,
      gps: false,
      head_shower: false,
      ice_box: false,
      microwave: false,
      marine_radio: false,
      stereo: false,
      swim_platform: false,
      stove: false,
      sails: false,
      bbq: false,
      fuel_tank_size: "",
      water_tank_size: "",
      max_persons: "",
    },
  });

  useEffect(() => {
    fetchVessels();
  }, []);

  async function fetchVessels() {
    const { data, error } = await supabase.from("vessels").select("*");
    if (error) {
      console.error("Error fetching vessels:", error);
      toast.error("Failed to fetch vessels");
    } else {
      setVessels(data as any);
    }
  }

  const handleEdit = (vessel: Vessel) => {
    setEditingVessel(vessel.id!);
    form.reset(vessel);
  };

  const onSubmit = async (data: Vessel) => {
    if (editingVessel === "new") {
      const { data: newVessel, error } = await supabase
        .from("vessels")
        .insert(data)
        .select()
        .single();
      if (error) {
        console.error("Error creating vessel:", error);
        toast.error("Failed to create vessel");
      } else {
        toast.success("Vessel created successfully");
        setVessels((prevVessels: unknown) => {
          return [
            newVessel as Vessel,
            ...(prevVessels as Vessel[]).filter(
              (v) => (v as Vessel).id !== "new"
            ),
          ];
        });
        setEditingVessel(null);
      }
    } else if (editingVessel) {
      const { error } = await supabase
        .from("vessels")
        .update(data)
        .eq("id", editingVessel);
      if (error) {
        console.error("Error updating vessel:", error);
        toast.error("Failed to update vessel");
      } else {
        toast.success("Vessel updated successfully");
        setVessels(
          vessels.map((v) => (v.id === editingVessel ? { ...v, ...data } : v))
        );
        setEditingVessel(null);
      }
    }
    form.reset();
  };

  const handleCancel = () => {
    if (editingVessel === "new") {
      setVessels((prevVessels) => prevVessels.filter((v) => v.id !== "new"));
    }
    setEditingVessel(null);
    form.reset();
  };

  const handleDelete = (id: string) => {
    setVesselToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (vesselToDelete) {
      const { error } = await supabase
        .from("vessels")
        .delete()
        .eq("id", vesselToDelete);
      if (error) {
        console.error("Error deleting vessel:", error);
        toast.error("Failed to delete vessel");
      } else {
        toast.success("Vessel deleted successfully");
        setVessels(vessels.filter((v) => v.id !== vesselToDelete));
      }
    }
    setDeleteDialogOpen(false);
    setVesselToDelete(null);
  };

  const handleCreateNew = () => {
    form.reset({
      vessel: "",
      mfg: "",
      size: "",
      autopilot: false,
      bimini: false,
      refrigerator: false,
      heater: false,
      microwave_stove: false,
      cabins: "",
      cockpit_table: false,
      shower_system: false,
      depth_fish: false,
      dodger: false,
      gps: false,
      head_shower: false,
      ice_box: false,
      microwave: false,
      marine_radio: false,
      stereo: false,
      swim_platform: false,
      stove: false,
      sails: false,
      bbq: false,
      fuel_tank_size: "",
      water_tank_size: "",
      max_persons: "",
    });
    setVessels([{ id: "new" } as Vessel, ...vessels]);
    setEditingVessel("new");
  };

  return (
    <div className=" pt-40">
      <div className="flex justify-between items-center mb-4 pr-8">
        <h2 className="text-2xl font-bold ml-4">Vessel Amenities</h2>
        <Button className="bg-black text-white " onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" /> Create New Vessel
        </Button>
      </div>
      <div className="max-h-[800px] overflow-y-auto relative">
        <Table className="border-collapse border-dashed border-red-500 text-xs">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="text-right">Actions</TableHead>
              {columns.map((column) => (
                <TableHead
                  key={column}
                  className="text-center whitespace-nowrap px-2 border-r border-dotted border-gray-300"
                >
                  {column.charAt(0).toUpperCase() +
                    column
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .replace(/_/g, " ")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {vessels?.map((vessel) => {
              console.log(vessel);
              return (
                <TableRow
                  key={vessel.id}
                  className="border-b odd:bg-gray-100 even:bg-white"
                >
                  <TableCell className="text-right whitespace-nowrap gap-2">
                    {editingVessel === vessel.id ||
                    (editingVessel === "new" && vessel.id === "new") ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={form.handleSubmit(onSubmit)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(vessel)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(vessel.id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                  {columns?.map((column) => (
                    <TableCell
                      key={column}
                      className="text-center px-2 border-r border-dotted border-gray-300 whitespace-nowrap"
                    >
                      {editingVessel === vessel.id ||
                      (editingVessel === "new" && vessel.id === "new") ? (
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                          >
                            <FormField
                              control={form.control}
                              name={column}
                              render={({ field }) => {
                                console.log(field);
                                console.log(column);
                                console.log(form);
                                console.log(form.watch("size"));
                                // Check if the field is a boolean type
                                const isBooleanField =
                                  typeof field.value === "boolean";
                                return (
                                  <FormItem>
                                    <FormControl>
                                      {isBooleanField ? (
                                        <Checkbox
                                          checked={field.value as boolean}
                                          onCheckedChange={field.onChange}
                                        />
                                      ) : (
                                        <Input
                                          {...field}
                                          value={
                                            field.value !== undefined
                                              ? String(field.value)
                                              : ""
                                          } // Ensure value is a string
                                          onChange={(e) =>
                                            field.onChange(e.target.value)
                                          } // Handle string input
                                          onBlur={field.onBlur} // Ensure onBlur is handled
                                        />
                                      )}
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </form>
                        </Form>
                      ) : typeof vessel[column] === "boolean" ? (
                        vessel[column] ? (
                          "✓"
                        ) : null
                      ) : (
                        vessel[column]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vessel? This action cannot be
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
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Check, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { desiredOrder } from "@/constants";

type Vessel = {
  id?: string;
  vessel: string;
  mfg: string;
  size: number;
  autopilot: boolean;
  bimini: boolean;
  refrigerator: boolean;
  heater: boolean;
  microwave_stove: boolean;
  cabins: number; // Changed from string to number
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

  fuel_tank_size: number;
  water_tank_size: number;
  max_persons: number;
};

const vesselSchema = z.object({
  vessel: z.string().min(1, "Vessel name is required"),
  mfg: z.string().min(1, "Manufacturer is required"),
  size: z.number().positive("Size must be positive"),
  autopilot: z.boolean().default(false),
  bimini: z.boolean().default(false),
  refrigerator: z.boolean().default(false),
  heater: z.boolean().default(false),
  microwave_stove: z.boolean().default(false),
  cabins: z.number().min(0, "Cabins must be non-negative"),
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
  fuel_tank_size: z.number().positive("Fuel tank size must be positive"),
  water_tank_size: z.number().positive("Water tank size must be positive"),
  max_persons: z.number().positive("Maximum persons must be positive"),
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
      size: 0,
      autopilot: false,
      bimini: false,
      refrigerator: false,
      heater: false,
      microwave_stove: false,
      cabins: 0,
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
      fuel_tank_size: 0,
      water_tank_size: 0,
      max_persons: 0,
    },
  });

  // const data = useQuery({
  //   queryKey:["vessels-data"],
  //   queryFn:fetchVessels
  // })

  useEffect(() => {
    fetchVessels();
    // setVessels(data as Vessel[]);
  }, []);

  async function fetchVessels() {
    const { data, error } = await supabase.from("vessels").select("*");
    if (error) {
      console.error("Error fetching vessels:", error);
      toast.error("Failed to fetch vessels");
    } else {
      const sortedVessels = data?.sort((a, b) => {
        return desiredOrder.indexOf(a.vessel) - desiredOrder.indexOf(b.vessel);
      });
      setVessels(sortedVessels as Vessel[]);
      return data;
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
        setVessels((prevVessels) => [
          newVessel as Vessel,
          ...prevVessels.filter((v) => v.id !== "new"),
        ]);
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
      size: 0,
      autopilot: false,
      bimini: false,
      refrigerator: false,
      heater: false,
      microwave_stove: false,
      cabins: 0,
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
      fuel_tank_size: 0,
      water_tank_size: 0,
      max_persons: 0,
    });
    setVessels([{ id: "new" } as Vessel, ...vessels]);
    setEditingVessel("new");
  };

  // const renderFormField = (
  //   column: keyof Vessel
  // ) => (
  //   <FormField control={form.control} name={column}>
  //     <FormItem>
  //       <div className="grid grid-cols-2 gap-2 items-center py-2">
  //         <span className="font-medium text-sm text-right pr-2">{label}:</span>
  //         <FormControl>
  //           {type === "boolean" ? (
  //             <Checkbox
  //               checked={field.value}
  //               onCheckedChange={field.onChange}
  //             />
  //           ) : (
  //             <Input {...field} type={type} className="w-full" />
  //           )}
  //         </FormControl>
  //       </div>
  //       <FormMessage />
  //     </FormItem>
  //   </FormField>
  // );

  const renderFormField = (column: keyof Vessel, editingVessel?: any) => (
    <FormField
      control={form.control}
      name={column}
      render={({ field }) => {
        console.log(field);
        // const inputType =
        const inputType =
          typeof field?.value === "number"
            ? "number"
            : typeof field?.value === "boolean"
            ? "checkbox"
            : "text";

        return (
          <FormItem>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 items-center">
              <FormLabel className="md:hidden font-medium text-sm text-right pr-2">
                {column
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </FormLabel>
              <FormControl>
                {inputType === "checkbox" ? (
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                    }}
                    className="justify-self-start"
                  />
                ) : inputType === "number" ? (
                  <Input
                    type="number"
                    {...field}
                    value={field.value !== undefined ? field.value : ""}
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number(e.target.value)
                        : null;
                      field.onChange(value);
                    }}
                    className={`
                    ${editingVessel ? "text-start" : " text-right"}
                    font-mono 
                  `}
                  />
                ) : (
                    <Input
                      type="text"
                    {...field}
                    value={field.value !== undefined ? String(field.value) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={`
                  `}
                  />
                )}

                {/* {typeof field.value === "boolean" ? (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                ) : (
                  <Input
                    {...field}
                    className=" "
                    value={field.value !== undefined ? String(field.value) : ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )} */}
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  return (
    <div className="w-full section-py-80 overflow-x-scroll px-[15px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold  ">Vessel Amenities</h2>
        <Button onClick={handleCreateNew} variant="outlineDarkblue">
          <Plus className="mr-2 h-4 w-4 " /> Create New Vessel
        </Button>
      </div>

      <FormProvider {...form}>
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" ">Actions</TableHead>
                {columns?.map((column) => (
                  <TableHead key={column} className={`whitespace-nowrap `}>
                    {column
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className=" ">
              {vessels?.map((vessel) => (
                <TableRow key={vessel.id}>
                  <TableCell className="border-r border-dotted border-gray-300 whitespace-nowrap">
                    {editingVessel === vessel.id ? (
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
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(vessel.id!)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </TableCell>

                  {columns?.map((column) => {
                    const cellContent =
                      editingVessel === vessel.id
                        ? renderFormField(column)
                        : typeof vessel[column] === "boolean"
                        ? vessel[column]
                          ? "✓"
                          : null
                        : vessel[column];

                    const alignmentClass =
                      typeof vessel[column] === "boolean"
                        ? "text-center"
                        : typeof vessel[column] === "number"
                        ? "text-right"
                        : "text-start";

                    return (
                      <TableCell
                        key={column}
                        className={`  ${alignmentClass} ${
                          typeof vessel[column] === "boolean"
                            ? "font-bold text-green-600  "
                            : ""
                        }`}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}

                  {/* {columns.map((column) => (
                    <TableCell key={column} className="text-center">
                      {editingVessel === vessel.id
                        ? renderFormField(column)
                        : typeof vessel[column] === "boolean"
                        ? vessel[column]
                          ? "✓"
                          : null
                        : vessel[column]}
                    </TableCell>
                  ))} */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* <div className="md:hidden space-y-6 ">
          {vessels.map((vessel) => (
            <Card
              key={vessel.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  {vessel.vessel}
                  <div className="flex space-x-2">
                    {editingVessel === vessel.id ? (
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
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(vessel.id!)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 px-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {columns.map((column) => (
                      <div
                        key={column}
                        className="py-1 border-b border-gray-100 last:border-b-0"
                      >
                        {editingVessel === vessel.id ? (
                          renderFormField(column)
                        ) : (
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">
                              {column
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                              :
                            </span>
                            <span className="text-right">
                              {typeof vessel[column] === "boolean"
                                ? vessel[column]
                                  ? "✓"
                                  : "✗"
                                : vessel[column]}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </form>
                </Form>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="md:hidden space-y-6">
          {vessels?.map((vessel) => (
            <Card
              key={vessel.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  {vessel.vessel}
                  <div className="flex space-x-2">
                    {editingVessel === vessel.id ? (
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
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(vessel.id!)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-1 text-sm">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 pr-2"
                  >
                    {columns.map((column) => (
                      <div
                        key={column}
                        className="py-1 border-b border-gray-100 last:border-b-0  items-center "
                      >
                        {editingVessel === vessel.id ? (
                          renderFormField(column, editingVessel)
                        ) : (
                          <div className=" grid grid-cols-2 gap-2   pr-2">
                            <span className="font-medium text-right pr-2">
                              {column
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                              :
                            </span>
                            <span className=" ">
                              {typeof vessel[column] === "boolean"
                                ? vessel[column]
                                  ? "✓"
                                  : " "
                                : vessel[column]}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </form>
                </Form>
              </CardContent>
            </Card>
          ))}
        </div>
      </FormProvider>

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

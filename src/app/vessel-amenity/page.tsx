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
        setVessels((prevVessels) => [
          newVessel,
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
    <div className="pt-40">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Vessel Amenities</h2>
        <Button onClick={handleCreateNew}>
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
            {vessels?.map((vessel) => (
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
                      <Button variant="ghost" size="sm" onClick={handleCancel}>
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
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  {typeof field.value === "boolean" ? (
                                    <Checkbox
                                      checked={field.value as boolean}
                                      onCheckedChange={field.onChange}
                                    />
                                  ) : (
                                    <Input
                                      {...field}
                                      value={field.value as string}
                                      onChange={(e) =>
                                        field.onChange(e.target.value)
                                      } // Handle string input
                                    />
                                  )}
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
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
            ))}
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

// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { supabase } from "@/lib/supabase";
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
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Pencil, Trash2, Check, X, Plus } from "lucide-react";
// import { toast } from "sonner";
// const desiredOrder = [
//   "Amore E. Sole",
//   "Arearea",
//   "Bliss",
//   "Evening Star",
//   "Liberty",
//   "Renaissance",
//   "Sand Dollar",
//   "Sea Renity",
//   "Sound Current",
//   "Tara",
//   "Teewinot",
//   "Rode Trip",
//   "Amp Phiban",
//   "Beacon Bay",
//   "Kristabelle",
//   "Shamrock",
//   "Splash",
//   "Southern Spark",
// ];
// // Define the Vessel type
// type Vessel = {
//   id?: string;
//   vessel: string;
//   mfg: string;
//   size: string;
//   autopilot: boolean;
//   bimini: boolean;
//   refrigerator: boolean;
//   heater: boolean;
//   microwave_stove: boolean;
//   cabins: string;
//   cockpit_table: boolean;
//   shower_system: boolean;
//   depth_fish: boolean;
//   dodger: boolean;
//   gps: boolean;
//   head_shower: boolean;
//   ice_box: boolean;
//   microwave: boolean;
//   marine_radio: boolean;
//   stereo: boolean;
//   swim_platform: boolean;
//   stove: boolean;
//   sails: boolean;
//   bbq: boolean;
//   fuel_tank_size: string;
//   water_tank_size: string;
//   max_persons: string;
// };

// // Define the schema for form validation
// const vesselSchema = z.object({
//   vessel: z.string().min(1, "Vessel name is required"),
//   mfg: z.string().min(1, "Manufacturer is required"),
//   size: z.string().min(1, "Size is required"),
//   autopilot: z.boolean(),
//   bimini: z.boolean(),
//   refrigerator: z.boolean(),
//   heater: z.boolean(),
//   microwave_stove: z.boolean(),
//   cabins: z.string().min(1, "Number of cabins is required"),
//   cockpit_table: z.boolean(),
//   shower_system: z.boolean(),
//   depth_fish: z.boolean(),
//   dodger: z.boolean(),
//   gps: z.boolean(),
//   head_shower: z.boolean(),
//   ice_box: z.boolean(),
//   microwave: z.boolean(),
//   marine_radio: z.boolean(),
//   stereo: z.boolean(),
//   swim_platform: z.boolean(),
//   stove: z.boolean(),
//   sails: z.boolean(),
//   bbq: z.boolean(),
//   fuel_tank_size: z.string().min(1, "Fuel tank size is required"),
//   water_tank_size: z.string().min(1, "Water tank size is required"),
//   max_persons: z.string().min(1, "Maximum number of persons is required"),
// });

// const columns: (keyof Vessel)[] = [
//   "vessel",
//   "mfg",
//   "size",
//   "autopilot",
//   "bimini",
//   "refrigerator",
//   "heater",
//   "microwave_stove",
//   "cabins",
//   "cockpit_table",
//   "shower_system",
//   "depth_fish",
//   "dodger",
//   "gps",
//   "head_shower",
//   "ice_box",
//   "microwave",
//   "marine_radio",
//   "stereo",
//   "swim_platform",
//   "stove",
//   "sails",
//   "bbq",
//   "fuel_tank_size",
//   "water_tank_size",
//   "max_persons",
// ];

// export default function Component() {
//   const [vessels, setVessels] = useState<Vessel[]>([]);
//   const [editingVessel, setEditingVessel] = useState<string | null>(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [vesselToDelete, setVesselToDelete] = useState<string | null>(null);

//   const form = useForm<Vessel>({
//     resolver: zodResolver(vesselSchema),
//     defaultValues: {
//       vessel: "",
//       mfg: "",
//       size: "",
//       autopilot: false,
//       bimini: false,
//       refrigerator: false,
//       heater: false,
//       microwave_stove: false,
//       cabins: "",
//       cockpit_table: false,
//       shower_system: false,
//       depth_fish: false,
//       dodger: false,
//       gps: false,
//       head_shower: false,
//       ice_box: false,
//       microwave: false,
//       marine_radio: false,
//       stereo: false,
//       swim_platform: false,
//       stove: false,
//       sails: false,
//       bbq: false,
//       fuel_tank_size: "",
//       water_tank_size: "",
//       max_persons: "",
//     },
//   });

//   useEffect(() => {
//     fetchVessels();
//   }, []);

//   async function fetchVessels() {
//     const { data, error } = await supabase.from("vessels").select("*");
//     if (error) {
//       console.error("Error fetching vessels:", error);
//       toast.error("Failed to fetch vessels");
//     } else {
//       // Custom Sort Function
//       const sortedVessels = data?.sort((a, b) => {
//         return desiredOrder.indexOf(a.vessel) - desiredOrder.indexOf(b.vessel);
//       });

//       setVessels(sortedVessels as any);
//     }
//   }

//   const handleEdit = (vessel: Vessel) => {
//     setEditingVessel(vessel.id!);
//     form.reset(vessel);
//   };

//   const onSubmit = async (data: Vessel) => {
//     if (editingVessel === "new") {
//       // Creating a new vessel
//       const { data: newVessel, error } = await supabase
//         .from("vessels")
//         .insert(data)
//         .select()
//         .single();
//       if (error) {
//         console.error("Error creating vessel:", error);
//         toast.error("Failed to create vessel");
//       } else {
//         toast.success("Vessel created successfully");
//         setVessels([...vessels, newVessel]);
//         setEditingVessel(null);
//       }
//     } else if (editingVessel) {
//       // Updating an existing vessel
//       const { error } = await supabase
//         .from("vessels")
//         .update(data)
//         .eq("id", editingVessel);
//       if (error) {
//         console.error("Error updating vessel:", error);
//         toast.error("Failed to update vessel");
//       } else {
//         toast.success("Vessel updated successfully");
//         setVessels(
//           vessels.map((v) => (v.id === editingVessel ? { ...v, ...data } : v))
//         );
//         setEditingVessel(null);
//       }
//     }
//     form.reset();
//   };

//   const handleCancel = () => {
//     if (editingVessel === "new") {
//       setVessels((prevVessels) =>
//         prevVessels.filter((v) => v.id !== undefined)
//       );
//     }
//     setEditingVessel(null);
//     form.reset();
//   };

//   const handleDelete = (id: string) => {
//     setVesselToDelete(id);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (vesselToDelete) {
//       const { error } = await supabase
//         .from("vessels")
//         .delete()
//         .eq("id", vesselToDelete);
//       if (error) {
//         console.error("Error deleting vessel:", error);
//         toast.error("Failed to delete vessel");
//       } else {
//         toast.success("Vessel deleted successfully");
//         setVessels(vessels.filter((v) => v.id !== vesselToDelete));
//       }
//     }
//     setDeleteDialogOpen(false);
//     setVesselToDelete(null);
//   };

//   const handleCreateNew = () => {
//     setVessels([{ ...form.getValues(), id: "new" }, ...vessels]);
//     setEditingVessel("new");
//     form.reset();
//   };

//   return (
//     <div className="pt-40">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Vessel Amenities</h2>
//         <Button onClick={handleCreateNew}>
//           <Plus className="mr-2 h-4 w-4" /> Create New Vessel
//         </Button>
//       </div>
//       <div className="max-h-[800px] overflow-y-auto relative">
//         <Table className="border-collapse border-dashed border-red-500 text-xs">
//           <TableHeader className="sticky top-0 bg-white z-10">
//             <TableRow>
//               <TableHead className="text-right">Actions</TableHead>
//               {columns.map((column) => (
//                 <TableHead
//                   key={column}
//                   className="text-center whitespace-nowrap px-2 border-r border-dotted border-gray-300"
//                 >
//                   {column.charAt(0).toUpperCase() +
//                     column
//                       .replace(/([A-Z])/g, " $1")
//                       .trim()
//                       .replace(/_/g, " ")}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {vessels.map((vessel) => (
//               <TableRow
//                 key={vessel.id}
//                 className="border-b odd:bg-gray-100 even:bg-white"
//               >
//                 <TableCell className="text-right whitespace-nowrap gap-2">
//                   {editingVessel === vessel.id ||
//                   (editingVessel === "new" && vessel.id === undefined) ? (
//                     <>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={form.handleSubmit(onSubmit)}
//                       >
//                         <Check className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="sm" onClick={handleCancel}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleEdit(vessel)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDelete(vessel.id!)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </>
//                   )}
//                 </TableCell>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column}
//                     className="text-center px-2 border-r border-dotted border-gray-300 whitespace-nowrap"
//                   >
//                     {editingVessel === vessel.id ||
//                     (editingVessel === "new" && vessel.id === undefined) ? (
//                       <Form {...form}>
//                         <form
//                           onSubmit={form.handleSubmit(onSubmit)}
//                           className="space-y-8"
//                         >
//                           <FormField
//                             control={form.control}
//                             name={column}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormControl>
//                                   {typeof vessel[column] === "boolean" ? (
//                                     <Checkbox
//                                       checked={field.value}
//                                       onCheckedChange={field.onChange}
//                                     />
//                                   ) : (
//                                     <Input {...field} className="w-full" />
//                                   )}
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </form>
//                       </Form>
//                     ) : typeof vessel[column] === "boolean" ? (
//                       vessel[column] ? (
//                         "✓"
//                       ) : null
//                     ) : (
//                       vessel[column]
//                     )}
//                   </TableCell>
//                 ))}
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
//               Are you sure you want to delete this vessel? This action cannot be
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
//             <Button variant="destructive" onClick={confirmDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { supabase } from "@/lib/supabase";
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
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Pencil, Trash2, Check, X } from "lucide-react";
// import { toast } from "sonner";

// // Define the Vessel type
// type Vessel = {
//   id: string;
//   vessel: string;
//   mfg: string;
//   size: string;
//   autopilot: boolean;
//   bimini: boolean;
//   refrigerator: boolean;
//   heater: boolean;
//   microwave_stove: boolean;
//   cabins: string;
//   cockpit_table: boolean;
//   shower_system: boolean;
//   depth_fish: boolean;
//   dodger: boolean;
//   gps: boolean;
//   head_shower: boolean;
//   ice_box: boolean;
//   microwave: boolean;
//   marine_radio: boolean;
//   stereo: boolean;
//   swim_platform: boolean;
//   stove: boolean;
//   sails: boolean;
//   bbq: boolean;
//   fuel_tank_size: string;
//   water_tank_size: string;
//   max_persons: string;
// };

// // Define the schema for form validation
// const vesselSchema = z.object({
//   vessel: z.string().min(1, "Vessel name is required"),
//   mfg: z.string().min(1, "Manufacturer is required"),
//   size: z.string().min(1, "Size is required"),
//   autopilot: z.boolean(),
//   bimini: z.boolean(),
//   refrigerator: z.boolean(),
//   heater: z.boolean(),
//   microwave_stove: z.boolean(),
//   cabins: z.string(),
//   cockpit_table: z.boolean(),
//   shower_system: z.boolean(),
//   depth_fish: z.boolean(),
//   dodger: z.boolean(),
//   gps: z.boolean(),
//   head_shower: z.boolean(),
//   ice_box: z.boolean(),
//   microwave: z.boolean(),
//   marine_radio: z.boolean(),
//   stereo: z.boolean(),
//   swim_platform: z.boolean(),
//   stove: z.boolean(),
//   sails: z.boolean(),
//   bbq: z.boolean(),
//   fuel_tank_size: z.string(),
//   water_tank_size: z.string(),
//   max_persons: z.string(),
// });

// const columns: (keyof Vessel)[] = [
//   "vessel",
//   "mfg",
//   "size",
//   "autopilot",
//   "bimini",
//   "refrigerator",
//   "heater",
//   "microwave_stove",
//   "cabins",
//   "cockpit_table",
//   "shower_system",
//   "depth_fish",
//   "dodger",
//   "gps",
//   "head_shower",
//   "ice_box",
//   "microwave",
//   "marine_radio",
//   "stereo",
//   "swim_platform",
//   "stove",
//   "sails",
//   "bbq",
//   "fuel_tank_size",
//   "water_tank_size",
//   "max_persons",
// ];

// export default function WSCVesselAmenitiesTable() {
//   const [vessels, setVessels] = useState<Vessel[]>([]);
//   const [editingVessel, setEditingVessel] = useState<string | null>(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [vesselToDelete, setVesselToDelete] = useState<string | null>(null);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<Vessel>({
//     resolver: zodResolver(vesselSchema),
//   });

//   useEffect(() => {
//     fetchVessels();
//   }, []);

//   async function fetchVessels() {
//     const { data, error } = await supabase.from("vessels").select("*");
//     if (error) {
//       console.error("Error fetching vessels:", error);
//     } else {
//       setVessels(data);
//     }
//   }

//   const handleEdit = (vessel: Vessel) => {
//     setEditingVessel(vessel.id);
//     reset(vessel);
//   };

//   const onSubmit = async (data: Vessel) => {
//     if (editingVessel) {
//       const { error } = await supabase
//         .from("vessels")
//         .update(data)
//         .eq("id", editingVessel);
//       if (error) {
//         console.error("Error updating vessel:", error);
//         toast.error("Failed to update vessel");
//       } else {
//         toast.success("Vessel updated successfully");
//         setEditingVessel(null);
//         fetchVessels();
//       }
//     }
//   };

//   const handleCancel = () => {
//     setEditingVessel(null);
//     reset();
//   };

//   const handleDelete = (id: string) => {
//     setVesselToDelete(id);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (vesselToDelete) {
//       const { error } = await supabase
//         .from("vessels")
//         .delete()
//         .eq("id", vesselToDelete);
//       if (error) {
//         console.error("Error deleting vessel:", error);
//         toast.error("Failed to delete vessel");
//       } else {
//         toast.success("Vessel deleted successfully");
//         fetchVessels();
//       }
//     }
//     setDeleteDialogOpen(false);
//     setVesselToDelete(null);
//   };

//   return (
//     <div className="pt-40">
//       <div className="max-h-[800px] overflow-y-auto relative">
//         <h1 className="text-3xl font-bold mb-6 pl-4">Vessel Management</h1>
//         <Table className="border-collapse border-dashed border-red-500 text-xs">
//           <TableHeader className="sticky top-0 bg-white z-10">
//             <TableRow>
//               <TableHead className="text-right">Actions</TableHead>
//               {columns.map((column) => (
//                 <TableHead
//                   key={column}
//                   className="text-center whitespace-nowrap px-2 border-r border-dotted border-gray-300"
//                 >
//                   {column.charAt(0).toUpperCase() +
//                     column
//                       .replace(/([A-Z])/g, " $1")
//                       .trim()
//                       .replace(/_/g, " ")}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {vessels.map((vessel) => (
//               <TableRow
//                 key={vessel.id}
//                 className="border-b odd:bg-gray-100 even:bg-white"
//               >
//                 <TableCell className="text-right whitespace-nowrap gap-2">
//                   {editingVessel === vessel.id ? (
//                     <>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={handleSubmit(onSubmit)}
//                       >
//                         <Check className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="sm" onClick={handleCancel}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleEdit(vessel)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDelete(vessel.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </>
//                   )}
//                 </TableCell>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column}
//                     className="text-center px-2 border-r border-dotted border-gray-300 whitespace-nowrap"
//                   >
//                     {editingVessel === vessel.id ? (
//                       <Controller
//                         name={column}
//                         control={control}
//                         render={({ field }) =>
//                           typeof vessel[column] === "boolean" ? (
//                             <Checkbox
//                               checked={field.value}
//                               onCheckedChange={field.onChange}
//                             />
//                           ) : (
//                             <Input {...field} className="w-full" />
//                           )
//                         }
//                       />
//                     ) : typeof vessel[column] === "boolean" ? (
//                       vessel[column] ? (
//                         "✓"
//                       ) : null
//                     ) : (
//                       vessel[column]
//                     )}
//                   </TableCell>
//                 ))}
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
//               Are you sure you want to delete this vessel? This action cannot be
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
//             <Button variant="destructive" onClick={confirmDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// import * as React from "react";
// import { Pencil, Trash2, Check, X } from "lucide-react";
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
// import { Checkbox } from "@/components/ui/checkbox";
// import Image from "next/image";
// import HeroFallback from "@/components/common/hero-slider-check";

// type Vessel = {
//   id: string;
//   vessel: string;
//   mfg: string;
//   size: string;
//   autopilot: boolean;
//   bimini: boolean;
//   refrigerator: boolean;
//   heater: boolean;
//   microwaveStove: boolean;
//   cabins: string;
//   cockpitTable: boolean;
//   showerSystem: boolean;
//   depthFish: boolean;
//   dodger: boolean;
//   gps: boolean;
//   headShower: boolean;
//   iceBox: boolean;
//   microwave: boolean;
//   marineRadio: boolean;
//   stereo: boolean;
//   swimPlatform: boolean;
//   stove: boolean;
//   sails: boolean;
//   bbq: boolean;
//   fuelTankSize: string;
//   waterTankSize: string;
//   maxPersons: string;
// };

// const initialVessels: Vessel[] = [
//   {
//     id: "1",
//     vessel: "Amore E. Sole",
//     mfg: "Hunter",
//     size: "42",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "40",
//     waterTankSize: "90",
//     maxPersons: "6",
//   },
//   {
//     id: "2",
//     vessel: "Ararearea",
//     mfg: "Catalina",
//     size: "42",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "40",
//     waterTankSize: "90",
//     maxPersons: "6",
//   },
//   {
//     id: "3",
//     vessel: "Bliss",
//     mfg: "Hunter",
//     size: "40",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "40",
//     waterTankSize: "90",
//     maxPersons: "6",
//   },
//   {
//     id: "4",
//     vessel: "Evening Star",
//     mfg: "Newport",
//     size: "28",
//     autopilot: false,
//     bimini: false,
//     refrigerator: false,
//     heater: false,
//     microwaveStove: false,
//     cabins: "2",
//     cockpitTable: false,
//     showerSystem: false,
//     depthFish: false,
//     dodger: false,
//     gps: false,
//     headShower: false,
//     iceBox: false,
//     microwave: false,
//     marineRadio: false,
//     stereo: false,
//     swimPlatform: false,
//     stove: false,
//     sails: false,
//     bbq: false,
//     fuelTankSize: "20",
//     waterTankSize: "40",
//     maxPersons: "4",
//   },
//   {
//     id: "5",
//     vessel: "Liberty",
//     mfg: "Beneteau",
//     size: "43",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "50",
//     waterTankSize: "100",
//     maxPersons: "8",
//   },
//   {
//     id: "6",
//     vessel: "Renaissance",
//     mfg: "Dufour",
//     size: "33",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "30",
//     waterTankSize: "80",
//     maxPersons: "6",
//   },
//   {
//     id: "7",
//     vessel: "Sand Dollar",
//     mfg: "Catalina",
//     size: "30",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "25",
//     waterTankSize: "60",
//     maxPersons: "5",
//   },
//   {
//     id: "8",
//     vessel: "Sea Renity",
//     mfg: "Beneteau",
//     size: "40",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "40",
//     waterTankSize: "90",
//     maxPersons: "6",
//   },
//   {
//     id: "9",
//     vessel: "Sound Current",
//     mfg: "Catalina",
//     size: "42",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "40",
//     waterTankSize: "90",
//     maxPersons: "6",
//   },
//   {
//     id: "10",
//     vessel: "Tara",
//     mfg: "Catalina",
//     size: "36",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "30",
//     waterTankSize: "70",
//     maxPersons: "5",
//   },
//   {
//     id: "11",
//     vessel: "Teewinot",
//     mfg: "Hunter",
//     size: "30",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "2",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "25",
//     waterTankSize: "60",
//     maxPersons: "4",
//   },
//   {
//     id: "12",
//     vessel: "Rode Trip",
//     mfg: "Mainship",
//     size: "34",
//     autopilot: true,
//     bimini: true,
//     refrigerator: true,
//     heater: false,
//     microwaveStove: true,
//     cabins: "1",
//     cockpitTable: true,
//     showerSystem: true,
//     depthFish: true,
//     dodger: true,
//     gps: true,
//     headShower: true,
//     iceBox: true,
//     microwave: true,
//     marineRadio: true,
//     stereo: true,
//     swimPlatform: true,
//     stove: true,
//     sails: true,
//     bbq: false,
//     fuelTankSize: "30",
//     waterTankSize: "70",
//     maxPersons: "4",
//   },
//   {
//     id: "13",
//     vessel: "Amp Phiban",
//     mfg: "Duffy",
//     size: "18",
//     autopilot: false,
//     bimini: false,
//     refrigerator: false,
//     heater: false,
//     microwaveStove: false,
//     cabins: "0",
//     cockpitTable: false,
//     showerSystem: false,
//     depthFish: false,
//     dodger: false,
//     gps: false,
//     headShower: false,
//     iceBox: false,
//     microwave: false,
//     marineRadio: false,
//     stereo: false,
//     swimPlatform: false,
//     stove: false,
//     sails: false,
//     bbq: false,
//     fuelTankSize: "10",
//     waterTankSize: "20",
//     maxPersons: "6",
//   },
//   {
//     id: "14",
//     vessel: "Beacon Bay",
//     mfg: "Duffy",
//     size: "20",
//     autopilot: false,
//     bimini: false,
//     refrigerator: false,
//     heater: false,
//     microwaveStove: false,
//     cabins: "0",
//     cockpitTable: false,
//     showerSystem: false,
//     depthFish: false,
//     dodger: false,
//     gps: false,
//     headShower: false,
//     iceBox: false,
//     microwave: false,
//     marineRadio: false,
//     stereo: false,
//     swimPlatform: false,
//     stove: false,
//     sails: false,
//     bbq: false,
//     fuelTankSize: "10",
//     waterTankSize: "20",
//     maxPersons: "6",
//   },
//   {
//     id: "15",
//     vessel: "Kristabelle",
//     mfg: "Duffy",
//     size: "18",
//     autopilot: false,
//     bimini: false,
//     refrigerator: false,
//     heater: false,
//     microwaveStove: false,
//     cabins: "0",
//     cockpitTable: false,
//     showerSystem: false,
//     depthFish: false,
//     dodger: false,
//     gps: false,
//     headShower: false,
//     iceBox: false,
//     microwave: false,
//     marineRadio: false,
//     stereo: false,
//     swimPlatform: false,
//     stove: false,
//     sails: false,
//     bbq: false,
//     fuelTankSize: "10",
//     waterTankSize: "20",
//     maxPersons: "6",
//   },
//   {
//     id: "16",
//     vessel: "Shamrock",
//     mfg: "Duffy",
//     size: "18",
//     autopilot: false,
//     bimini: false,
//     refrigerator: false,
//     heater: false,
//     microwaveStove: false,
//     cabins: "0",
//     cockpitTable: false,
//     showerSystem: false,
//     depthFish: false,
//     dodger: false,
//     gps: false,
//     headShower: false,
//     iceBox: false,
//     microwave: false,
//     marineRadio: false,
//     stereo: false,
//     swimPlatform: false,
//     stove: false,
//     sails: false,
//     bbq: false,
//     fuelTankSize: "10",
//     waterTankSize: "20",
//     maxPersons: "6",
//   },
//   {
//     id: "17",
//     vessel: "Splash",
//     mfg: "WD Schock",
//     size: "18",
//     autopilot: false,
//     bimini: false,
//     refrigerator: false,
//     heater: false,
//     microwaveStove: false,
//     cabins: "0",
//     cockpitTable: false,
//     showerSystem: false,
//     depthFish: false,
//     dodger: false,
//     gps: false,
//     headShower: false,
//     iceBox: false,
//     microwave: false,
//     marineRadio: false,
//     stereo: false,
//     swimPlatform: false,
//     stove: false,
//     sails: false,
//     bbq: false,
//     fuelTankSize: "10",
//     waterTankSize: "20",
//     maxPersons: "6",
//   },
//   {
//     id: "18",
//     vessel: "Southern Spark",
//     mfg: "Duffy",
//     size: "20",
//     autopilot: false,
//     bimini: false,
//     refrigerator: false,
//     heater: false,
//     microwaveStove: false,
//     cabins: "0",
//     cockpitTable: false,
//     showerSystem: false,
//     depthFish: false,
//     dodger: false,
//     gps: false,
//     headShower: false,
//     iceBox: false,
//     microwave: false,
//     marineRadio: false,
//     stereo: false,
//     swimPlatform: false,
//     stove: false,
//     sails: false,
//     bbq: false,
//     fuelTankSize: "10",
//     waterTankSize: "20",
//     maxPersons: "6",
//   },
// ];

// const columns: (keyof Vessel)[] = [
//   "vessel",
//   "mfg",
//   "size",
//   "autopilot",
//   "bimini",
//   "refrigerator",
//   "heater",
//   "microwaveStove",
//   "cabins",
//   "cockpitTable",
//   "showerSystem",
//   "depthFish",
//   "dodger",
//   "gps",
//   "headShower",
//   "iceBox",
//   "microwave",
//   "marineRadio",
//   "stereo",
//   "swimPlatform",
//   "stove",
//   "sails",
//   "bbq",
//   "fuelTankSize",
//   "waterTankSize",
//   "maxPersons",
// ];

// export default function WSCVesselAmenitiesTable() {
//   const [vessels, setVessels] = React.useState<Vessel[]>(initialVessels);
//   const [editingVessel, setEditingVessel] = React.useState<string | null>(null);
//   const [editedVessel, setEditedVessel] = React.useState<Vessel | null>(null);

//   const handleEdit = (vessel: Vessel) => {
//     setEditingVessel(vessel.id);
//     setEditedVessel({ ...vessel });
//   };

//   const handleSave = () => {
//     if (editedVessel) {
//       setVessels(
//         vessels.map((v) => (v.id === editedVessel.id ? editedVessel : v))
//       );
//       setEditingVessel(null);
//       setEditedVessel(null);
//     }
//   };

//   const handleCancel = () => {
//     setEditingVessel(null);
//     setEditedVessel(null);
//   };

//   const handleDelete = (id: string) => {
//     setVessels(vessels.filter((v) => v.id !== id));
//   };

//   const handleChange = (key: keyof Vessel, value: string | boolean) => {
//     if (editedVessel) {
//       setEditedVessel({ ...editedVessel, [key]: value });
//     }
//   };

//   return (
//     <div className=" pt-10 ">
//       <HeroFallback />
//       <div className="  max-h-[800px] overflow-y-auto relative">
//         <Table className="border-collapse border-dashed border-red-500 text-xs">
//           <TableHeader className="sticky top-0 bg-white z-10">
//             <TableRow>
//               <TableHead className="text-right">Actions</TableHead>
//               {columns.map((column) => (
//                 <TableHead
//                   key={column}
//                   className="text-center whitespace-nowrap px-2 border-r border-dotted border-gray-300"
//                 >
//                   {column.charAt(0).toUpperCase() +
//                     column
//                       .slice(1)
//                       .replace(/([A-Z])/g, " $1")
//                       .trim()}
//                 </TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {vessels.map((vessel) => (
//               <TableRow
//                 key={vessel.id}
//                 className="border-b  odd:bg-gray-100 even:bg-white"
//               >
//                 <TableCell className="text-right whitespace-nowrap gap-2">
//                   {editingVessel === vessel.id ? (
//                     <>
//                       <Button variant="ghost" size="sm" onClick={handleSave}>
//                         <Check className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="sm" onClick={handleCancel}>
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleEdit(vessel)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDelete(vessel.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </>
//                   )}
//                 </TableCell>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column}
//                     className="text-center px-2 border-r border-dotted border-gray-300 whitespace-nowrap"
//                   >
//                     {editingVessel === vessel.id ? (
//                       typeof vessel[column] === "boolean" ? (
//                         <Checkbox
//                           checked={editedVessel?.[column] as boolean}
//                           onCheckedChange={(checked) =>
//                             handleChange(column, checked as boolean)
//                           }
//                         />
//                       ) : (
//                         <Input
//                           value={editedVessel?.[column] as string}
//                           onChange={(e) => handleChange(column, e.target.value)}
//                           className="w-full"
//                         />
//                       )
//                     ) : typeof vessel[column] === "boolean" ? (
//                       vessel[column] ? (
//                         <>
//                           {/* <Image
//                             src="/images/boat-navigation.png"
//                             alt="Active"
//                             width={26}
//                             height={26}
//                             className="inline-block"
//                           /> */}
//                           ✓
//                         </>
//                       ) : null
//                     ) : (
//                       vessel[column]
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

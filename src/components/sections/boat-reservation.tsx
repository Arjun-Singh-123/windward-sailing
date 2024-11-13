"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  boatName: z.string().min(1, "Boat name is required"),
  boatLength: z.string().min(1, "Boat length is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
  returnTime: z.string().min(1, "Return time is required"),
  eveningBoarding: z.string(),
  extraCleaning: z.boolean(),
  vipServices: z.array(z.string()),
  memberName: z.string().min(1, "Member name is required"),
  memberCell: z.string().min(10, "Valid phone number is required"),
  memberEmail: z.string().email("Invalid email address"),
});

export default function BoatReservation() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boatName: "",
      boatLength: "",
      pickupDate: "",
      pickupTime: "09:00",
      returnTime: "17:00",
      eveningBoarding: "No, I will pickup at the time above",
      extraCleaning: false,
      vipServices: [],
      memberName: "",
      memberCell: "",
      memberEmail: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    alert("Reservation request sent! Check your email for confirmation.");
  };

  const vipServices = [
    "Decorate Birthday",
    "Hawaiian Party",
    "Other Decorate color",
    "Load Ice",
    "Boat loading service (Car to boat & boat to car)",
    "Stock Groceries or drinks (non-alcoholic)",
    "Cater meals / Hors d'oeuvres",
    "Valet Service",
  ];

  return (
    <div className="    ">
      <Card className="  p-6">
        <CardHeader className="space-y-2 border-b">
          <CardTitle className="text-2xl font-bold">
            Request a Reservation
          </CardTitle>
          <p className="text-gray-600">
            Accepting requests for {new Date().getMonth()}/2024
          </p>
          <p className="text-sm text-gray-500">
            You will be emailed confirmations
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Boat Name*</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Boat Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boat1">Boat 1</SelectItem>
                    <SelectItem value="boat2">Boat 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Boat Length*</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Boat Length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20 ft</SelectItem>
                    <SelectItem value="30">30 ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Pickup & Return Date*
              </Label>
              <Input type="date" className="w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Pickup Time*</Label>
                <Input type="time" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Return Time*</Label>
                <Input type="time" className="w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Request Evening Board
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select evening boarding option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">
                    No, I will pickup at the time above
                  </SelectItem>
                  <SelectItem value="yes">
                    Yes, I would like 6:00 PM the night before
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="extraCleaning" />
                <Label htmlFor="extraCleaning" className="text-sm">
                  Extra cleaning fee
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">VIP Services</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {vipServices.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox id={service} />
                      <Label htmlFor={service} className="text-sm">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Member's Name*</Label>
                <Input type="text" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Member's Cell*</Label>
                <Input type="tel" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Member's Email*</Label>
                <Input type="email" className="w-full" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              Send Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

    // <div className="min-h-screen flex items-center justify-center   from-[#001135] to-[#133f83e6] bg-[url('/images/form-bg.webp?height=1080&width=1920')] bg-center bg-cover bg-no-repeat">
    // <div className="min-h-screen flex items-center justify-center">
    //   <Card className="w-full max-w-3xl mx-auto">
    //     <CardHeader className="  text-white">
    //       <CardTitle className="text-2xl font-bold">
    //         Request a Reservation
    //       </CardTitle>
    //       <p className="text-lg">
    //         Accepting requests for {new Date().getMonth() + 3}/2024
    //       </p>
    //       <p className="text-sm">You will be emailed confirmations</p>
    //     </CardHeader>
    //     <CardContent className="bg-blue-800 text-white">
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //         <div className="grid grid-cols-2 gap-4">
    //           <div>
    //             <Label htmlFor="boatName">Boat Name*</Label>
    //             <Select
    //               onValueChange={(value) => form.setValue("boatName", value)}
    //             >
    //               <SelectTrigger>
    //                 <SelectValue placeholder="Select Boat Name" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectItem value="boat1">Boat 1</SelectItem>
    //                 <SelectItem value="boat2">Boat 2</SelectItem>
    //               </SelectContent>
    //             </Select>
    //             {form.formState.errors.boatName && (
    //               <p className="text-red-500">
    //                 {form.formState.errors.boatName.message}
    //               </p>
    //             )}
    //           </div>
    //           <div>
    //             <Label htmlFor="boatLength">Boat Length*</Label>
    //             <Select
    //               onValueChange={(value) => form.setValue("boatLength", value)}
    //             >
    //               <SelectTrigger>
    //                 <SelectValue placeholder="Select Boat Length" />
    //               </SelectTrigger>
    //               <SelectContent>
    //                 <SelectItem value="20">20 ft</SelectItem>
    //                 <SelectItem value="30">30 ft</SelectItem>
    //               </SelectContent>
    //             </Select>
    //             {form.formState.errors.boatLength && (
    //               <p className="text-red-500">
    //                 {form.formState.errors.boatLength.message}
    //               </p>
    //             )}
    //           </div>
    //         </div>

    //         <div>
    //           <Label htmlFor="pickupDate">Pickup & Return Date*</Label>
    //           <Input
    //             type="date"
    //             id="pickupDate"
    //             {...form.register("pickupDate")}
    //           />
    //           {form.formState.errors.pickupDate && (
    //             <p className="text-red-500">
    //               {form.formState.errors.pickupDate.message}
    //             </p>
    //           )}
    //         </div>

    //         <div className="grid grid-cols-2 gap-4">
    //           <div>
    //             <Label htmlFor="pickupTime">Pickup Time*</Label>
    //             <Input
    //               type="time"
    //               id="pickupTime"
    //               {...form.register("pickupTime")}
    //             />
    //             {form.formState.errors.pickupTime && (
    //               <p className="text-red-500">
    //                 {form.formState.errors.pickupTime.message}
    //               </p>
    //             )}
    //           </div>
    //           <div>
    //             <Label htmlFor="returnTime">Return Time*</Label>
    //             <Input
    //               type="time"
    //               id="returnTime"
    //               {...form.register("returnTime")}
    //             />
    //             {form.formState.errors.returnTime && (
    //               <p className="text-red-500">
    //                 {form.formState.errors.returnTime.message}
    //               </p>
    //             )}
    //           </div>
    //         </div>

    //         <div>
    //           <Label htmlFor="eveningBoarding">Request Evening Board</Label>
    //           <Select
    //             onValueChange={(value) =>
    //               form.setValue("eveningBoarding", value)
    //             }
    //           >
    //             <SelectTrigger>
    //               <SelectValue placeholder="Select evening boarding option" />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="No, I will pickup at the time above">
    //                 No, I will pickup at the time above
    //               </SelectItem>
    //               <SelectItem value="Yes, I would like 6:00 PM the night before">
    //                 Yes, I would like 6:00 PM the night before
    //               </SelectItem>
    //             </SelectContent>
    //           </Select>
    //         </div>

    //         <div className="space-y-2">
    //           <div className="flex items-center space-x-2">
    //             <Checkbox
    //               id="extraCleaning"
    //               onCheckedChange={(checked) =>
    //                 form.setValue("extraCleaning", checked as boolean)
    //               }
    //             />
    //             <Label htmlFor="extraCleaning">Extra cleaning fee</Label>
    //           </div>
    //         </div>

    //         <div>
    //           <Label>VIP Services</Label>
    //           <div className="grid grid-cols-2 gap-2">
    //             {vipServices.map((service) => (
    //               <div key={service} className="flex items-center space-x-2">
    //                 <Checkbox
    //                   id={service}
    //                   onCheckedChange={(checked) => {
    //                     const currentServices = form.getValues("vipServices");
    //                     if (checked) {
    //                       form.setValue("vipServices", [
    //                         ...currentServices,
    //                         service,
    //                       ]);
    //                     } else {
    //                       form.setValue(
    //                         "vipServices",
    //                         currentServices.filter((s: any) => s !== service)
    //                       );
    //                     }
    //                   }}
    //                 />
    //                 <Label htmlFor={service}>{service}</Label>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         <div className="space-y-2">
    //           <Label htmlFor="memberName">Member's Name*</Label>
    //           <Input
    //             type="text"
    //             id="memberName"
    //             {...form.register("memberName")}
    //           />
    //           {form.formState.errors.memberName && (
    //             <p className="text-red-500">
    //               {form.formState.errors.memberName.message}
    //             </p>
    //           )}
    //         </div>

    //         <div className="space-y-2">
    //           <Label htmlFor="memberCell">Member's Cell*</Label>
    //           <Input
    //             type="tel"
    //             id="memberCell"
    //             {...form.register("memberCell")}
    //           />
    //           {form.formState.errors.memberCell && (
    //             <p className="text-red-500">
    //               {form.formState.errors.memberCell.message}
    //             </p>
    //           )}
    //         </div>

    //         <div className="space-y-2">
    //           <Label htmlFor="memberEmail">Member's Email*</Label>
    //           <Input
    //             type="email"
    //             id="memberEmail"
    //             {...form.register("memberEmail")}
    //           />
    //           {form.formState.errors.memberEmail && (
    //             <p className="text-red-500">
    //               {form.formState.errors.memberEmail.message}
    //             </p>
    //           )}
    //         </div>

    //         <Button
    //           type="submit"
    //           className="w-full bg-blue-500 hover:bg-blue-600"
    //         >
    //           Send Request
    //         </Button>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}

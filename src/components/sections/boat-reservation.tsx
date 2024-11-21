"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  boatName: z.string().min(1, { message: "Boat name is required" }),
  boatLength: z.string().min(1, { message: "Boat length is required" }),
  pickupDate: z.string().min(1, { message: "Pickup date is required" }),
  pickupTime: z.string().min(1, { message: "Pickup time is required" }),
  returnTime: z.string().min(1, { message: "Return time is required" }),
  eveningBoarding: z.string(),
  extraCleaning: z.boolean(),
  vipServices: z.array(z.string()),
  memberName: z.string().min(1, { message: "Member name is required" }),
  memberCell: z.string().min(1, { message: "Member cell is required" }),
  memberEmail: z.string().email({ message: "Invalid email address" }),
});

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

export default function BoatReservationForm() {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Reservation request sent! Check your email for confirmation.");
  }

  const renderLabel = (label: string) => (
    <FormLabel className="flex items-center">
      {label}
      <span className="text-red-500 ml-1">*</span>
    </FormLabel>
  );

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] px-6 py-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Boat Reservation Form</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="boatName"
              render={({ field }) => (
                <FormItem>
                  {renderLabel("Boat Name")}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="pl-3">
                        <SelectValue placeholder="Select Boat Name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="boat1">Boat 1</SelectItem>
                      <SelectItem value="boat2">Boat 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="boatLength"
              render={({ field }) => (
                <FormItem>
                  {renderLabel("Boat Length")}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="pl-3">
                        <SelectValue placeholder="Select Boat Length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="20">20 ft</SelectItem>
                      <SelectItem value="30">30 ft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem>
                  {renderLabel("Pickup & Return Date")}
                  <FormControl>
                    <Input type="date" className="pl-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pickupTime"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel("Pickup Time")}
                    <FormControl>
                      <Input type="time" className="pl-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnTime"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel("Return Time")}
                    <FormControl>
                      <Input type="time" className="pl-3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eveningBoarding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Evening Board</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="pl-3">
                        <SelectValue placeholder="Select evening boarding option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="no">
                        No, I will pickup at the time above
                      </SelectItem>
                      <SelectItem value="yes">
                        Yes, I would like 6:00 PM the night before
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extraCleaning"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Extra cleaning fee</FormLabel>
                    <FormDescription>
                      Request additional cleaning service for your boat.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vipServices"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">VIP Services</FormLabel>
                    <FormDescription>
                      Select additional VIP services for your trip.
                    </FormDescription>
                  </div>
                  {vipServices.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="vipServices"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memberName"
              render={({ field }) => (
                <FormItem>
                  {renderLabel("Member's Name")}
                  <FormControl>
                    <Input className="pl-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memberCell"
              render={({ field }) => (
                <FormItem>
                  {renderLabel("Member's Cell")}
                  <FormControl>
                    <Input type="tel" className="pl-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memberEmail"
              render={({ field }) => (
                <FormItem>
                  {renderLabel("Member's Email")}
                  <FormControl>
                    <Input type="email" className="pl-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              Send Request
            </Button>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
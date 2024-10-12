import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface FormData {
  boatName: string;
  boatLength: string;
  pickupDate: string;
  pickupTime: string;
  returnTime: string;
  eveningBoarding: string;
  extraCleaning: boolean;
  vipServices: string[]; // Assuming vipServices is an array of strings
  memberName: string;
  memberCell: string;
  memberEmail: string;
}

export default function BoatReservation() {
  const [formData, setFormData] = useState<FormData>({
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
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleVipServiceChange = (service: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      vipServices: prevState.vipServices.includes(service)
        ? prevState.vipServices.filter((s: any) => s !== service)
        : [...prevState.vipServices, service],
    }));
  };
  const vipServices: string[] = []; // Explicitly define the type as string array

  // Example of adding services
  const services = [
    "Decorate Birthday",
    "Hawaiian Party",
    "Other Decorate color",
    "Load Ice",
    "Boat loading service (Car to boat & boat to car)",
    "Stock Groceries or drinks (non-alcoholic)",
    "Cater meals / Hors d'oeuvres",
    "Valet Service",
  ];
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the formData to your backend
    console.log(formData);
    alert("Reservation request sent! Check your email for confirmation.");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-blue-900 text-white">
        <CardTitle className="text-2xl font-bold">
          Request a Reservation
        </CardTitle>
        <p className="text-lg">
          Accepting requests for {new Date().getMonth() + 3}/2024
        </p>
        <p className="text-sm">You will be emailed confirmations</p>
      </CardHeader>
      <CardContent className="bg-blue-800 text-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="boatName">Boat Name*</Label>
              <Select
                name="boatName"
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "boatName", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Boat Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boat1">Boat 1</SelectItem>
                  <SelectItem value="boat2">Boat 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="boatLength">Boat Length*</Label>
              <Select
                name="boatLength"
                onValueChange={(value) => handleInputChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Boat Length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 ft</SelectItem>
                  <SelectItem value="30">30 ft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="pickupDate">Pickup & Return Date*</Label>
            <Input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickupTime">Pickup Time*</Label>
              <Input
                type="time"
                id="pickupTime"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="returnTime">Return Time*</Label>
              <Input
                type="time"
                id="returnTime"
                name="returnTime"
                value={formData.returnTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="eveningBoarding">Request Evening Board</Label>
            <Select
              name="eveningBoarding"
              onValueChange={(value) =>
                handleInputChange({
                  target: { name: "eveningBoarding", value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select evening boarding option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No, I will pickup at the time above">
                  No, I will pickup at the time above
                </SelectItem>
                <SelectItem value="Yes, I would like 6:00 PM the night before">
                  Yes, I would like 6:00 PM the night before
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Checkbox
              id="extraCleaning"
              checked={formData.extraCleaning}
              onCheckedChange={() => handleCheckboxChange("extraCleaning")}
            />
            <Label htmlFor="extraCleaning" className="ml-2">
              Extra cleaning fee
            </Label>
          </div>

          <div>
            <Label>VIP Services</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Decorate Birthday",
                "Hawaiian Party",
                "Other Decorate color",
                "Load Ice",
                "Boat loading service (Car to boat & boat to car)",
                "Stock Groceries or drinks (non-alcoholic)",
                "Cater meals / Hors d'oeuvres",
                "Valet Service",
              ].map((service: string) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.vipServices.includes(service)}
                    onCheckedChange={() => handleVipServiceChange(service)}
                  />
                  <Label htmlFor={service}>{service}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberName">Member's Name*</Label>
            <Input
              type="text"
              id="memberName"
              name="memberName"
              value={formData.memberName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberCell">Member's Cell*</Label>
            <Input
              type="tel"
              id="memberCell"
              name="memberCell"
              value={formData.memberCell}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberEmail">Member's Email*</Label>
            <Input
              type="email"
              id="memberEmail"
              name="memberEmail"
              value={formData.memberEmail}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Send Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

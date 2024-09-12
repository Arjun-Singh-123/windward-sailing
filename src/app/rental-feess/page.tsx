import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const feeData = {
  member: [
    {
      name: "Evening Star",
      length: "28'",
      halfDay: "$105 + $25 Billed",
      weekday: "$155 + $25 Billed",
      weekend: "$180 + $25 Billed",
    },
    {
      name: "Sand Dollar",
      length: "30'",
      halfDay: "$130 + $35 Billed",
      weekday: "$165 + $35 Billed",
      weekend: "$200 + $35 Billed",
    },
    {
      name: "Teewinot",
      length: "30'",
      halfDay: "$150 + $40 Billed",
      weekday: "$180 + $40 Billed",
      weekend: "$210 + $40 Billed",
    },
    {
      name: "Renaissance",
      length: "33'",
      halfDay: "-",
      weekday: "$160 + $55 Billed",
      weekend: "$190 + $55 Billed",
    },
    {
      name: "Windward",
      length: "34'",
      halfDay: "-",
      weekday: "$160 + $55 Billed",
      weekend: "$200 + $55 Billed",
    },
    {
      name: "Tara",
      length: "36'",
      halfDay: "-",
      weekday: "$160 + $55 Billed",
      weekend: "$210 + $55 Billed",
    },
    {
      name: "Bliss",
      length: "40'",
      halfDay: "-",
      weekday: "$350 + $100 Billed",
      weekend: "$375 + $100 Billed",
    },
    {
      name: "Sea Renity",
      length: "40'",
      halfDay: "-",
      weekday: "$305 + $100 Billed",
      weekend: "$335 + $100 Billed",
    },
    {
      name: "Amore e Sole",
      length: "42'",
      halfDay: "-",
      weekday: "$400 + $105 Billed",
      weekend: "$ 450 + $105 Billed",
    },
  ],
  nonMember: [
    {
      name: "Evening Star",
      length: "28'",
      halfDay: "-",
      weekday: "$300",
      weekend: "$345",
    },
    {
      name: "Sand Dollar",
      length: "30'",
      halfDay: "-",
      weekday: "$350",
      weekend: "$400",
    },
    {
      name: "Teewinot",
      length: "30'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Renaissance",
      length: "33'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Windward",
      length: "34'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Tara",
      length: "36'",
      halfDay: "-",
      weekday: "$375",
      weekend: "$425",
    },
    {
      name: "Bliss",
      length: "40'",
      halfDay: "-",
      weekday: "$600",
      weekend: "$650",
    },
    {
      name: "Sea Renity",
      length: "40'",
      halfDay: "-",
      weekday: "$550",
      weekend: "$600",
    },
    {
      name: "Amore e Sole",
      length: "42'",
      halfDay: "-",
      weekday: "$650",
      weekend: "$700",
    },
  ],
};

export default function RentalFees() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">
        Windward Sailing Club
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rental Fees</h2>
      <p className="text-gray-600 mb-6">
        Enjoy a day out on the waves—without owning your own boat! Our rental
        services are perfect for people looking to experience the joys of
        sailing without worrying about the upkeep, capital investment, and
        ownership of an expensive sailboat. All prices below include insurance
        and cleanup after your charter.
      </p>
      <Tabs defaultValue="member">
        <TabsList className="mb-4">
          <TabsTrigger value="member">Member Rental Fees</TabsTrigger>
          <TabsTrigger value="nonMember">Non-Member Rental Fees</TabsTrigger>
          <TabsTrigger value="compare">Compare Fees</TabsTrigger>
        </TabsList>
        <TabsContent value="member">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Vessel Name</th>
                <th className="border border-gray-300 p-2">Length</th>
                <th className="border border-gray-300 p-2">Half-Day</th>
                <th className="border border-gray-300 p-2">Weekday</th>
                <th className="border border-gray-300 p-2">Sat/Sun/Holidays</th>
              </tr>
            </thead>
            <tbody>
              {feeData.member.map((vessel, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 p-2">{vessel.name}</td>
                  <td className="border border-gray-300 p-2">
                    {vessel.length}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vessel.halfDay}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vessel.weekday}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vessel.weekend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="nonMember">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Vessel Name</th>
                <th className="border border-gray-300 p-2">Length</th>
                <th className="border border-gray-300 p-2">Half-Day</th>
                <th className="border border-gray-300 p-2">Weekday</th>
                <th className="border border-gray-300 p-2">Sat/Sun/Holidays</th>
              </tr>
            </thead>
            <tbody>
              {feeData.nonMember.map((vessel, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 p-2">{vessel.name}</td>
                  <td className="border border-gray-300 p-2">
                    {vessel.length}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vessel.halfDay}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vessel.weekday}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vessel.weekend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="compare">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Vessel Name</th>
                <th className="border border-gray-300 p-2">Length</th>
                <th className="border border-gray-300 p-2">Member Weekday</th>
                <th className="border border-gray-300 p-2">Member Weekend</th>
                <th className="border border-gray-300 p-2">
                  Non-Member Weekday
                </th>
                <th className="border border-gray-300 p-2">
                  Non-Member Weekend
                </th>
              </tr>
            </thead>
            <tbody>
              {feeData.member.map((vessel, index) => {
                const nonMemberVessel = feeData.nonMember[index];
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 p-2">
                      {vessel.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {vessel.length}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {vessel.weekday}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {vessel.weekend}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {nonMemberVessel.weekday}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {nonMemberVessel.weekend}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

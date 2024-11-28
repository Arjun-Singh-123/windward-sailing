import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const cardData = [
  {
    title: "Amazing Product 1",
    description:
      "This product will revolutionize your life in ways you never imagined!",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Incredible Service 2",
    description:
      "Our service is so good, you'll wonder how you ever lived without it!",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Fantastic Offer 3",
    description:
      "An offer so fantastic, it'll make your head spin with excitement!",
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
];

export default function AlternatingCards() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {cardData.map((card, index) => (
        <Card
          key={index}
          className={`flex flex-col md:flex-row overflow-hidden ${
            index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
          }`}
        >
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
            <p className="mb-4">{card.description}</p>
            <Button className="self-start">View More</Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src={card.imageUrl ?? " "}
              alt={card.title || "default"}
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

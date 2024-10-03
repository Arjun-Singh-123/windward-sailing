import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface YachtInfo {
  name: string;
  description: string;
  imageUrl: string;
}

const yachtData: YachtInfo[] = [
  {
    name: "Duffield 18' - KRISTABELL",
    description:
      "The Duffield 18' - KRISTABELL is a masterful blend of elegance, performance, and craftsmanship. At 18 feet in length, this yacht exudes a timeless charm, offering a perfect balance between intimacy and spaciousness. Crafted by the renowned Duffield Yachts, the KRISTABELL is a testament to their commitment to precision engineering and exquisite design.",
    imageUrl: "/images/cf.jpeg?height=400&width=600",
  },
  {
    name: "Seafarer 22' - OCEANUS",
    description:
      "The Seafarer 22' - OCEANUS combines comfort with adventure. This 22-foot vessel is designed for those who seek both luxury and excitement on the open waters. With its sleek lines and robust build, the OCEANUS promises unforgettable journeys, whether you're cruising along the coast or exploring hidden coves.",
    imageUrl: "/images/cf.jpeg?height=400&width=600",
  },
  {
    name: "Mariner 25' - POSEIDON",
    description:
      "Step aboard the Mariner 25' - POSEIDON, where sophistication meets power. This 25-foot beauty is equipped with state-of-the-art navigation systems and plush interiors, ensuring a smooth and luxurious sailing experience. The POSEIDON is perfect for both day trips and extended voyages, offering ample space and top-notch amenities.",
    imageUrl: "/images/cf.jpeg?height=400&width=600",
  },
  {
    name: "Duffield 18' - KRISTABELL",
    description:
      "The Duffield 18' - KRISTABELL is a masterful blend of elegance, performance, and craftsmanship. At 18 feet in length, this yacht exudes a timeless charm, offering a perfect balance between intimacy and spaciousness. Crafted by the renowned Duffield Yachts, the KRISTABELL is a testament to their commitment to precision engineering and exquisite design.",
    imageUrl: "/images/cf.jpeg?height=400&width=600",
  },
  {
    name: "Seafarer 22' - OCEANUS",
    description:
      "The Seafarer 22' - OCEANUS combines comfort with adventure. This 22-foot vessel is designed for those who seek both luxury and excitement on the open waters. With its sleek lines and robust build, the OCEANUS promises unforgettable journeys, whether you're cruising along the coast or exploring hidden coves.",
    imageUrl: "/images/cf.jpeg?height=400&width=600",
  },
  {
    name: "Mariner 25' - POSEIDON",
    description:
      "Step aboard the Mariner 25' - POSEIDON, where sophistication meets power. This 25-foot beauty is equipped with state-of-the-art navigation systems and plush interiors, ensuring a smooth and luxurious sailing experience. The POSEIDON is perfect for both day trips and extended voyages, offering ample space and top-notch amenities.",
    imageUrl: "/images/cf.jpeg?height=400&width=600",
  },
];

export default function AlternatingYachtSections() {
  return (
    <div className="w-full">
      {yachtData?.map((yacht, index) => {
        const newIndex = (index + 1) % yachtData.length || yachtData.length - 1;
        const imageUrl =
          index % 2 === 0
            ? "/images/cf.jpeg?height=400&width=600"
            : "/images/duff1.jpeg?height=400&width=600";

        return (
          <section
            key={yacht.name}
            className={`flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-8 ${
              index % 2 === 0 ? "bg-sky-50" : "bg-white"
            }`}
          >
            <div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:order-1" : "md:order-2"
              }`}
            >
              <img
                src={imageUrl}
                alt={yacht.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div
              className={`w-full md:w-1/2 mt-8 md:mt-0 ${
                index % 2 === 0 ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"
              }`}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {yacht.name}
              </h2>
              <p className="text-gray-600 mb-6">{yacht.description}</p>

              <Link href={`/products/${newIndex}`} passHref>
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  LEARN MORE
                </Button>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}

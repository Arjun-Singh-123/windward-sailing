"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Anchor, AnchorIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import * as z from "zod";

interface SpecificationData {
  content: {
    amenities: { name: string; value: string }[];
    boat_details: {
      title: string;
      subtitle: string;
      description: string;
    };
    specifications: {
      "Fin Keel": { name: string; value: string }[];
      "Wing Keel": { name: string; value: string }[];
      "General Dimensions": { name: string; value: string }[];
    };
  };
}

function convertToSpecificationData(data: any) {
  console.log("getting convertible data", data);
  // Check if 'data' and 'content' exist
  if (!data || typeof data !== "object") {
    console.error("Invalid data provided.");
    return []; // Return empty if the data is invalid
  }

  // Now we can safely access 'data.content'
  const specificationData = Object.keys(data ?? {})?.map((section) => ({
    title: section,
    specs: data[section]?.map((spec: any) => ({
      name: spec.name,
      value: spec.value,
    })),
  }));

  console.log("finished data", specificationData);
  return specificationData;
}

export type Specification = {
  name: string;
  value: string;
};

export type SpecificationCategory = {
  title: string;
  specs: Specification[];
};

export type RawSpecificationData = {
  [key: string]: Specification[];
};

export type VehicleContent = {
  specifications: RawSpecificationData;
  // ... other properties like amenities, boat_details, etc.
};

export type VehicleDetails = {
  id: number;
  content: VehicleContent;
  section_type: string;
};

// Function to check if `specificationData.content.specifications` exists and is valid
function hasValidSpecifications(data: any): boolean {
  return (
    data &&
    typeof data === "object" &&
    "content" in data &&
    data.content &&
    typeof data.content === "object" &&
    "specifications" in data.content &&
    Array.isArray(data.content.specifications)
  );
}

const SpecificationValueSchema = z.object({
  name: z.string(),
  value: z.string(),
});
const SpecificationSectionSchema = z.record(
  z.array(SpecificationValueSchema).or(z.record(z.string()))
);

type SpecificationSection = z.infer<typeof SpecificationSectionSchema>;

export const transformSpecifications = (data: SpecificationSection) => {
  return Object.entries(data ?? {})?.map(([title, values]) => {
    const specs = Array.isArray(values)
      ? values
      : Object.entries(values).map(([name, value]) => ({
          name,
          value: String(value),
        }));

    return {
      title,
      specs,
    };
  });
};
const SpecificationsSection = ({ specificationData }: any) => {
  console.log("spec data ...........", specificationData);

  const sectionWidths = useMemo(() => {
    return transformSpecifications(specificationData)?.map((section) => {
      const maxLength = Math.max(
        ...section.specs.map((spec) => spec.value.length)
      );
      // Calculate width based on max length, with a minimum of 300px and maximum of 600px
      return Math.min(Math.max(300, maxLength * 8), 600);
    });
  }, []);

  console.log("specification");
  return (
    <div className="mb-8    ">
      <h2 className="text-2xl sm:text-3xl font-bold ml-3    mb-4 text-black dark:text-white">
        Specifications
      </h2>
      {/* <DecoratorLine /> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specificationData &&
          convertToSpecificationData(specificationData)?.map(
            (section, index) => (
              <div
                key={index}
                className=" bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg  "
              >
                <LegendComponent text={section.title} />

               
                <div className="p-4 overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {section?.specs?.map((spec: any, specIndex: any) => (
                        <tr
                          key={specIndex}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className=" text-sm">
                            <AnchorIcon className="text-flatBlue" />
                          </td>

                          <td className=" px-2    py-2 sm:px-2 sm:py-3 text-sm font-medium text-gray-900 dark:text-white">
                            {spec.name}
                          </td>

                          <td className="  py-2 sm:px-6 sm:py-3 text-sm text-gray-500 dark:text-gray-300">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
      </div> */}
      <div className="p-4 bg-sky-50">
        <div className="flex flex-wrap gap-8  ">
          {transformSpecifications(specificationData)?.map((section, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md   flex-grow   "
              // style={{
              //   minWidth: "300px",
              //   flexBasis: `${Math.max(25, section.specs.length * 5)}%`,
              // }}

              // style={{ width: `${sectionWidths[index]}px` }}
              // style={{
              //   minWidth: "300px",
              //   maxWidth: "600px",
              //   minHeight: "300px",
              // }}
            >
              <LegendComponent text={section.title} />
              <div className="p-3">
                <div className="space-y-2">
                  {section.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex   gap-2 text-sm">
                      <Anchor className="text-sky-500 h-4 w-4 flex-shrink-0 mt-0.5 text-flatBlue" />
                      <div className="flex-1 gap-2">
                        <span className="font-medium text-gray-900">
                          {spec.name}:{" "}
                        </span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VesselOverview = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold text-[#00008b] mb-2">
              Windward 28 - EVENING STAR
            </h1>
            <div className="border-b-2 border-[#00008b] w-16 mb-4"></div>
            <p className="mb-4">
              The Windward 28 - EVENING STAR is a charming embodiment of
              maritime excellence, bringing together classic elegance and
              seafaring adventure. At 28 feet in length, this yacht offers an
              inviting blend of intimacy and exploration. Its sleek hull design
              ensures a steady and pleasurable journey, whether you&apos;re
              gliding through calm waters or embracing the exhilaration of the
              open sea.
            </p>
            <p className="mb-4">
              Stepping on board, you&apos;re welcomed into a world of
              sophistication. The interior is a testament to Windward
              Yachts&apos; unwavering dedication to quality, with carefully
              chosen materials and meticulous craftsmanship that exude an
              ambiance of refined opulence. Plush seating, fine finishes, and
              attention to every detail underscore the brand&apos;s commitment
              to both comfort and style.
            </p>
            <p className="mb-4">
              Despite its modest size, the EVENING STAR comes equipped with a
              range of contemporary amenities. An efficiently designed galley is
              perfect for onboard dining, and the open deck invites you to soak
              up the sun and enjoy the sea breeze.
            </p>
            <p>
              This yacht is more than a vessel; it&apos;s an open invitation to
              a world of adventure. With its responsive controls and exceptional
              handling, the EVENING STAR promises an exhilarating ride suitable
              for seasoned sailors and newcomers alike.
            </p>
          </div>
          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="bg-[#00008b] text-white p-2 rounded">
                  Vessel Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">MFG.:</TableCell>
                      <TableCell>Windward</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Size:</TableCell>
                      <TableCell>28</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Auto Pilot:</TableCell>
                      <TableCell>no</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bimini:</TableCell>
                      <TableCell>no</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Bluetooth Stereo:
                      </TableCell>
                      <TableCell>yes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cabins:</TableCell>
                      <TableCell>2</TableCell>
                    </TableRow>
                    {/* Add more rows for other amenities */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

import { fetchVehicleAmenities, getAmenitiess } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import LegendComponent from "../common/left-triangle";
import DecoratorLine from "../common/decorator-icon-line";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const images = [
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4543.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4544.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4545.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4546.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4547.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4548.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4549.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4550.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4551.jpg",
    alt: "CATALINA 30 SAND DOLLAR1",
    caption: "CATALINA_30_SAND_DOLLAR1",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4552.jpg",
    alt: "CATALINA 30 SAND DOLLAR2",
    caption: "CATALINA_30_SAND_DOLLAR2",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4553.jpg",
    alt: "CATALINA 30 SAND DOLLAR3",
    caption: "CATALINA_30_SAND_DOLLAR3",
  },
  {
    src: "https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4554.jpg",
    alt: "CATALINA 30 SAND DOLLAR4",
    caption: "CATALINA_30_SAND_DOLLAR4",
  },
];

const ImageModal = ({ isOpen, onClose, image }: any) => {
  if (!isOpen) return null;

  console.log("image in modal compoennt", image);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          &times;
        </button>
        <Image
          src="https://pknbhkxuqdmghngwniok.supabase.co/storage/v1/object/public/images/windward-images/IMG_4546.jpg"
          alt={image.alt}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
  is360?: boolean;
}

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
  is360?: boolean;
}

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  ZoomIn,
  ZoomOut,
  Rotate3D,
  Maximize,
  Minimize,
} from "lucide-react";

interface ImageProps {
  src: string;
  alt: string;
  caption: string;
  is360?: boolean;
  height?: number;
  width?: number;
}

export default function YachtGallery({
  images = [],
  title = "External",
}: {
  images: any[];
  title: string;
}) {
  console.log(`checking ${title} images.....`, images);

  const [startIndex, setStartIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCardboardView, setIsCardboardView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % (images.length - 3));
  };

  const prevSlide = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + (images.length - 3)) % (images.length - 3)
    );
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setScale(1);
    setRotation(0);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsFullScreen(false);
    setIsCardboardView(false);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const handle360Rotation = (e: React.MouseEvent<HTMLImageElement>) => {
    if (
      selectedImageIndex !== null &&
      images[selectedImageIndex].is360 &&
      imageRef.current
    ) {
      const { left, width } = imageRef.current.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const rotationDegree = (mouseX / width) * 360;
      setRotation(rotationDegree);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const toggleCardboardView = () => {
    setIsCardboardView(!isCardboardView);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => ((prevIndex as number) + 1) % images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) =>
          ((prevIndex as number) - 1 + images.length) % images.length
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        setIsCardboardView(false);
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold   text-[#1e3a8a] flex items-center mb-6">
        <Compass className="mr-2 h-6 w-6 sm:h-8 sm:w-8 " /> {title}
      </h2>
      {/* <DecoratorLine /> */}
      <div className="relative">
        <div className="flex sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 overflow-hidden">
          {images?.slice(startIndex, startIndex + 4)?.map((image, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {image && (
                <div
                  className="relative   mb-2 cursor-pointer"
                  onClick={() => openModal(startIndex + index)}
                >
                  <Image
                    src={image ?? ""}
                    alt={image.alt}
                    width={1600}
                    height={800}
                    objectFit="cover"
                    className="rounded-lg h-[300px] object-center"
                  />
                </div>
              )}
              <p className="text-sm text-center text-gray-600">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
        {images && images.length >= 4 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white text-black hover:bg-white hidden sm:flex"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white hover:bg-white hidden sm:flex"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4 sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={closeModal}>
        <DialogContent className="max-w-full w-full h-[90vh] p-0 bg-transparent border-none shadow-none">
          <div
            className="fixed inset-0 bg-black opacity-80"
            onClick={closeModal}
          ></div>
          <DialogTitle></DialogTitle>
          <div
            ref={containerRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImageIndex !== null && (
              <div
                className={`relative w-full h-full ${
                  isCardboardView ? "flex" : ""
                }`}
              >
                <Image
                  ref={imageRef}
                  src={images?.[selectedImageIndex] ?? ""}
                  alt="default"
                  layout="fill"
                  objectFit="contain"
                  className={`rounded-lg ${
                    isCardboardView ? "w-1/2" : "w-full"
                  }`}
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseMove={handle360Rotation}
                />
                {isCardboardView && (
                  <Image
                    src={images[selectedImageIndex].src}
                    alt={images[selectedImageIndex].alt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg w-1/2 ml-1/2"
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                      transition: "transform 0.2s ease-in-out",
                    }}
                  />
                )}
              </div>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomIn}
                className="bg-white/20 hover:bg-white/40 text-white"
              >
                <ZoomIn className="h-4 w-4 mr-2" />
                Zoom In
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomOut}
                className="bg-white/20 hover:bg-white/40 text-white"
              >
                <ZoomOut className="h-4 w-4 mr-2" />
                Zoom Out
              </Button>
              {selectedImageIndex !== null &&
                images[selectedImageIndex].is360 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={toggleCardboardView}
                    className="bg-white/20 hover:bg-white/40 text-white"
                  >
                    <Rotate3D className="h-4 w-4 mr-2" />
                    {isCardboardView ? "Normal View" : "Cardboard View"}
                  </Button>
                )}
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleFullScreen}
                className="bg-white/20 hover:bg-white/40 text-white"
              >
                {isFullScreen ? (
                  <>
                    <Minimize className="h-4 w-4 mr-2" />
                    Exit Full Screen
                  </>
                ) : (
                  <>
                    <Maximize className="h-4 w-4 mr-2" />
                    Full Screen
                  </>
                )}
              </Button>
            </div>

            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white hover:bg-gray/40 text-black"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white hover:bg-white/40 text-black"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { SpecificationsSection, VesselOverview };

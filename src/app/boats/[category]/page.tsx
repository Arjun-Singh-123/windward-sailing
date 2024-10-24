"use client";
import {
  contentFont,
  cursiveHeadingFont,
  mainHeadingFont,
} from "@/app/ui/fonts";
// import ProductList from "@/components/boat-section/product-list";
// import { fetchProductsByCategory } from "@/lib/services";

import ProductList from "@/components/boat-section/product-list";
import DecoratorLine from "@/components/common/decorator-icon-line";
import Loader from "@/components/common/loader";
import Heroo from "@/components/sections/heroo";
import { Button } from "@/components/ui/button";
import {
  fetchProductsByCategory,
  fetchProductsNavsection,
} from "@/lib/services";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
// function isValidUUID(uuid) {
//   const regex =
//     /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
//   return regex.test(uuid);
// }

interface YachtInfo {
  name: string;
  description: string;
  imageUrl: string;
}

function formatTitle(title: string) {
  const formattedTitle = title.replace(/(\d+)/g, " $1").trim();

  const capitalizedTitle = formattedTitle.replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );

  return capitalizedTitle;
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

export default function CategoryPage() {
  const params = useParams();
  // console.log(params);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", params.category],
    queryFn: () => fetchProductsNavsection(params.category as any),
  });
  // console.log("checkingllllllllllllllllllllllll paramssssssssss", params);
  const categoryId = params.category; // Use category directly
  // if (!isValidUUID(params.category)) {
  //   console.error("Invalid UUID format:", params.category);
  //   return <div>Error: Invalid Category ID</div>; // Return error component
  // }

  // const products = (await fetchProductsByCategory(categoryId)) || [];
  // console.log("checking products", products);

  // console.log("checking params", params);

  if (!products || products.length === 0) {
    return (
      <>
        <div>
          {" "}
          <Loader />
        </div>
      </>
    );
  }

  // const productsChanged = products?.flatMap((section) =>
  //   section.nav_subsections
  //     .filter((subsection) => subsection.products.length > 0)
  //     .flatMap((subsection) => subsection.products)
  // );

  return (
    <>
      <div className="  flex flex-col items-center min-h-screen">
        <main className="w-full flex flex-col items-center    mx-auto">
          <Heroo />

          <section className="w-full p-4 max-w-6xl mx-auto">
            <div className="   ">
              <div className=" relative flex flex-col w-full   p-4 md:p-4">
                <h2
                  className={`mt-4  md:mt-10    text-2xl text-flatBlue   ${cursiveHeadingFont.className}  `}
                >
                  Windward Sailing Club
                </h2>
                <h3 className={`text-2xl ${mainHeadingFont.className}`}>
                  {formatTitle(params?.category as any)} Details
                </h3>
                <DecoratorLine />

                <div className={`  mb-4     `}>
                  <p className={`mb-2 ${contentFont.className}`}>
                    Embark on a Maritime Odyssey with Our Exceptional Fleet
                    Experience the epitome of yachting luxury and adventure with
                    our handpicked fleet of six exceptional vessels. The
                    Windward 28' - EVENING STAR invites you to discover the
                    perfect fusion of elegance and excitement, promising a
                    journey that transcends the ordinary. Meanwhile, the
                    Catalina 30' - SAND DOLLAR stands as a beacon of style and
                    serenity, offering a platform where luxury meets the
                    tranquility of the sea. For those who seek the pinnacle of
                    sailing excellence, the Hunter 30' - TEEWINOT promises an
                    exhilarating voyage, combining size and performance
                    seamlessly. On the other hand, the Dufour 33' - RENAISSANCE
                    beckons with an opulent embrace of luxury, inviting you to
                    set forth on a journey marked by grandeur and seafaring
                    splendor. With the Catalina 34' WINDWARD, experience a
                    symphony of comfort and maritime prowess, where every moment
                    on board is a celebration of opulence and ease. Finally, the
                    Mainship 34' - RODE TRIP encapsulates the joy of seafaring
                    adventure, providing a capable and comfortable vessel for
                    unforgettable journeys. Each of these yachts embodies a
                    unique blend of style, comfort, and performance, promising a
                    maritime experience that's nothing short of extraordinary.
                    Embrace the allure of the sea and embark on a voyage of a
                    lifetime with our remarkable fleet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {products?.map((yacht: any, index: number) => {
            const newIndex = index % yachtData.length || yachtData.length - 1;
            const imageUrl =
              index % 2 === 0
                ? "/images/cf.jpeg?height=400&width=600"
                : "/images/duff1.jpeg?height=400&width=600";

            return (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-lightSky" : "bg-white"
                } w-full`}
              >
                <section
                  key={index}
                  className={`flex flex-col md:flex-row items-center justify-between py-16 px-4 md:px-8 max-w-6xl mx-auto ${
                    index % 2 === 0 ? "bg-sky-50" : "bg-white"
                  } `}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    {/* <Image
                      src={yacht?.image_url ?? ""}
                      alt={yacht?.name}
                      className="w-full h-auto rounded-lg shadow-lg"
                      height={544}
                      width={408}
                    /> */}

                    <div className="md:aspect-[4/3] aspect-[3/4] relative w-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={yacht?.image_url ?? ""}
                        alt={yacht?.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div
                    className={`w-full md:w-1/2 mt-4 md:mt-0 ${
                      index % 2 === 0
                        ? "md:order-2 md:pl-8"
                        : "md:order-1 md:pr-8"
                    }`}
                  >
                    <h2 className="text-3xl font-bold mb-1 text-gray-800">
                      {yacht.name}
                    </h2>
                    <DecoratorLine />
                    <p className="text-gray-600 mb-2">{yacht?.description}</p>

                    <Link href={`/boats/category/${yacht?.href}`} passHref>
                      <Button
                        variant="default"
                        className="bg-gradient-to-r mt-2 from-[#6edcfc] to-[#4facfe] text-black font-bold px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        LEARN MORE
                      </Button>
                    </Link>
                  </div>
                </section>
              </div>
            );
          })}
        </main>
      </div>

      {/* <div className="container mx-auto px-4">
        
        <h1 className="text-3xl font-bold my-6">Products in this Section</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <Link href={`/boats/hello/${product.href}`}>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-bold">
                    Price: ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div> */}
    </>

    // <ProductList products={products} title={"windward sailing platform"} />
  );
}

// export default async function CategoryPage({
//   params,
// }: {
//   params: { id: number | string }; // Update type to include string if necessary
// }) {
//   console.log("Params received:", params); // Log the entire params object

//   const products = await fetchProductsByCategory(Number(params.id)); // Ensure you're passing a number
//   console.log("Checking products", products);

//   return <ProductList products={products} title={params.category} />;
// }

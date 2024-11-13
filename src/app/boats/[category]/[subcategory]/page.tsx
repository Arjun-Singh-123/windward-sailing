"use client";
import ProductList from "@/components/boat-section/product-list";
import { fetchProductsBySubcategory } from "@/lib/services";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Json } from "../../../../../database.types";
import Heroo from "@/components/sections/heroo";
import YachtGallery, {
  SpecificationsSection,
} from "@/components/sections/specification";
import YachtDescription from "@/components/sections/amenity";
import NotFoundNew from "@/components/sections/not-found-page";
import NoDataFound from "@/components/common/no-data-found";
import Loader from "@/components/common/loader";

interface ProductDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  hero_image: string[];
  icon: string;
  amenities: Record<string, string>;
  images: {
    internal: string[];
    external: string[];
  };
  specifications: Json[];
}

const fetchProductDetails = async (productSlug: string) => {
  // Add leading slash if not present
  const slugToCompare = productSlug.startsWith("/")
    ? productSlug
    : `/${productSlug}`;
  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("id")
    .eq("href", slugToCompare)
    .single();

  if (productError || !productData) {
    throw new Error("Product not found");
  }
  // console.log("product data", productData);
  const { data, error } = await supabase
    .from("product_details")
    .select("*")
    .eq("product_id", productData.id)
    .single();

  if (error) {
    throw error;
  }

  return data as any;
};
export default async function SubcategoryPage({
  params,
}: {
  params: { category: string; subcategory: string };
}) {
  const {
    data: productDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-details", params.subcategory],
    queryFn: () => fetchProductDetails(params.subcategory),
    // enabled: !!params.subcategory, // Only run query if subcategory exists
  });

  if (isLoading) return <Loader />;
  if (!productDetail)
    return (
      <div>
        <NoDataFound />
      </div>
    );
  // const { product_details } = product;
  const { specifications, amenities, images } = productDetail;

  console.log("product detail", productDetail);

  // const products = await fetchProductsBySubcategory(params.subcategory);
  console.log("params params id ", params);
  console.log("subcategory id ", params.subcategory);

  console.log("images ........", productDetail.images.external);

  // return <ProductList products={productDetail} title={params.subcategory} />;

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)]">
        <main className="w-full flex flex-col items-center sm:items-start gap-4">
          <section className="w-full">
            <Heroo />
          </section>

          <section className="w-full p-4">
            <div className="container mx-auto max-w-6xl">
              <YachtDescription
                title={productDetail?.title}
                description={productDetail?.description}
                amenities={amenities}
              />
            </div>
          </section>

          <section className="w-full p-4 bg-lightSky">
            <div className="container mx-auto max-w-6xl">
              <YachtGallery
                images={productDetail?.images?.external}
                title="Exterior Photos"
              />
            </div>
          </section>

          <section className="w-full p-4">
            <div className="container mx-auto max-w-6xl">
              {" "}
              <YachtGallery
                images={productDetail?.images?.internal}
                title="Interior Photos"
              />
            </div>
          </section>

          <section className="w-full p-4 bg-lightSky">
            <div className="container mx-auto max-w-6xl">
              {" "}
              <SpecificationsSection specificationData={specifications} />
            </div>
          </section>
        </main>
      </div>

      {/* hello boundary is here  */}
      {/* <div className="container mx-auto px-4">
        <div className="my-8">
          <h1 className="text-4xl font-bold mb-4">{productDetail.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{productDetail.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {productDetail?.hero_image?.map((image: any, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hero ${index + 1}`}
                  className="w-full mb-4 rounded-lg"
                />
              ))}
            </div>
            <div>
              <img
                src={productDetail.icon}
                alt="Product Icon"
                className="w-16 h-16 mb-4"
              />
              <p className="text-gray-700 mb-6">{productDetail.description}</p>

              <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
              <SpecificationsComponent specifications={specifications} />

              <h2 className="text-2xl font-semibold my-6">Amenities</h2>
              <AmenitiesComponent amenities={amenities} />

              <h2 className="text-2xl font-semibold my-6">Images</h2>
              <ImagesComponent images={images} />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

interface SpecificationsProps {
  specifications: Record<string, Record<string, string>>;
}

function SpecificationsComponent({ specifications }: SpecificationsProps) {
  return (
    <div>
      {Object.entries(specifications ?? {})?.map(([category, specs]) => (
        <div key={category} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{category}</h3>
          <ul className="list-disc list-inside">
            {Object.entries(specs ?? {}).map(([key, value]) => (
              <li key={key}>{`${key}: ${value}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

interface AmenitiesProps {
  amenities: Record<string, string>;
}

function AmenitiesComponent({ amenities }: AmenitiesProps) {
  return (
    <ul className="list-disc list-inside mb-6">
      {Object?.entries(amenities ?? {})?.map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ))}
    </ul>
  );
}

interface ImagesProps {
  images: {
    internal: string[];
    external: string[];
  };
}

function ImagesComponent({ images }: ImagesProps) {
  console.log("ImagesComponent ........", images);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images?.internal?.map((image, index) => (
        <img
          key={`internal-${index}`}
          src={image}
          alt={`Internal ${index + 1}`}
          className="w-full h-40 object-cover rounded-lg"
        />
      ))}
      {images?.external?.map((image, index) => (
        <img
          key={`external-${index}`}
          src={image}
          alt={`External ${index + 1}`}
          className="w-full h-40 object-cover rounded-lg"
        />
      ))}
    </div>
  );
}

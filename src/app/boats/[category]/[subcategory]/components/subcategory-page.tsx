"use client";
import { useQuery } from "@tanstack/react-query";
import Heroo from "@/components/sections/heroo";
import YachtGallery, {
  SpecificationsSection,
} from "@/components/sections/specification";
import YachtDescription from "@/components/sections/amenity";
import NoDataFound from "@/components/common/no-data-found";
import Loader from "@/components/common/loader";
import { fetchProductDetails } from "@/services/subcategory-services";
import { Json } from "../../../../../../database.types";

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

export default function SubcategoryPage({
  subcategory,
}: {
  subcategory: string;
}) {
  const {
    data: productDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-details", subcategory],
    queryFn: () => fetchProductDetails(subcategory),
    enabled: !!subcategory, // Only run query if subcategory exists
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

  console.log("images ........", productDetail.images.external);

  // return <ProductList products={productDetail} title={params.subcategory} />;
  console.log(productDetail?.images.internal.length > 0);
  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)] slider-section">
        <main className="w-full flex flex-col items-center sm:items-start   ">
          <section className="w-full">
            <Heroo />
          </section>

          <section className="w-full p-4">
            <YachtDescription
              title={productDetail?.title}
              description={productDetail?.description}
              amenities={amenities}
            />
          </section>

          {productDetail?.images.external.length > 0 && (
            <section className="w-full p-4 bg-lightSky">
              <div className="container mx-auto   max-w-[1630px] px-[15px]">
                <YachtGallery
                  images={productDetail?.images?.external}
                  title="Exterior Photos"
                />
              </div>
            </section>
          )}

          {productDetail?.images.internal.length > 0 && (
            <section className="w-full p-4">
              <div className="container mx-auto   max-w-[1630px] px-[15px]">
                {" "}
                <YachtGallery
                  images={productDetail?.images?.internal}
                  title="Interior Photos"
                />
              </div>
            </section>
          )}

          <section className="w-full p-4 bg-lightSky">
            <div className="container mx-auto   max-w-[1630px] px-[15px]">
              {" "}
              <SpecificationsSection specificationData={specifications} />
            </div>
          </section>
        </main>
      </div>
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

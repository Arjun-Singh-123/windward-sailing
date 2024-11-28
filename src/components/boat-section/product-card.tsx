import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url: string | null;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  image_url,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      <Image
        src={image_url ?? ""}
        alt={name || "default"}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4  flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2 ">{name}</h2>
        <p className="text-gray-600 mb-2  flex-grow">{description}</p>
        <p className="text-lg font-bold mb-4">${price?.toFixed(2)}</p>
        <Link
          href={`/products/${id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

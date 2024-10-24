import NoDataFound from "../common/no-data-found";
import ProductCard from "./product-card";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url: string | null;
};

type ProductListProps = {
  products: Product[];
  title: string;
};

export default function ProductList({ products, title }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <>
        <NoDataFound />
      </>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* {products && products.length === 0 && <div>No products found !!</div>} */}
      {/* <h1 className="text-3xl font-bold mb-8">{title}</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

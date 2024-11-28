import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchRentals } from "@/services/rental-services";
import CategoryPage from "./components/category-page";
import { fetchProductsNavsection } from "@/lib/services";

const Page = async ({
  params,
}: {
  params: { category: string; subcategory: string };
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", params.category],
    queryFn: () => fetchProductsNavsection(params.category as any),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryPage />
    </HydrationBoundary>
  );
};

export default Page;

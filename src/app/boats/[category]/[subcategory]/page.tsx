import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SubcategoryPage from "./components/subcategory-page";
import { fetchProductDetails } from "@/services/subcategory-services";

const Page = async ({
  params,
}: {
  params: { category: string; subcategory: string };
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product-details", params.subcategory],
    queryFn: () => fetchProductDetails(params.subcategory),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubcategoryPage subcategory={params.subcategory} />
    </HydrationBoundary>
  );
};

export default Page;

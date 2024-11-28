import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchRentals } from "@/services/rental-services";
import SailingServices from "./sailing-services";
import { fetchSectionProducts } from "@/services/product-services";

const HighlightedCards = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cards-data"],
    queryFn: () =>
      fetchSectionProducts("8af6b308-d7a6-4f02-9f96-b11567aaa3b6") ?? [],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SailingServices />
    </HydrationBoundary>
  );
};

export default HighlightedCards;

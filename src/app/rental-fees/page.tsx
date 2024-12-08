import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import RentalFees from "./components/rental-fees";
import { fetchRentals } from "@/services/rental-services";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["rental-fees"],
    queryFn: () => fetchRentals(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RentalFees />
    </HydrationBoundary>
  );
};

export default Page;

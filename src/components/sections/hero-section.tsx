import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchRentals } from "@/services/rental-services";
import Hero from "./heroo";
import { fetchSectionProducts } from "@/services/product-services";

const BannerSection = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hero-banner-images"],
    queryFn: () => fetchSectionProducts("bd024ca4-e72a-499b-8237-c875f6429409"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Hero />
    </HydrationBoundary>
  );
};

export default BannerSection;

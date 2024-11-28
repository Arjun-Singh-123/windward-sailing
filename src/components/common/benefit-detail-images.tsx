import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Detail from "./details";
import {
  fetchBenefitSectionProducts,
  fetchContacts,
} from "@/services/product-services";

const BenefitSection = async ({ benefits, benefitsData }: any) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["benefit-images"],
    queryFn: () =>
      fetchBenefitSectionProducts("e19f92fb-5d0b-49a8-9fff-a64a3fe80a80"),
  });

  console.log("benefits data", queryClient.getQueryData(["benefit-images"]));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail benefits={benefits} benefitsData={benefitsData} />
    </HydrationBoundary>
  );
};

export default BenefitSection;

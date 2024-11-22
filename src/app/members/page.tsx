import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Members from "./components/member";
import { fetchVehicleAmenities } from "@/lib/services";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["members-info"],
    queryFn: () => fetchVehicleAmenities(),
  });

  const data = queryClient.getQueryData(["members-info"]);
  console.log(data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Members />
    </HydrationBoundary>
  );
};

export default Page;

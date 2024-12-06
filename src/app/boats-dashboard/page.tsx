import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchVehicleAmenities } from "@/lib/services";
import Dashboard from "./components/dashboard-manage";
import {
  fetchDashBoardBoatsNavItem,
  fetchDashBoardSectionsAndNavItems,
} from "@/services/dashboard-manage-services";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["sectionsAndNavItems"],
    queryFn: fetchDashBoardSectionsAndNavItems,
  });

  await queryClient.prefetchQuery({
    queryKey: ["boatsNavItem"],
    queryFn: fetchDashBoardBoatsNavItem,
  });

  console.log(queryClient.getQueryData(["boatsNavItem"]));
  console.log(queryClient.getQueryData(["sectionsAndNavItems"]));

  // queryKey: ["userSelections", sectionId],
  // queryFn: () => fetchDashBoardUserSelections(sectionId),

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
};

export default Page;

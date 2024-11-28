import {
  fetchFooterContent,
  fetchNavItems,
} from "@/services/header-footer-services";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Header from "./dynamic-header";

const DynamicHeader = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["footer-data"],
    queryFn: fetchFooterContent,
  });
  await queryClient.prefetchQuery({
    queryKey: ["menuitems-data"],
    queryFn: fetchNavItems,
  });

  console.log(queryClient.getQueryData(["footer-data"]));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
    </HydrationBoundary>
  );
};

export default DynamicHeader;

import { fetchFooterContent } from "@/services/header-footer-services";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import DynamicFooter from "./dynamic-footer";
import { fetchContacts } from "@/services/product-services";

const DynamicHeader = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["footer-data"],
    queryFn: fetchFooterContent,
  });
  await queryClient.prefetchQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const data = queryClient.getQueryData(["footer-data"]);

  console.log(data);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DynamicFooter />
    </HydrationBoundary>
  );
};

export default DynamicHeader;

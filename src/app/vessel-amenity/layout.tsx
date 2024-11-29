import FooterBottom from "@/components/common/footer";
import DynamicHeader from "@/components/common/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicHeader />
      {children} <FooterBottom />
    </>
  );
}

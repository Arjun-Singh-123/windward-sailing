"use client";

import { usePathname } from "next/navigation";
import Header from "../common/dynamic-header";
import DynamicFooter from "../common/dynamic-footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}
      {children}
      {!isLoginPage && <DynamicFooter />}
    </>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ChevronsRight } from "lucide-react";
import { usePathname } from "next/navigation";

import Image from "next/image";

// import { FooterContent } from "../sections/admin-footer";
import { useQuery } from "@tanstack/react-query";
// import useHeaderStore from "@/store/header-height";
// import MainNav from "../sections/main-nav";
// import TopBar from "../sections/top-nav";
import { EXCLUDED_LABELS } from "@/constants";
import { SocialMediaItems } from "./footer-contact-items";
import { fetchFooterContent } from "@/services/header-footer-services";
import { fetchContacts } from "@/services/product-services";

type FieldType = "text" | "textarea" | "image" | "links";

interface FooterField {
  type: FieldType;
  label: string;
  value: string | { text: string; url: string }[];
}

interface FooterContent {
  id?: string;
  content: {
    [key: string]: FooterField;
  };
}

// Components
const FooterLink = ({ text, url }: { text: string; url: string }) => (
  <Link href={url} className="hover:underline flex gap-1">
    <ChevronsRight /> {text}
  </Link>
);

const FooterField = ({ field }: { field: FooterField }) => {
  switch (field.type) {
    case "text":
    case "textarea":
      return <p>{field.value as string}</p>;
    case "image":
      return (
        <Image
          src={field.value as string}
          alt={field.label}
          width={256}
          height={100}
          className="footerLogo"
        />
      );
    case "links":
      return (
        <div className="columns-2 md:columns-2 text-xs whitespace-nowrap">
          {(field.value as { text: string; url: string }[]).map(
            (link, index) => (
              <FooterLink key={index} {...link} />
            )
          )}
        </div>
      );
    default:
      return null;
  }
};

const BoatImage = ({ url }: { url: string }) => {
  console.log(url);
  return (
    <div className="absolute -top-[180px] left-5 lg:left-20 bottom-4 z-[3] w-[14.1875rem] h-[24.625rem] overflow-hidden hidden md:hidden 4xl:block">
      <Image
        src={url ?? "/"}
        alt="Footer decoration"
        className="object-cover w-full h-full"
        height={227}
        width={394}
      />
    </div>
  );
};

const DynamicFooter = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const { data: footerContent } = useQuery({
    queryKey: ["footer-data"],
    queryFn: fetchFooterContent,
  });

  const getFieldByLabel = (label: string) =>
    Object.values(footerContent?.content ?? {}).find(
      (field) => field.label.toLowerCase() === label.toLowerCase()
    );

  const logoField = getFieldByLabel("Logo");
  const backgroundField = getFieldByLabel("Background Image");
  const boatField = getFieldByLabel("boat");

  return (
    <footer
      className="relative text-white"
      style={{
        background: "linear-gradient(90deg,#072f6cc9 0%,#072f6cc9 100%)",
        padding: "30px 0",
      }}
    >
      <div className="absolute inset-0 z-[-1]">
        <Image
          src={backgroundField?.value || "/images/footer-bg.jpg"}
          alt="Footer Background"
          objectFit="cover"
          className="opacity-50"
          loading="lazy"
          sizes="100vw"
          width={1920}
          height={1080}
        />
      </div>

      <div className="container mx-auto w-full max-w-[1630px] px-[15px] md:flex md:justify-center gap-8">
        <div className="">
          {logoField && (
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <FooterField field={logoField} />
            </Link>
          )}

          {Object.values(footerContent?.content ?? {}).map(
            (field) =>
              !EXCLUDED_LABELS.includes(field.label) &&
              field.type !== "links" && (
                <div key={field.label} className="address">
                  <h5 className="text-xl font-bold mb-2">{field.label}</h5>
                  <FooterField field={field} />
                </div>
              )
          )}
        </div>

        <div className="flex-1 flex flex-col justify-end">
          {/* {Object.values(footerContent?.content ?? {})
            .filter((field) => field.type === "links")
            .map((field, index) => (
              <div key={index}>
                <FooterField field={field} />
              </div>
            ))} */}
          <SocialMediaItems />
          <Separator className="my-4 bg-[#ffffff] bg-opacity-25" />
          <div className="text-start">
            <p>
              {getFieldByLabel("Copyright")
                ?.value.toString()
                .replace("{year}", currentYear.toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DynamicFooter;

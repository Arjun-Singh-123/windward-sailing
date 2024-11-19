import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  return (
    <>
      <div className="pt-40"></div>
      <header className="relative w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" pl-10 flex h-20 items-center justify-between">
          <div className="  flex items-center gap-2 rounded-md border p-10">
            <Link className="flex items-center space-x-2" href="#">
              <span className="text-xl font-bold">LAILANI BEAUTY</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:underline" href="#">
              OVER ONS
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              BEHANDELINGEN
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              REVIEWS
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              PRODUCTEN
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              FAQ
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              CONTACT
            </Link>
          </nav>

          <div className=" pr-10 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border p-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+31 123 456 789</span>
            </div>
            <Button className="hidden md:inline-flex">AFSPRAAK PLANNEN</Button>
          </div>
        </div>
      </header>
    </>
  );
}

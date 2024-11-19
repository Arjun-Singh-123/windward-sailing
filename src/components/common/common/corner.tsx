import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Component() {
  return (
    <div className="p-4">
      <Card className="w-[300px] relative border-t-4 border-t-green-500">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Profile picture"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>
        <div className="pt-16 p-4">
          <h2 className="text-xl font-bold text-center text-blue-500">
            Randy Treas
          </h2>
          <p className="text-sm text-center">
            <span className="text-gray-600">CEO/</span>
            <span className="text-orange-500">ADMIN</span>
            <span className="text-blue-500">ISTRATOR</span>
          </p>
          <p className="text-sm text-gray-600 mt-4">
            About: With a distinguished career spanning over two decades in the
            world of premium cigars and luxury lifestyle, Randy Treas stands as
            the visionary leader steering the Eldorado Cigar Club to
            unparalleled heights. His dynamic approach to business and a
            deep-seated passion for cigars have not only propelled the club's
            success but have also left an indelible mark on the industry.
          </p>
          <div className="mt-4 text-sm">
            <p>📧 Email: randyt@kgusa.com</p>
            <p>📞 Phone: 413-822-9996</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

import Image from "next/image";

export default function Heroo() {
  return (
    // <section className="relative w-full mt-24">
    //   <Image
    //     src="/images/hero-image.jpg?height=800&width=1600"
    //     alt="Hero Image"
    //     width={1600}
    //     height={800}
    //     priority
    //     className="w-full h-[12.5rem] sm:h-[18.75rem] md:h-[25rem] lg:h-[31.25rem] xl:h-[37.5rem] object-cover"
    //   />
    // </section>

    <section className="relative w-full   ">
      <Image
        src="/images/hero-image.jpg?height=800&width=1600"
        alt="Hero Image"
        width={1600}
        height={800}
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]  "
      />
    </section>
  );
}

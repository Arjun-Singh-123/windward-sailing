import Image from "next/image";

export default function Page() {
  return (
    <div className=" ">
      <Image
        alt="demo image"
        fill
        src="/images/about.jpg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

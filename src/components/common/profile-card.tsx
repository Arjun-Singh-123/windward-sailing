import Image from "next/image";

interface ProfileCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  email: string;
  phone: string;
  borderColor: string;
}

export default function ProfileCard({
  name,
  role,
  description,
  imageUrl,
  email,
  phone,
  borderColor,
}: ProfileCardProps) {
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className={`relative w-full h-48 ${borderColor}`}>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
          <Image
            src={imageUrl}
            alt={name || "default"}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="pt-16 pb-8 px-5 text-sky text-center">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 uppercase">{role}</p>
        <p className="mt-4 text-gray-600">{description}</p>
        <div className="mt-6 flex flex-col items-center">
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
            {email}
          </a>
          <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}

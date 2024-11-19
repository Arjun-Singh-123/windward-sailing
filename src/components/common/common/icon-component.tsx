import {
  Phone,
  Clock,
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function IconComponent({
  icon,
  className,
}: {
  icon: string | null;
  className?: string;
}) {
  const props = { className: className || "w-10 h-10" };

  switch (icon) {
    case "phone":
      return <Phone {...props} />;
    case "clock":
      return <Clock {...props} />;
    case "map-pin":
      return <MapPin {...props} />;
    case "email":
      return <Mail {...props} />;
    case "facebook":
      return <Facebook {...props} />;
    case "twitter":
      return <Twitter {...props} />;
    case "instagram":
      return <Instagram {...props} />;
    default:
      return null;
  }
}

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefitsData: Benefit[];
}

export default function BenefitsSection({
  benefitsData,
}: BenefitsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">What You Get</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 space-y-4">
          {benefitsData.map((benefit, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0 text-3xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="md:w-1/3 relative">
          <div className="sticky top-8">
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt="Benefits"
              width={400}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
      {isVisible && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  { id: 1, text: "Great product!", author: "John Doe" },
  { id: 2, text: "Awesome service!", author: "Jane Smith" },
  { id: 3, text: "Highly recommended!", author: "Bob Johnson" },
  { id: 4, text: "Best purchase ever!", author: "Alice Brown" },
  { id: 5, text: "Excellent quality!", author: "Charlie Davis" },
];

export default function Component() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div
          className="relative overflow-hidden"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div
                  className={`bg-white p-6 rounded-lg shadow-md ${
                    testimonial.id === activeIndex + 1
                      ? "border-4 border-blue-500"
                      : ""
                  }`}
                >
                  <p className="text-lg mb-4">{testimonial.text}</p>
                  <p className="font-semibold">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === activeIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

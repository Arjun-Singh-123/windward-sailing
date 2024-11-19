import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Awesome Heading Here
          </h1>
          <p className="mb-6 max-w-2xl text-lg text-gray-600">
            A brief description of your product or service goes here. Keep it
            concise and impactful.
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg">Get Started</Button>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-yellow-400"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="flex flex-col justify-between">
                <CardContent className="p-6">
                  <h2 className="mb-2 text-xl font-semibold">
                    Card Title {i + 1}
                  </h2>
                  <p className="text-gray-600">
                    This is a brief description of the card content. It can be
                    multiple lines long without affecting the overall layout.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

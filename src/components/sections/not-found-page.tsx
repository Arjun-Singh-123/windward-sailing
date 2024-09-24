import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundNew() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-200 transform -skew-y-3"></div>
          <Link href="/" passHref>
            <Button
              variant="default"
              size="lg"
              className="relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Return Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <svg
          className="w-64 h-64 text-blue-300 opacity-50"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2 1 21z" />
        </svg>
      </div>
    </div>
  );
}

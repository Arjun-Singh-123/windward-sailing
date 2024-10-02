import { Inter, Lusitana, Roboto, Prata } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});
import { Great_Vibes } from "next/font/google";

export const cursiveHeadingFont = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
// Importing fonts
export const contentFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify weights as needed
});    

export const mainHeadingFont = Prata({
  subsets: ["latin"],
  weight: ["400"],
});
      
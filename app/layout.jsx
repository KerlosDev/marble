import { Inter, Rubik } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin", "arabic"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata = {
  title: "El Fares | Luxury Marble ",
  description: "Luxurious marble and granite products for your home and business",
  keywords: "marble, granite, luxury, stone, countertops, slabs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${rubik.variable} antialiased`}>

        <Toaster position="top-center" toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#C8A96A',
              secondary: '#fff',
            },
          },
        }} />
        <Navbar />

        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}

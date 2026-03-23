import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartOverlay from "@/components/ui/CartOverlay";

export const metadata = {
    title: "Dropship Style | Modern Fashion",
    description: "The latest trending fashion delivered straight to you.",
};

export default function RootLayout({ children }) {
    return (
          <html lang="en">
            <body className="antialiased font-sans">
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <CartOverlay />
                  <main className="flex-grow">
    {children}
      </main>
              <Footer />
      </div>
      </CartProvider>
      </body>
      </html>
    );
}

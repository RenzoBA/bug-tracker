import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Comfortaa } from "@next/font/google";
import Header from "@/components/Header";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`text-white bg-gradient-to-b from-primary to-secondary ${comfortaa.className}`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <div id="modal"></div>
      </body>
    </html>
  );
}

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
        className={`text-white bg-gradient-to-b from-primary to-secondary bg-secondary bg-no-repeat ${comfortaa.className} scrollbar-thin scrollbar-thumb-decoration scrollbar-track-white/10`}
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

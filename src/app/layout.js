import "./globals.css";
import Navigation from "@/components/Navigation";
import PlaylistNavigation from "@/components/PlaylistNavigation";

export const metadata = {
  title: "Jun Liang | Personal Website",
  description: "Personal portfolio of Jun Liang showcasing projects, journey, and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-[#1D1515]">
        {/* Global Background Gradient */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#1D1515] via-[#342020] to-[#1D1515] pointer-events-none"></div>
        
        {/* Navigation Layer */}
        <Navigation />
        
        {/* Content Layer */}
        <main className="relative z-10 w-full min-h-screen">
          {children}
        </main>
        
        {/* Site-wide Playlist Navigation (Replaces Rotating Dial) */}
        <PlaylistNavigation />
      </body>
    </html>
  );
}

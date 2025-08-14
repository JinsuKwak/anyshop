import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col theme-container">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

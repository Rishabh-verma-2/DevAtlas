import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import LiveStatsBar from "@/components/landing/LiveStatsBar";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import DeveloperShowcase from "@/components/landing/DeveloperShowcase";
import MapPreview from "@/components/landing/MapPreview";
import CtaSection from "@/components/landing/CtaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LiveStatsBar />
      <FeaturesSection />
      <HowItWorks />
      <DeveloperShowcase />
      <MapPreview />
      <CtaSection />
      <Footer />
    </main>
  );
}

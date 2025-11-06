import { Hero } from "@/components/landing/Hero";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { Pricing } from "@/components/landing/Pricing";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export default function Landing() {
  return (
    <div className="h-screen overflow-hidden">
      <Hero />
      <ChatWidget />
    </div>
  );
}

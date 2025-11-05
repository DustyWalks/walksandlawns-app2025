import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import summerHero from "@assets/generated_images/Summer_lawn_maintenance_hero_8c4ea29c.png";
import winterHero from "@assets/generated_images/Winter_snow_removal_hero_6befa098.png";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentSeason, setCurrentSeason] = useState<"summer" | "winter">("summer");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeason(prev => prev === "summer" ? "winter" : "summer");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Dark Wash */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img
            src={currentSeason === "summer" ? summerHero : winterHero}
            alt="Well-maintained property"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          {/* Dark gradient wash for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-semibold text-primary-foreground">Trusted by 500+ Edmonton Homeowners</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Year-Round Property Care,{" "}
            <span className="text-primary-foreground">One Simple Subscription</span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
            Just <span className="font-bold text-white">$188/month</span> covers everything: snow removal in winter, weekly lawn mowing in summer, plus spring and fall cleanups. No contracts, fully automated.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              variant="default"
              onClick={scrollToPricing}
              className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-shadow"
              data-testid="button-hero-cta"
            >
              Start Your Subscription
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6 backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20"
              data-testid="button-learn-more"
            >
              How It Works
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
              <span>No Long-Term Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
              <span>Automated Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
              <span>Local Edmonton Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, LogIn } from "lucide-react";
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

  const handleSubscribe = () => {
    window.location.href = "/api/login";
  };

  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Background Image with Dark Wash */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img
            src={currentSeason === "summer" ? summerHero : winterHero}
            alt="Well-maintained property"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          {/* Dark gradient wash for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
        </div>
      </div>

      {/* Header Bar */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Walks & Lawns</h2>
              <span className="hidden sm:inline-block text-sm text-white/70 border-l border-white/30 pl-3">West Edmonton</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignIn}
              className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2"
              data-testid="button-sign-in"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <CheckCircle className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground">Trusted by 500+ West Edmonton Homeowners</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
              Year-Round Property Care,<br />
              <span className="text-primary-foreground">One Simple Subscription</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 leading-relaxed font-light">
              <span className="font-bold text-white">$188/month</span> covers everything:<br />
              <span className="text-lg sm:text-xl text-white/90">Snow removal • Weekly lawn care • Seasonal cleanups</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                variant="default"
                onClick={handleSubscribe}
                className="text-lg px-10 py-7 shadow-2xl hover:shadow-3xl transition-all text-base sm:text-lg font-semibold min-w-[240px]"
                data-testid="button-hero-cta"
              >
                Start Your Subscription
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="text-lg px-10 py-7 backdrop-blur-md bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 transition-all font-semibold min-w-[240px]"
                data-testid="button-learn-more"
              >
                How It Works
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center text-white/90 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-foreground flex-shrink-0" />
                <span>No Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-foreground flex-shrink-0" />
                <span>AI Automated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary-foreground flex-shrink-0" />
                <span>Local West Edmonton</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

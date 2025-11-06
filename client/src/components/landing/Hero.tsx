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

  const handleLearnMore = () => {
    const chatButton = document.querySelector('[data-testid="button-chat-open"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
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
              <span className="hidden sm:inline">Member Access</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-4">
              <CheckCircle className="w-4 h-4 text-primary-foreground" />
              <span className="text-xs sm:text-sm font-semibold text-primary-foreground">Trusted by 120+ West Edmonton Homeowners</span>
            </div>

            {/* Hero Headline - TWO WORDS */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-5 leading-none tracking-tight">
              Never<br />
              <span className="text-primary-foreground">Again</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 leading-tight font-light max-w-3xl mx-auto">
              Hate shoveling snow? Hate mowing lawns?<br />
              <span className="font-semibold text-white">Your Freedom Subscription permanently removes<br className="hidden sm:block" /> property maintenance from your life.</span>
            </p>
            
            {/* Pricing */}
            <div className="mb-5">
              <div className="text-xl sm:text-2xl text-white mb-2 font-light">
                <span className="font-bold">$188/month</span> • Set it and forget it
              </div>
              <p className="text-xs sm:text-sm text-white/75 italic max-w-xl mx-auto">
                We charge by the month of freedom. Our price is fixed—your time is not.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
              <Button
                size="lg"
                variant="default"
                onClick={handleSubscribe}
                className="text-base sm:text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all font-semibold min-w-[220px]"
                data-testid="button-hero-cta"
              >
                Claim Your Spot
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleLearnMore}
                className="text-base sm:text-lg px-8 py-6 backdrop-blur-md bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 transition-all font-semibold min-w-[220px]"
                data-testid="button-learn-more"
              >
                Ask Me Anything
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-3 sm:gap-5 justify-center text-white/90 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-foreground flex-shrink-0" />
                <span>No Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-foreground flex-shrink-0" />
                <span>AI Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary-foreground flex-shrink-0" />
                <span>West Edmonton</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

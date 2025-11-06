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
    // Redirect to Stripe Payment Link
    // The Payment Link should be configured in Stripe Dashboard to redirect to Customer Portal after payment
    const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;
    if (paymentLink) {
      window.location.href = paymentLink;
    } else {
      // Fallback to login flow if payment link not configured
      console.warn("VITE_STRIPE_PAYMENT_LINK not configured. Using login flow.");
      window.location.href = "/api/login";
    }
  };

  const handleSignIn = () => {
    // Sign in takes authenticated users to the Customer Portal
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
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Myground.ca</h2>
              <span className="text-xs sm:text-sm text-white/70 border-l border-white/30 pl-2 sm:pl-3">West Edmonton</span>
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
              <span className="text-xs sm:text-sm font-medium text-primary-foreground tracking-wide">Trusted by 120+ West Edmonton Homeowners</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin text-white mb-2 leading-none tracking-tight">
              Your Forecast:
            </h1>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary-foreground mb-5 leading-none tracking-tighter border-b-4 border-primary-foreground/30 inline-block pb-2">
              ZERO SHOVELING
            </h2>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white mb-6 leading-tight">
              <span className="font-extralight italic">Snow is Inevitable.</span><br />
              <span className="font-bold">Shoveling is Not.</span>
            </p>
            
            {/* Pricing */}
            <div className="mb-5">
              <div className="text-xl sm:text-2xl md:text-3xl text-white mb-1">
                <span className="font-black">$188</span><span className="font-light text-lg sm:text-xl">/month</span>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light tracking-wide">
                Set it and forget it
              </p>
              <p className="text-xs text-white/60 italic mt-1 font-light">
                Our price is fixed—your time is not.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
              <Button
                size="lg"
                variant="default"
                onClick={handleSubscribe}
                className="text-base sm:text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all font-semibold min-w-[260px]"
                data-testid="button-hero-cta"
              >
                Never Shovel Again Guaranteed
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSignIn}
                className="text-base sm:text-lg px-8 py-6 backdrop-blur-md bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 transition-all font-semibold min-w-[220px]"
                data-testid="button-sign-in-secondary"
              >
                Sign In
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

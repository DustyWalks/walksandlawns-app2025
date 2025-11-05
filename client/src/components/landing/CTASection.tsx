import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const handleGetStarted = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Ready for Hassle-Free Property Maintenance?
        </h2>
        <p className="text-xl sm:text-2xl mb-8 opacity-90">
          Join hundreds of Edmonton homeowners enjoying automated, year-round care
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={handleGetStarted}
            className="text-lg px-8 py-6"
            data-testid="button-cta-subscribe"
          >
            Start Your Subscription
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDashboard}
            className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            data-testid="button-cta-dashboard"
          >
            Access Dashboard
          </Button>
        </div>

        <p className="text-sm mt-6 opacity-75">
          No long-term contracts • Cancel anytime • Local Edmonton service
        </p>
      </div>
    </section>
  );
}

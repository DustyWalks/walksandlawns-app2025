import { CreditCard, Bot, Wrench, LayoutDashboard } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: CreditCard,
    title: "Subscribe Online",
    description: "Choose your plan and sign up in minutes with secure Stripe checkout",
  },
  {
    number: 2,
    icon: Bot,
    title: "AI Confirms & Schedules",
    description: "Our AI assistant automatically schedules services based on weather and your preferences",
  },
  {
    number: 3,
    icon: Wrench,
    title: "Automated Service Delivery",
    description: "Our local Edmonton team handles everything on schedule—no reminders needed",
  },
  {
    number: 4,
    icon: LayoutDashboard,
    title: "Manage via Dashboard",
    description: "Track services, view history, and chat with AI support anytime through your dashboard",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-background" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            From signup to service delivery, everything is automated for your convenience
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="text-center" data-testid={`step-${step.number}`}>
                  <div className="relative inline-flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 relative z-10 border-4 border-background shadow-lg">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-foreground border-2 border-primary flex items-center justify-center font-bold text-sm text-primary z-20">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex gap-6" data-testid={`step-mobile-${step.number}`}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-foreground border-2 border-primary flex items-center justify-center font-bold text-xs text-primary">
                      {step.number}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-24 bg-border mt-4" />
                  )}
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";

const baseSubscription = {
  price: 188,
  features: [
    "Unlimited snow removal all winter",
    "Weekly lawn mowing all summer",
    "Spring cleanup service",
    "Fall cleanup service",
    "Automated scheduling",
    "AI customer support 24/7",
    "No long-term contracts",
  ],
};

const addOns = [
  {
    id: "premium-snow",
    name: "Premium Snow Removal",
    monthly: 49,
    oneTime: null,
    description: "Priority service + salt/sand application",
  },
  {
    id: "aeration",
    name: "Lawn Aeration",
    monthly: null,
    oneTime: 89,
    description: "Seasonal core aeration for healthier grass",
  },
  {
    id: "fertilization",
    name: "Fertilization Program",
    monthly: 39,
    oneTime: null,
    description: "4-step seasonal fertilization plan",
  },
  {
    id: "extra-lawn",
    name: "Additional Lawn/Walk",
    monthly: 69,
    oneTime: null,
    description: "Add coverage for extra property areas",
  },
];

export function Pricing() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleSubscribe = () => {
    window.location.href = "/api/login";
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            One monthly subscription covers all your year-round property needs
          </p>
        </div>

        {/* Main Subscription */}
        <Card className="max-w-2xl mx-auto mb-12 border-2 border-primary shadow-lg">
          <CardHeader className="text-center pb-8 pt-8">
            <Badge className="mx-auto mb-4 text-sm px-4 py-1">Best Value</Badge>
            <CardTitle className="text-3xl sm:text-4xl font-bold mb-2">
              Year-Round Subscription
            </CardTitle>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl sm:text-6xl font-bold text-primary">
                ${baseSubscription.price}
              </span>
              <span className="text-2xl text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <ul className="space-y-4 mb-8">
              {baseSubscription.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-card-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="w-full text-lg py-6"
              onClick={handleSubscribe}
              data-testid="button-subscribe-main"
            >
              Start Your Subscription
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Cancel anytime. No hidden fees.
            </p>
          </CardContent>
        </Card>

        {/* Add-ons */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Optional Add-Ons
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {addOns.map((addon) => (
              <Card
                key={addon.id}
                className={`hover-elevate cursor-pointer transition-all ${
                  selectedAddOns.includes(addon.id) ? "border-2 border-primary" : ""
                }`}
                onClick={() => toggleAddOn(addon.id)}
                data-testid={`card-addon-${addon.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg leading-tight">{addon.name}</h4>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAddOns.includes(addon.id) ? "bg-primary border-primary" : "border-input"
                    }`}>
                      {selectedAddOns.includes(addon.id) && (
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {addon.description}
                  </p>

                  <div className="text-lg font-bold text-primary">
                    {addon.monthly ? (
                      <div>
                        <span className="text-2xl">${addon.monthly}</span>
                        <span className="text-sm text-muted-foreground">/month</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-2xl">${addon.oneTime}</span>
                        <span className="text-sm text-muted-foreground"> one-time</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedAddOns.length > 0 && (
            <div className="mt-8 p-6 bg-card rounded-lg border-2 border-primary/50">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selected add-ons</p>
                  <p className="text-2xl font-bold">
                    {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? "s" : ""} selected
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleSubscribe}
                  data-testid="button-subscribe-with-addons"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Subscribe with Add-ons
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

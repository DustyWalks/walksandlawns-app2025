import { Card, CardContent } from "@/components/ui/card";
import { Snowflake, Leaf, Calendar } from "lucide-react";

const services = [
  {
    icon: Snowflake,
    title: "Winter Snow Removal",
    description: "Automated snow clearing for driveways and walkways after every snowfall. Never shovel again.",
    benefits: ["24/7 monitoring", "Quick response times", "Safe, ice-free paths"],
  },
  {
    icon: Leaf,
    title: "Summer Lawn Care",
    description: "Weekly professional mowing, edging, and trimming to keep your lawn pristine all season.",
    benefits: ["Weekly service", "Perfect stripe patterns", "Healthy lawn maintenance"],
  },
  {
    icon: Calendar,
    title: "Seasonal Cleanups",
    description: "Spring and fall yard cleanups including leaf removal, debris clearing, and preparation.",
    benefits: ["Spring preparation", "Fall leaf removal", "Year-round readiness"],
  },
];

export function ValueProposition() {
  return (
    <section className="py-16 lg:py-24 bg-background" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Complete Property Care, Every Season
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            One subscription handles everything your property needs throughout the year
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="hover-elevate transition-all duration-300 border-2"
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold text-card-foreground mb-3">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-card-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

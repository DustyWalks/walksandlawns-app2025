import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import beforeAfter from "@assets/generated_images/Lawn_transformation_before_after_229d1971.png";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Mill Woods",
    rating: 5,
    text: "Best decision ever! No more worrying about snow removal or lawn care. The team is professional and the AI scheduling is genius.",
    service: "Full Subscription",
  },
  {
    name: "James T.",
    location: "Summerside",
    rating: 5,
    text: "Amazing value for $188/month. My lawn has never looked better, and I haven't touched a shovel all winter. Highly recommend!",
    service: "Base + Fertilization",
  },
  {
    name: "Maria G.",
    location: "Windermere",
    rating: 5,
    text: "The automated service is incredible. They show up exactly when needed, and the quality is consistently excellent. Worth every penny.",
    service: "Full Subscription",
  },
  {
    name: "David K.",
    location: "Griesbach",
    rating: 5,
    text: "Finally, a maintenance service that just works. The dashboard makes it easy to track everything, and customer support is always helpful.",
    service: "Base + Premium Snow",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Edmonton Homeowners
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied customers enjoying hassle-free property maintenance
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-elevate" data-testid={`testimonial-${index}`}>
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-lg text-card-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Package:</p>
                    <p className="text-sm font-semibold text-foreground">{testimonial.service}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Before/After Showcase */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            See the Difference
          </h3>
          <Card className="overflow-hidden border-2">
            <img
              src={beforeAfter}
              alt="Before and after lawn transformation"
              className="w-full h-auto"
            />
          </Card>
          <p className="text-center text-muted-foreground mt-4">
            Professional results, every time
          </p>
        </div>
      </div>
    </section>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's included in the $188/month subscription?",
    answer: "Your subscription includes unlimited snow removal throughout winter, weekly lawn mowing all summer long, plus complete spring and fall cleanup services. We also provide automated scheduling, 24/7 AI customer support, and a personal dashboard to manage everything.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No! We believe in earning your trust month by month. You can cancel your subscription anytime with no penalties or hidden fees. Most customers stay with us because they love the convenience and quality.",
  },
  {
    question: "How does the automated scheduling work?",
    answer: "Our AI system monitors weather conditions and your property needs to automatically schedule services. For snow removal, we respond to every snowfall. For lawn care, we schedule weekly visits during growing season. You'll get notifications before each service.",
  },
  {
    question: "What areas of Edmonton do you serve?",
    answer: "We currently serve most Edmonton neighborhoods including Mill Woods, Summerside, Windermere, Griesbach, and surrounding areas. Enter your address during signup to confirm service availability in your area.",
  },
  {
    question: "Can I add services later?",
    answer: "Absolutely! You can add or remove optional add-ons like premium snow removal, fertilization, or aeration anytime through your dashboard. Changes take effect immediately, and billing is prorated.",
  },
  {
    question: "What if I'm not satisfied with a service?",
    answer: "We stand behind our work. If you're not happy with any service, contact us through the AI chatbot or your dashboard within 24 hours, and we'll come back to make it right at no charge.",
  },
  {
    question: "How do payments work?",
    answer: "We use Stripe for secure monthly billing. Your card is charged automatically on the same day each month. You can view invoices and update payment methods anytime in your dashboard.",
  },
  {
    question: "Do I need to be home for services?",
    answer: "Not at all! Our team works independently and doesn't require you to be home. You'll receive notifications when services are scheduled and completed, with before/after updates available in your dashboard.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Everything you need to know about your subscription
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-2 border-border rounded-lg px-6 data-[state=open]:border-primary"
              data-testid={`faq-${index}`}
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

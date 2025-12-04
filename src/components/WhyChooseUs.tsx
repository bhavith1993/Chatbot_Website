import { Award, Clock, Shield, Users } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Award,
      title: "Expertise, Not Headcount",
      description:
        "You don't need to hire analysts, BI developers, or automation engineers. Our team brings senior-level accounting, FP&A, Power BI, and Alteryx expertise—without the long-term cost.",
    },
    {
      icon: Clock,
      title: "Rapid Deployment",
      description:
        "Most projects go live in 2–6 weeks, not months.",
    },
    {
      icon: Users,
      title: "Built for Finance, Not IT",
      description:
        "We speak the language of CFOs, Controllers, and FP&A. Our solutions reflect real financial logic—not tech jargon.",
    },
    {
      icon: Shield,
      title: "Sustainable, Scalable, Reliable",
      description:
        "Every workflow and report is designed to run automatically every period, with minimal maintenance.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Clients <span className="bg-gradient-hero bg-clip-text text-transparent">Choose Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our goal is to save you time and money using light automation tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-muted/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hero mb-4 shadow-elegant">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

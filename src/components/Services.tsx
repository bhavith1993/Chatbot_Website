import { Card } from "@/components/ui/card";
import powerbiIcon from "@/assets/powerbi-icon.jpg";
import alteryxIcon from "@/assets/alteryx-icon.jpg";
import financeIcon from "@/assets/finance-icon.jpg";
import { ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Power BI Analytic Automation",
      description:
        "Custom dashboards, data modeling, and report automation tailored for financial analysis and reporting.",
      icon: powerbiIcon,
      features: [
        "Interactive Executive Dashboards",
        "Budget and Forecast vs. Actuals Analytics",
        "Operational Performance",
        "KPI Dashboards",
      ],
    },
    {
      title: "Alteryx Consulting",
      description:
        "Streamline your data preparation and analytics workflows with powerful automation solutions.",
      icon: alteryxIcon,
      features: [
        "Workflow Automation",
        "Data Blending & Prep",
        "Predictive Analytics",
        "Process Optimization",
      ],
    },
    {
      title: "Finance Automation Readiness Check",
      description:
        "Examine your existing process to determine potential gaps and recommend sustainable solutions to support your organization's growth.",
      icon: financeIcon,
      features: [
        "Roadmap Development",
        "Surveying your finance teams",
        "Process Map Development [Current vs. Future]",
        "Recommend Sustainable Solution",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-hero bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analytics solutions designed specifically for finance professionals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 bg-gradient-card hover:shadow-hover transition-all duration-300 border-border group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 object-cover rounded-lg shadow-elegant"
                />
              </div>

              <h3 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href="#contact"
                className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

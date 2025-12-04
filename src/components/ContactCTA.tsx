import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Financial Analytics?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let's discuss how we can help you unlock insights from your data and drive better
            business decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-hover"
              asChild
            >
              <a href="mailto:contact@datavision.com">
                <Calendar className="mr-2" />
                Schedule Consultation
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <a href="mailto:contact@datavision.com">
                <Mail className="mr-2" />
                Email Us
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm text-white/80">Call Us</div>
                <div className="font-semibold">+1 (555) 123-4567</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm text-white/80">Email Us</div>
                <div className="font-semibold">contact@datavision.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

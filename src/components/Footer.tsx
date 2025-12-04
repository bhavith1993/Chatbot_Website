import { Linkedin, Twitter, Mail } from "lucide-react";
import rivanoeLogoImg from "@/assets/rivanoe-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img 
                src={rivanoeLogoImg} 
                alt="Rivanoe Analytics" 
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-background/80 text-sm">
              Expert Power BI and Alteryx consulting for finance professionals.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#services" className="hover:text-background transition-colors">
                  Power BI Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-background transition-colors">
                  Alteryx Consulting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-background transition-colors">
                  Finance Analytics
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#why-us" className="hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              {/* Email - Hidden for now, will be added back later */}
              {/* <a
                href="mailto:contact@datavision.com"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>© 2025 Rivanoe Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

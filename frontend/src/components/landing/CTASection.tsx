import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyan farmers who are already growing smarter and selling better. 
            Get started for free today—no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-elevated hover:scale-105 transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Contact Sales
            </Button>
          </div>

          {/* Trust badge */}
          <p className="mt-8 text-sm text-primary-foreground/60">
            ✓ Free to start &nbsp;&nbsp; ✓ No smartphone required &nbsp;&nbsp; ✓ Works offline via SMS
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

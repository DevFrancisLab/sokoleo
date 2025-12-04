import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-light px-4 py-2 rounded-full mb-6 animate-fade-up">
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
              Grow Smarter,{" "}
              <span className="text-gradient-primary">Sell Better</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up-delayed">
              Empowering Kenyan tomato farmers with Smart market predictions. 
              Reduce wastage, maximize profits, and connect with the right buyers at the right time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up-delayed">
              <Button variant="hero" size="xl">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">Trusted by farmers across Kenya</p>
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start items-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2,500+</p>
                  <p className="text-sm text-muted-foreground">Farmers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">40%</p>
                  <p className="text-sm text-muted-foreground">Less Wastage</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">Counties</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated h-64 sm:h-80 md:h-96 lg:h-[36rem] max-w-full">
              <img
                src="/happy farmers.jpeg"
                alt="Happy Kenyan farmers holding fresh tomatoes in a lush green field"
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            
            {/* Another floating element */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

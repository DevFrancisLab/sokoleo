import { Smartphone, Brain, Wallet } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Register Your Farm",
    description: "Sign up in minutes with just your phone number. Tell us about your farm location and tomato varieties.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes Markets",
    description: "Our AI continuously monitors market prices, weather, and demand patterns across Kenya to find opportunities.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Sell at the Best Time",
    description: "Receive personalized alerts on when and where to sell for maximum profit. Reduce waste, increase earnings.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-green-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary bg-card px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Start in <span className="text-gradient-primary">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No complicated setup. No expensive equipment. Just practical insights delivered straight to your phone.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Card */}
                <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 text-center">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-glow-primary">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-green-light rounded-2xl flex items-center justify-center mx-auto mt-4 mb-6">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector - mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

import { UserPlus, Smartphone, TrendingUp, DollarSign } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up Free",
    description: "Register with just your phone number. No app download needed—works via SMS or USSD.",
  },
  {
    icon: Smartphone,
    step: "02",
    title: "Tell Us About Your Farm",
    description: "Share basic info about your location and tomato production capacity.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Get AI Insights",
    description: "Receive personalized market forecasts and recommendations via SMS or voice.",
  },
  {
    icon: DollarSign,
    step: "04",
    title: "Sell Smarter",
    description: "Use insights to sell at the right time, in the right place, for the best price.",
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
            Start Selling Smarter in <span className="text-gradient-primary">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No complicated setup. No expensive equipment. Just practical insights delivered straight to your phone.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line (desktop only) */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center"
            >
              {/* Step number badge */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-full bg-card border-2 border-primary/20 shadow-card flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

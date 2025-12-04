import { TrendingUp, MapPin, Bell, BarChart3 } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Market Demand Forecast",
    description: "AI predicts market trends up to 2 weeks ahead, helping you plan your harvest and sales strategy.",
    color: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "Surplus Prediction",
    description: "Know when your region will have surplus tomatoes and adjust your selling approach to stay competitive.",
    color: "bg-secondary",
  },
  {
    icon: MapPin,
    title: "Best Selling Locations",
    description: "Discover which markets offer the best prices for your produce based on real-time demand data.",
    color: "bg-accent",
  },
  {
    icon: Bell,
    title: "SMS & Voice Alerts",
    description: "Receive timely notifications via SMS or voice call—no smartphone needed. Stay informed anywhere.",
    color: "bg-primary",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary bg-green-light px-4 py-1.5 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform provides the tools and insights small-scale farmers need to thrive in competitive markets.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

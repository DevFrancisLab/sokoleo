import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mary Wanjiku",
    location: "Kiambu County",
    avatar: "MW",
    rating: 5,
    text: "Before using this app, I would lose 30% of my tomatoes to spoilage. Now I know exactly when to harvest and where to sell. My income has doubled!",
  },
  {
    name: "John Ochieng",
    location: "Nakuru County",
    avatar: "JO",
    rating: 5,
    text: "The SMS alerts are perfect. I don't have a smartphone, but I still get all the market information I need. It's like having a market expert in my pocket.",
  },
  {
    name: "Grace Muthoni",
    location: "Meru County",
    avatar: "GM",
    rating: 5,
    text: "I was skeptical at first, but the predictions are incredibly accurate. Last month, I avoided a market glut and sold my produce at premium prices.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary bg-green-light px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by <span className="text-gradient-primary">Farmers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from the farmers who are already transforming their businesses with our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-card transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

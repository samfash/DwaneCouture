import { Card } from "@/src/components/ui/card";
import { Star, Quote, Scissors } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Margaret Thompson",
      role: "Executive Director",
      company: "Thompson & Associates",
      content: "Absolutely exceptional craftsmanship! My bespoke suit fits like a dream and the attention to detail is remarkable. The vintage-inspired styling is exactly what I was looking for.",
      rating: 5,
      location: "London"
    },
    {
      name: "James Richardson",
      role: "Wedding Groom",
      company: "Recent Client",
      content: "For our wedding, we needed something truly special. The team created the most beautiful vintage-inspired wedding attire. My bride and I felt like royalty on our special day.",
      rating: 5,
      location: "Manchester"
    },
    {
      name: "Sarah Williams",
      role: "Interior Designer",
      company: "Williams Design Studio",
      content: "The custom curtains and drapes transformed our client's home completely. The heritage craftsmanship and attention to vintage details exceeded all expectations.",
      rating: 5,
      location: "Edinburgh"
    },
    {
      name: "David Chen",
      role: "Business Owner",
      company: "Chen Enterprises",
      content: "I've been a loyal customer for over 5 years. Their alterations service is unmatched, and the express service has saved me countless times for important meetings.",
      rating: 5,
      location: "Birmingham"
    },
    {
      name: "Emily Foster",
      role: "Bride",
      company: "Recent Client",
      content: "My wedding dress was everything I dreamed of and more. The vintage-inspired design with modern comfort was perfect. I felt absolutely radiant on my wedding day.",
      rating: 5,
      location: "Bristol"
    },
    {
      name: "Robert Miller",
      role: "Lawyer",
      company: "Miller & Partners",
      content: "Professional, punctual, and absolutely perfect. The bespoke suits I've ordered have become my signature look in the courtroom. Highly recommend their services.",
      rating: 5,
      location: "Leeds"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gold-light px-4 py-2 rounded-full mb-4">
            <Scissors className="h-4 w-4 text-gold" />
            <span className="text-sm font-inter font-medium text-warm-brown">Client Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Discover why discerning clients choose our heritage craftsmanship for their most important occasions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border-0 shadow-soft"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-12 w-12 text-gold" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-muted-foreground font-inter leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-playfair font-semibold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </p>
                    <p className="text-gold text-xs font-medium">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-playfair font-bold text-primary">500+</div>
            <p className="text-muted-foreground font-inter text-sm">Happy Clients</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-playfair font-bold text-primary">4.9</div>
            <p className="text-muted-foreground font-inter text-sm">Average Rating</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-playfair font-bold text-primary">98%</div>
            <p className="text-muted-foreground font-inter text-sm">Return Clients</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-playfair font-bold text-primary">8+</div>
            <p className="text-muted-foreground font-inter text-sm">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
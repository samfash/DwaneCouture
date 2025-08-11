import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Scissors, Zap, Crown, Heart, Home, Palette } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Crown,
      title: "Men's Bespoke",
      description: "Classic and contemporary suits, shirts, and formal wear crafted with vintage techniques.",
      features: ["Personal consultation", "Classic fabrics", "Multiple fittings", "Traditional craftsmanship"],
      price: "From $899",
      popular: true
    },
    {
      icon: Palette,
      title: "Women's Couture",
      description: "Elegant dresses, blouses, and tailored pieces designed with vintage feminine charm.",
      features: ["Custom patterns", "Vintage-inspired styles", "Premium materials", "Perfect silhouettes"],
      price: "From $649",
      popular: false
    },
    {
      icon: Home,
      title: "Curtains & Drapes",
      description: "Luxurious window treatments and home textiles crafted with attention to detail.",
      features: ["Custom measurements", "Designer fabrics", "Professional installation", "Vintage styles"],
      price: "From $199",
      popular: false
    },
    {
      icon: Scissors,
      title: "Expert Alterations",
      description: "Professional alterations for all garments and textiles with vintage precision.",
      features: ["Same-day service", "All fabric types", "Perfect fit guarantee", "Heritage techniques"],
      price: "From $25",
      popular: false
    },
    {
      icon: Heart,
      title: "Wedding Collection",
      description: "Vintage-inspired bridal and groom wear for your perfect day.",
      features: ["Bridal gowns", "Groom attire", "Bridesmaid dresses", "Family coordination"],
      price: "From $799",
      popular: false
    },
    {
      icon: Zap,
      title: "Express Service",
      description: "Quick turnaround for urgent projects without compromising vintage quality.",
      features: ["24-hour service", "Priority handling", "Emergency repairs", "Quality guaranteed"],
      price: "From $45",
      popular: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gold-light px-4 py-2 rounded-full mb-4">
            <Scissors className="h-4 w-4 text-gold" />
            <span className="text-sm font-inter font-medium text-warm-brown">Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4">
            Innovative Craftsmanship
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            From men&#39;s and women&#39;s bespoke garments to elegant home textiles and curtains - crafted with vintage techniques and timeless style.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`p-8 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group ${
                service.popular ? 'border-gold shadow-gold' : 'border-border'
              }`}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-gradient-gold text-primary px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  service.popular ? 'bg-gold-light' : 'bg-accent'
                }`}>
                  <service.icon className={`h-6 w-6 ${
                    service.popular ? 'text-gold' : 'text-primary'
                  }`} />
                </div>
                <h3 className="text-2xl font-playfair font-semibold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-inter leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                    <span className="text-sm font-inter text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-2xl font-playfair font-bold text-primary">
                    {service.price}
                  </span>
                </div>
                <Button 
                  variant={service.popular ? "gold" : "outline"} 
                  size="sm"
                  className="group-hover:scale-105 transition-transform"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground font-inter mb-6">
            Need a custom solution? Were here to help.
          </p>
          <Button variant="elegant" size="xl">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
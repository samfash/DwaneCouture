import { Button } from "@/src/components/ui/button";
import { ArrowRight, Star, Clock, Award } from "lucide-react";
// import heroImage from "@/images/teju_dress.jpg";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-subtle">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/teju_dress.jpg" 
          width={1920}
          height={1080}
          alt="Luxury tailoring workshop" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-light px-4 py-2 rounded-full">
              <Award className="h-4 w-4 text-gold" />
              <span className="text-sm font-inter font-medium text-warm-brown">
                Innovative Craftsmanship Since 2014
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-primary leading-tight">
                Redefining
                <span className="text-gold text-6xl lg:text-7xl block">Fashion</span>
                Through Our Designs
              </h1>
              <p className="text-xl text-muted-foreground font-inter leading-relaxed max-w-lg">
                From bespoke menswear and elegant women&#39;s fashion to luxury curtains and home textiles - we craft with stylish charm and timeless techniques.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground font-inter">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground font-inter">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground font-inter">Express Service</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="elegant" size="xl" className="group">
                  <Link href="/">Get Your Custom Piece</Link>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                View Our Work
              </Button>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-inter">
                4.9/5 from 50+ reviews
              </span>
            </div>
          </div>

          {/* Right Content - Service Highlights */}
          <div className="space-y-6 animate-slide-in">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50">
              <h3 className="text-2xl font-playfair font-semibold text-primary mb-6">
                Why Choose Dwane Couture?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-light p-2 rounded-lg">
                    <Award className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary">Master Craftsmen</h4>
                    <p className="text-muted-foreground text-sm">Expert tailors with decades of experience</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gold-light p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary">Fast Turnaround</h4>
                    <p className="text-muted-foreground text-sm">Quick alterations without compromising quality</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gold-light p-2 rounded-lg">
                    <Star className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary">Perfect Fit Guarantee</h4>
                    <p className="text-muted-foreground text-sm">We ensure every piece fits you perfectly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
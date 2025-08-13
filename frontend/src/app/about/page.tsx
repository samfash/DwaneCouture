import { Scissors, Heart, Award, Users, Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6">
              About Our Atelier
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where tradition meets innovation, and every stitch tells a story of craftsmanship, 
              passion, and dedication to creating the perfect garment for you.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2015 by master tailor Sarah Johnson, our atelier began as a dream to revive 
                the lost art of bespoke tailoring. With over 20 years of experience in haute couture, 
                Sarah established our workshop with a simple mission: to create garments that not only 
                fit perfectly but also reflect the unique personality of each client.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                What started as a small studio has grown into a renowned atelier, serving discerning 
                clients who appreciate the difference that true craftsmanship makes. Every piece we 
                create is a testament to our commitment to excellence and attention to detail.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 flex items-center justify-center">
                <Scissors className="w-24 h-24 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every thread, every pattern, and every creation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold mb-3">Passion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every garment is crafted with love and dedication, ensuring that our passion 
                  for perfection shines through in every detail.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-8 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We never compromise on quality. From fabric selection to final fitting, 
                  excellence is our standard, not our goal.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  While honoring traditional techniques, we embrace modern technology 
                  to enhance precision and create unique designs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The skilled artisans behind every masterpiece
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-primary font-medium mb-2">Master Tailor & Founder</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  20+ years in haute couture, trained in Milan and Paris. Specializes in 
                  bridal wear and evening gowns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Scissors className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-2">Marcus Chen</h3>
                <p className="text-primary font-medium mb-2">Senior Pattern Maker</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Expert in pattern drafting and garment construction with 15 years of experience 
                  in luxury fashion houses.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-2">Elena Rodriguez</h3>
                <p className="text-primary font-medium mb-2">Embellishment Specialist</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Master of intricate beadwork, embroidery, and luxury finishes. Trained in 
                  traditional European techniques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-playfair font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-playfair font-bold text-primary mb-2">8</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-playfair font-bold text-primary mb-2">1,200+</div>
              <p className="text-muted-foreground">Garments Created</p>
            </div>
            <div>
              <div className="text-4xl font-playfair font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            To preserve and celebrate the art of fine tailoring while embracing innovation, 
            creating exceptional garments that empower our clients to express their unique style 
            and confidence. We believe that clothing should be more than fabric and thread—it 
            should be a reflection of who you are and who you aspire to be.
          </p>
          <div className="flex justify-center">
            <Clock className="w-16 h-16 text-primary" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
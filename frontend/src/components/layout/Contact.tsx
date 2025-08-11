import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Scissors } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gold-light px-4 py-2 rounded-full mb-4">
            <Scissors className="h-4 w-4 text-gold" />
            <span className="text-sm font-inter font-medium text-warm-brown">Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-primary mb-4">
            Visit Our Atelier
          </h2>
          <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Ready to experience the finest in tailoring? Contact us to schedule your consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 shadow-soft">
            <h3 className="text-2xl font-playfair font-semibold text-primary mb-6">
              Book Your Consultation
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-inter font-medium text-primary">First Name</label>
                  <Input placeholder="John" className="border-border focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-inter font-medium text-primary">Last Name</label>
                  <Input placeholder="Doe" className="border-border focus:border-gold" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-inter font-medium text-primary">Email</label>
                <Input type="email" placeholder="john@example.com" className="border-border focus:border-gold" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-inter font-medium text-primary">Phone</label>
                <Input type="tel" placeholder="+1 (555) 123-4567" className="border-border focus:border-gold" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-inter font-medium text-primary">Service Needed</label>
                <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-gold bg-background">
                  <option>Select a service</option>
                  <option>Bespoke Suit</option>
                  <option>Alterations</option>
                  <option>Formal Wear</option>
                  <option>Wedding Attire</option>
                  <option>Express Service</option>
                  <option>Corporate Package</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-inter font-medium text-primary">Message</label>
                <Textarea 
                  placeholder="Tell us about your requirements..." 
                  className="border-border focus:border-gold min-h-[120px]"
                />
              </div>
              
              <Button variant="elegant" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Location */}
            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-gold-light p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-primary text-lg mb-2">Visit Our Atelier</h4>
                  <p className="text-muted-foreground font-inter">
                    123 Savile Row<br />
                    London, W1S 3PQ<br />
                    United Kingdom
                  </p>
                </div>
              </div>
            </Card>

            {/* Phone */}
            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-gold-light p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-primary text-lg mb-2">Call Us</h4>
                  <p className="text-muted-foreground font-inter">
                    +44 20 7123 4567<br />
                    Available for consultations
                  </p>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-gold-light p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-primary text-lg mb-2">Email Us</h4>
                  <p className="text-muted-foreground font-inter">
                    info@elitetailoring.com<br />
                    consultations@elitetailoring.com
                  </p>
                </div>
              </div>
            </Card>

            {/* Hours */}
            <Card className="p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="bg-gold-light p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-primary text-lg mb-2">Opening Hours</h4>
                  <div className="text-muted-foreground font-inter space-y-1">
                    <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                    <p>Sunday: 12:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
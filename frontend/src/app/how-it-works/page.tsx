import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import {
  Scissors, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { processSteps, sewingTimelines, faqs } from "@/src/components/layout/howData";

const HowItWorks = () => {
  

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-6">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground font-inter mb-8">
              Your journey from vision to perfectly tailored garment, step by step
            </p>
            <div className="flex items-center justify-center gap-2 text-gold">
              <Clock className="w-5 h-5" />
              <span className="font-inter font-medium">Complete process: 3-14 days depending on complexity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-primary mb-16">
            Your Tailoring Journey
          </h2>
          
          <div className="grid gap-8 md:gap-12">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col lg:flex-row items-center gap-8">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-gold text-gold-foreground">
                    {step.id}
                  </Badge>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-8 left-24 w-8 h-8 text-gold" />
                  )}
                </div>

                {/* Step Content */}
                <Card className="flex-1 shadow-soft hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-playfair text-primary">
                        {step.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-gold border-gold">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg font-inter">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-inter leading-relaxed">
                      {step.details}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sewing Timeline */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-primary mb-16">
            Crafting Timelines
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sewingTimelines.map((item, index) => (
              <Card key={index} className="shadow-soft hover:shadow-gold transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Scissors className="w-8 h-8 text-gold" />
                  </div>
                  <CardTitle className="text-lg font-playfair text-primary">
                    {item.type}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">
                    {item.duration}
                  </div>
                  <Badge 
                    variant={item.complexity === 'Simple' ? 'default' : item.complexity === 'Medium' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {item.complexity}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-background rounded-lg px-6 py-3 shadow-soft">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-inter text-foreground">
                All timelines include quality control and finishing touches
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-primary mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-playfair text-lg text-primary hover:text-gold transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-inter leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-playfair font-bold text-primary-foreground mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 font-inter mb-8 max-w-2xl mx-auto">
            Start creating your perfect, custom-tailored garment today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold hover:bg-gold/90 text-gold-foreground px-8 py-4 rounded-lg font-inter font-semibold transition-all duration-300 shadow-gold">
              Start Your Order
            </button>
            <button className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-8 py-4 rounded-lg font-inter font-semibold transition-all duration-300">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
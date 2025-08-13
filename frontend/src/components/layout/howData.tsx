import {  UserPlus, 
  Ruler, 
  Bot, 
  Calendar, 
  ShoppingBag, Scissors} from 'lucide-react';

const processSteps = [
    {
      id: 1,
      title: "Create Account",
      description: "Sign up or log in to your Elite Tailoring account",
      icon: UserPlus,
      duration: "2 minutes",
      details: "Register with your email and create a secure password. Existing customers can simply log in."
    },
    {
      id: 2,
      title: "Input Measurements",
      description: "Provide your measurements or use our AI size guesser",
      icon: Ruler,
      duration: "5-10 minutes",
      details: "Enter your precise measurements or use our smart AI tool to estimate your size based on a few simple questions."
    },
    {
      id: 3,
      title: "AI Size Assistant",
      description: "Let our AI help determine your perfect fit",
      icon: Bot,
      duration: "3 minutes",
      details: "Answer a few questions about your body type and preferred fit, and our AI will suggest optimal measurements."
    },
    {
      id: 4,
      title: "Choose Your Path",
      description: "Book a custom consultation or browse our collection",
      icon: Calendar,
      duration: "Variable",
      details: "Schedule a personal consultation for completely custom designs, or browse our curated collection of elegant styles."
    },
    {
      id: 5,
      title: "Order & Customize",
      description: "Place your order with specific requirements",
      icon: ShoppingBag,
      duration: "10 minutes",
      details: "Select your preferred style, fabric, and add any special customization requests or adjustments."
    },
    {
      id: 6,
      title: "Crafting Process",
      description: "Expert tailors bring your vision to life",
      icon: Scissors,
      duration: "1-7 days",
      details: "Our master tailors carefully craft your garment using premium materials and traditional techniques."
    }
  ];

  const sewingTimelines = [
    { type: "Blouses & Shirts", duration: "1-2 days", complexity: "Simple" },
    { type: "Skirts", duration: "2-3 days", complexity: "Simple" },
    { type: "Trousers", duration: "2-3 days", complexity: "Medium" },
    { type: "Dresses (Simple)", duration: "3-4 days", complexity: "Medium" },
    { type: "Evening Gowns", duration: "5-7 days", complexity: "Complex" },
    { type: "Wedding Dresses", duration: "7-14 days", complexity: "Complex" },
    { type: "Suits (2-piece)", duration: "4-6 days", complexity: "Complex" },
    { type: "Formal Coats", duration: "5-7 days", complexity: "Complex" }
  ];

  const faqs = [
    {
      question: "How long does it take to sew different types of clothing?",
      answer: "Sewing times vary by complexity: Simple items like blouses take 1-2 days, medium complexity items like dresses take 3-4 days, and complex pieces like evening gowns take 5-7 days. Wedding dresses require 7-14 days for perfection."
    },
    {
      question: "How should I care for my custom-tailored clothes?",
      answer: "We recommend dry cleaning for most tailored pieces, especially formal wear. For casual items, gentle machine wash in cold water and hang dry. Always check the care label and avoid harsh chemicals. We provide specific care instructions with each garment."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 24 hours of placement for a full refund. After cutting begins (usually 48 hours after order), cancellations incur a 25% fee. Once sewing begins, orders cannot be cancelled but can be modified for an additional fee."
    },
    {
      question: "What if the garment doesn't fit perfectly?",
      answer: "We offer one free minor adjustment within 14 days of delivery. Major alterations may incur additional charges. Our accurate measurement system and fitting consultations minimize fit issues."
    },
    {
      question: "Do you offer rush orders?",
      answer: "Yes! Rush orders are available for an additional 50% fee and can reduce timelines by 30-50%. Rush availability depends on our current workload and garment complexity."
    },
    {
      question: "What fabrics do you work with?",
      answer: "We work with premium fabrics including silk, wool, cotton, linen, cashmere, and high-quality synthetic blends. We can also work with client-provided fabrics if they meet our quality standards."
    },
    {
      question: "How accurate is the AI size guesser?",
      answer: "Our AI size guesser is 85-90% accurate for standard body types. It uses advanced algorithms based on thousands of measurements. However, we always recommend professional measuring for the most precise fit."
    },
    {
      question: "Can I make changes after placing an order?",
      answer: "Minor changes can be made within 24 hours at no charge. Changes after cutting begins may incur fees ranging from $25-100 depending on complexity. Major design changes require starting a new order."
    }
  ];

  export { processSteps, sewingTimelines, faqs};
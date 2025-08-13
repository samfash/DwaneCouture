"use client";


import Hero from "@/src/components/layout/Hero";
import Services from "@/src/components/layout/Services";
import Contact from "@/src/components/layout/Contact";
import Testimonials from "../components/layout/testimonial";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;

import { Hero } from "@/components/Hero";
import { Tokenomics } from "@/components/Tokenomics";
import { Roadmap } from "@/components/Roadmap";
import { BuyToken } from "@/components/BuyToken";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Tokenomics />
      <Roadmap />
      <BuyToken />
      <Footer />
    </div>
  );
};

export default Index;

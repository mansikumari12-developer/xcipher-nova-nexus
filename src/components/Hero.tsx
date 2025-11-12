import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
            X Cipher
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The Next Generation Crypto Token Powering Decentralized Finance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="xl" className="animate-slide-up">
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
            <Button variant="neon" size="xl" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Buy Token
            </Button>
          </div>
          
          {/* Token stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">$0.05</div>
              <div className="text-muted-foreground">Token Price</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">1B</div>
              <div className="text-muted-foreground">Total Supply</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">50M+</div>
              <div className="text-muted-foreground">Market Cap</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

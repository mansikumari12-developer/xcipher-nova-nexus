import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Shield, Zap } from "lucide-react";
import { connectWallet, addTokenToMetaMask } from "@/lib/web3";
import { useToast } from "@/hooks/use-toast";
import CountUp from "react-countup";

export const Hero = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const { address } = await connectWallet();
      setWalletAddress(address);
      toast({
        title: "Wallet Connected!",
        description: `${address.slice(0, 6)}...${address.slice(-4)}`,
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Please install MetaMask",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAddToken = async () => {
    try {
      await addTokenToMetaMask();
      toast({
        title: "Token Added!",
        description: "XCP token has been added to your MetaMask",
      });
    } catch (error) {
      toast({
        title: "Failed to add token",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#56CCF2 1px, transparent 1px), linear-gradient(90deg, #56CCF2 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 bg-card/50 backdrop-blur-sm border border-accent/30 rounded-full text-accent font-semibold">
              🚀 Now Live on BSC
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
          >
            X Cipher (XCIP)
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Next-Generation DeFi Token on BSC — Buy with USDT or BNB
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {!walletAddress ? (
              <Button
                variant="hero"
                size="xl"
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="group"
              >
                <Wallet className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            ) : (
              <>
                <Button variant="hero" size="xl" className="group">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Buy XCIP Token
                </Button>
                <Button variant="neon" size="xl" onClick={handleAddToken}>
                  Add to MetaMask
                </Button>
              </>
            )}
          </motion.div>

          {/* Token Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border hover:border-accent/50 hover:glow-accent transition-all duration-300"
            >
              <div className="text-4xl font-bold text-accent mb-2">
                <CountUp end={100} duration={2} />
              </div>
              <div className="text-muted-foreground">XCIP per USDT</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border hover:border-accent/50 hover:glow-accent transition-all duration-300"
            >
              <div className="text-4xl font-bold text-accent mb-2">
                <CountUp end={100} duration={2} suffix="M" />
              </div>
              <div className="text-muted-foreground">Total Supply</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border hover:border-accent/50 hover:glow-accent transition-all duration-300"
            >
              <div className="text-4xl font-bold text-accent mb-2">
                $<CountUp end={50} duration={2} suffix="M+" />
              </div>
              <div className="text-muted-foreground">Market Cap</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border hover:border-accent/50 hover:glow-accent transition-all duration-300"
            >
              <div className="text-4xl font-bold text-accent mb-2">
                <CountUp end={15000} duration={2} suffix="+" />
              </div>
              <div className="text-muted-foreground">Holders</div>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20"
          >
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Audited & Secure</h3>
              <p className="text-muted-foreground">Smart contracts audited by leading security firms</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Built on BSC for instant, low-cost transactions</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Deflationary</h3>
              <p className="text-muted-foreground">Auto-burn mechanism increases token value over time</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wallet, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { connectWallet, addTokenToMetaMask } from "@/lib/web3";

export const BuyToken = () => {
  const [amount, setAmount] = useState("");
  const [tokens, setTokens] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tokenPrice = 0.05; // $0.05 per token

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numericValue = parseFloat(value) || 0;
    setTokens((numericValue / tokenPrice).toFixed(2));
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
      setIsConnected(true);
      toast({
        title: "Wallet Connected!",
        description: "You can now purchase XCP tokens.",
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Please install MetaMask",
        variant: "destructive",
      });
    }
  };

  const handleBuy = () => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to buy tokens.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Coming Soon!",
      description: "Token presale will begin soon. Stay tuned!",
    });
  };

  const handleAddToMetaMask = async () => {
    try {
      await addTokenToMetaMask();
      toast({
        title: "Token Added!",
        description: "XCP has been added to your MetaMask wallet.",
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not add token to MetaMask.",
        variant: "destructive",
      });
    }
  };

  return (
    <section ref={ref} className="py-20 px-4 bg-card/30" id="buy">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Buy X Cipher Token</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the presale and secure your position in the future of DeFi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Buy Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="border-accent/50 bg-card/80 backdrop-blur-sm glow-accent">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Purchase Tokens</CardTitle>
                <CardDescription>Enter the amount of USDT/BNB you want to spend</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount (USDT/BNB)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="text-lg h-14 bg-muted/50 border-border focus:border-accent"
                  />
                </div>

                <div className="flex items-center justify-center py-4">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </motion.div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">You will receive (XCP)</label>
                  <div className="h-14 bg-muted/50 border border-border rounded-md flex items-center px-4">
                    <span className="text-lg font-semibold text-accent">{tokens} XCP</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2 border border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Token Price:</span>
                    <span className="font-semibold text-accent">${tokenPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minimum Buy:</span>
                    <span className="font-semibold">$10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Maximum Buy:</span>
                    <span className="font-semibold">$10,000</span>
                  </div>
                </div>

                {!isConnected ? (
                  <Button variant="hero" size="lg" className="w-full" onClick={handleConnect}>
                    <Wallet className="mr-2" />
                    Connect MetaMask
                  </Button>
                ) : (
                  <>
                    <Button variant="hero" size="lg" className="w-full" onClick={handleBuy}>
                      <Wallet className="mr-2" />
                      Buy Tokens
                    </Button>
                    <Button variant="neon" size="lg" className="w-full" onClick={handleAddToMetaMask}>
                      <Plus className="mr-2" />
                      Add Token to MetaMask
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="border-border bg-card/80 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Presale Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-primary">Coming Soon</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-muted-foreground">Presale Price:</span>
                  <span className="font-semibold text-accent">$0.05</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-muted-foreground">Listing Price:</span>
                  <span className="font-semibold text-accent">$0.10</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-muted-foreground">Total Presale:</span>
                  <span className="font-semibold">400M XCP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Accepted:</span>
                  <span className="font-semibold">USDT, BNB, BUSD</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">How to Buy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Connect Wallet",
                    desc: "Connect your MetaMask or compatible BSC wallet",
                  },
                  {
                    step: 2,
                    title: "Enter Amount",
                    desc: "Choose how much USDT/BNB to spend",
                  },
                  {
                    step: 3,
                    title: "Confirm Purchase",
                    desc: "Confirm the transaction in your wallet",
                  },
                  {
                    step: 4,
                    title: "Receive Tokens",
                    desc: "XCP tokens will appear in your wallet",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

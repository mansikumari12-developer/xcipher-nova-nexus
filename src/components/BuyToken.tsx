import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wallet, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { connectWallet, addTokenToMetaMask, buyWithUSDT, buyWithBNB } from "@/lib/web3";
import { ethers } from "ethers";

type PaymentMethod = "USDT" | "BNB";

export const BuyToken = () => {
  const [amount, setAmount] = useState("");
  const [tokens, setTokens] = useState("0");
  const [isConnected, setIsConnected] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("USDT");
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 1 USDT = 100 XCIP, 1 BNB = 100 XCIP
  const rate = 100;

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numericValue = parseFloat(value) || 0;
    setTokens((numericValue * rate).toFixed(2));
  };

  const handleConnect = async () => {
    try {
      const { signer: walletSigner } = await connectWallet();
      setSigner(walletSigner);
      setIsConnected(true);
      toast({
        title: "Wallet Connected!",
        description: "Ab aap XCIP tokens kharid sakte hain.",
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "MetaMask install karein",
        variant: "destructive",
      });
    }
  };

  const handleBuy = async () => {
    if (!isConnected || !signer) {
      toast({ title: "Pehle wallet connect karein", variant: "destructive" });
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast({ title: "Valid amount enter karein", variant: "destructive" });
      return;
    }

    setIsBuying(true);
    try {
      if (paymentMethod === "USDT") {
        await buyWithUSDT(amount, signer);
      } else {
        await buyWithBNB(amount, signer);
      }
      toast({
        title: "Purchase Successful! 🎉",
        description: `Aapne ${tokens} XCIP tokens kharide ${amount} ${paymentMethod} se!`,
      });
      setAmount("");
      setTokens("0");
    } catch (error: any) {
      console.error("Buy error:", error);
      toast({
        title: "Transaction Failed",
        description: error.reason || error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsBuying(false);
    }
  };

  const handleAddToMetaMask = async () => {
    try {
      await addTokenToMetaMask();
      toast({ title: "XCIP Token Added!", description: "MetaMask mein XCIP add ho gaya." });
    } catch {
      toast({ title: "Failed", description: "MetaMask mein add nahi ho saka.", variant: "destructive" });
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
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Buy XCIP Token</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            USDT ya BNB se XCIP tokens kharidein — seedha aapke wallet mein!
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
                <CardDescription>Payment method select karein aur amount enter karein</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Toggle */}
                <div className="flex gap-2">
                  {(["USDT", "BNB"] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      onClick={() => {
                        setPaymentMethod(method);
                        handleAmountChange(amount);
                      }}
                      className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 border ${
                        paymentMethod === method
                          ? "bg-accent/20 border-accent text-accent"
                          : "bg-muted/30 border-border text-muted-foreground hover:border-accent/50"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Amount ({paymentMethod})</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="text-lg h-14 bg-muted/50 border-border focus:border-accent"
                  />
                </div>

                <div className="flex items-center justify-center py-2">
                  <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </motion.div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">You will receive (XCIP)</label>
                  <div className="h-14 bg-muted/50 border border-border rounded-md flex items-center px-4">
                    <span className="text-lg font-semibold text-accent">{tokens} XCIP</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2 border border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="font-semibold text-accent">1 {paymentMethod} = {rate} XCIP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network:</span>
                    <span className="font-semibold">BSC Testnet</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Supply:</span>
                    <span className="font-semibold">100,000,000 XCIP</span>
                  </div>
                </div>

                {!isConnected ? (
                  <Button variant="hero" size="lg" className="w-full" onClick={handleConnect}>
                    <Wallet className="mr-2" />
                    Connect MetaMask
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleBuy}
                      disabled={isBuying}
                    >
                      {isBuying ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Wallet className="mr-2" />
                          Buy with {paymentMethod}
                        </>
                      )}
                    </Button>
                    <Button variant="neon" size="lg" className="w-full" onClick={handleAddToMetaMask}>
                      <Plus className="mr-2" />
                      Add XCIP to MetaMask
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
                <CardTitle className="text-xl">Token Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Token Name", value: "XCipher Token" },
                  { label: "Symbol", value: "XCIP" },
                  { label: "Network", value: "BSC Testnet" },
                  { label: "Total Supply", value: "100,000,000 XCIP" },
                  { label: "1 USDT =", value: "100 XCIP" },
                  { label: "1 BNB =", value: "100 XCIP" },
                  { label: "Accepted", value: "USDT, BNB" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-accent">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">How to Buy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { step: 1, title: "Connect Wallet", desc: "MetaMask connect karein (BSC Testnet)" },
                  { step: 2, title: "Select Payment", desc: "USDT ya BNB choose karein" },
                  { step: 3, title: "Enter Amount", desc: "Kitna spend karna hai enter karein" },
                  { step: 4, title: "Confirm & Receive", desc: "Transaction confirm karein, XCIP milega!" },
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

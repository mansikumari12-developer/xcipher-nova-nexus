import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BuyToken = () => {
  const [amount, setAmount] = useState("");
  const [tokens, setTokens] = useState("0");
  const { toast } = useToast();

  const tokenPrice = 0.05; // $0.05 per token

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numericValue = parseFloat(value) || 0;
    setTokens((numericValue / tokenPrice).toFixed(2));
  };

  const handleBuy = () => {
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
      description: "Token presale will begin soon. Connect your wallet to get notified.",
    });
  };

  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Buy X Cipher Token</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the presale and be part of the future of DeFi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Buy Form */}
          <Card className="border-accent/50 bg-card/80 backdrop-blur-sm glow-accent animate-slide-up">
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
                  className="text-lg h-12"
                />
              </div>

              <div className="flex items-center justify-center py-4">
                <ArrowRight className="w-6 h-6 text-accent animate-pulse" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">You will receive (XCP)</label>
                <div className="h-12 bg-muted rounded-md flex items-center px-4">
                  <span className="text-lg font-semibold gradient-text">{tokens} XCP</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Token Price:</span>
                  <span className="font-semibold">${tokenPrice}</span>
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

              <Button variant="hero" size="lg" className="w-full" onClick={handleBuy}>
                <Wallet className="mr-2" />
                Buy Tokens
              </Button>

              <Button variant="neon" size="lg" className="w-full">
                Connect MetaMask
              </Button>
            </CardContent>
          </Card>

          {/* Info Section */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Presale Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-highlight">Coming Soon</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-muted-foreground">Presale Price:</span>
                  <span className="font-semibold">$0.05</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-muted-foreground">Listing Price:</span>
                  <span className="font-semibold">$0.10</span>
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

            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">How to Buy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Connect Wallet</h4>
                    <p className="text-sm text-muted-foreground">Connect your MetaMask or compatible wallet</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Enter Amount</h4>
                    <p className="text-sm text-muted-foreground">Choose how much USDT/BNB to spend</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Confirm Purchase</h4>
                    <p className="text-sm text-muted-foreground">Confirm the transaction in your wallet</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Receive Tokens</h4>
                    <p className="text-sm text-muted-foreground">XCP tokens will appear in your wallet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

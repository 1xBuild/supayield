import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="w-full max-w-3xl mx-auto bg-card shadow-light rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-card-foreground">
            Your Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold text-primary mb-8">$0.00</div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Your Opportunities
            </h2>
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>APY</span>
              <span>Savings</span>
              <span>Est. Yield</span>
              <span>Withdraw/Deposit</span>
            </div>
            <div className="border border-border rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Get started by connecting your wallet
              </p>
              <Button className="bg-accent hover:bg-accent-foreground hover:text-accent text-accent-foreground font-semibold py-2 px-4 rounded-full">
                Connect Wallet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

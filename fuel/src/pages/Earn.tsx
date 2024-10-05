import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function Earn() {
  return (
    <div className="min-h-screen bg-background flex justify-center p-8">
      <div className="w-full max-w-md">
        <Card className="bg-card shadow-light rounded-lg">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-sm text-muted-foreground">Asset</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-4xl font-bold text-primary-foreground">
                    0.00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No token selected
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 border border-border text-foreground"
                >
                  Select <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-sm text-muted-foreground">Opportunity</h2>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-foreground">
                  Up to 6.92 % APY
                </p>
                <Button
                  variant="outline"
                  className="rounded-full px-4 py-2 border border-border text-foreground"
                >
                  Select <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="w-full bg-accent hover:bg-accent-foreground hover:text-accent text-accent-foreground font-semibold py-3 rounded-full">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

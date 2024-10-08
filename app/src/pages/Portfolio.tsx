import { useWalletContext } from "../contexts/walletContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Portfolio: React.FC = () => {
  const { address, balanceEth, balanceSupa } = useWalletContext();

  console.log("SupaBalance in portfolio", balanceSupa)

  function formatBalanceEth(balance: number | null, decimals = 9) {
    if (balance === null) return "0";
    return (balance / Math.pow(10, decimals)).toFixed(4);
  }

  function formatBalanceSupa(balance: number | null) {
    if (balance === null) return "0";
    return (balance / 1000).toFixed(4);
  }

  const formattedBalanceEth = formatBalanceEth(balanceEth, 9);
  const formattedBalanceSupa = formatBalanceSupa(balanceSupa);

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="w-full max-w-3xl mx-auto bg-card shadow-light rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-card-foreground">
            Your Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-primary mb-8">
            {formattedBalanceEth ? `${formattedBalanceEth} ETH` : "0 ETH"}
          </div>
          <div className="text-2xl text-primary mb-8">
            {formattedBalanceSupa ? `${formattedBalanceSupa} $SUPA` : "0 $SUPA"}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Wallet Address
            </h2>
            <div className="text-muted-foreground text-base">
              {address ? address : "No address connected"}
            </div>

            {/* Premier élément : graphique d'investissement */}
            <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Investment Growth
              </h3>
              <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Graph coming soon...
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;

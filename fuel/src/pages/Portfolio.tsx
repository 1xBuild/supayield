import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletContext } from "../contexts/walletContext";

const Portfolio: React.FC = () => {
  const { address, balance } = useWalletContext();

  function formatBalance(balance: number | null, decimals = 18) {
    if (balance === null) return "0";
    return (balance / Math.pow(10, decimals)).toFixed(4);
  }

  const formattedBalance = formatBalance(balance, 18);

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="w-full max-w-3xl mx-auto bg-card shadow-light rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-card-foreground">
            Your Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold text-primary mb-8">
            {`${formattedBalance} supa`}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Wallet Address
            </h2>
            <div className="text-muted-foreground text-base">
              {address ? address : "No address connected"}
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Your Opportunities
            </h2>
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>APY</span>
              <span>Savings</span>
              <span>Est. Yield</span>
              <span>Withdraw/Deposit</span>
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

            {/* Deuxième élément : aperçu d'une opportunité */}
            <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Next Big Opportunity
              </h3>
              <p className="text-base text-muted-foreground">
                Explore the latest investment opportunities curated just for
                you.
              </p>
              <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Graph coming soon...
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="w-full bg-gray-400 text-gray-700 font-semibold py-3 rounded-full cursor-not-allowed opacity-50"
                  disabled
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;

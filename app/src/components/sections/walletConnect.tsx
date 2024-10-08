import {
  useConnectUI,
  useIsConnected,
  useNetwork,
} from "@fuels/react";
import { useEffect } from "react";
import { useRouter } from "@/hooks/useRouter";
import { Button } from "@/components/ui/button";
import Faucet from "@/components/fuels/Faucet";
import { providerUrl } from "@/lib";
import WalletComponent from "@/components/fuels/Wallet";
import { Card, CardContent } from "@/components/ui/card";

export default function WalletConnect() {
  const { connect } = useConnectUI();
  const { isConnected, refetch } = useIsConnected();
  const { network } = useNetwork();
  const { view, views, setRoute } = useRouter();
  const isConnectedToCorrectNetwork = network?.url === providerUrl;

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <main className="min-h-screen bg-background p-8">
      <Card className="w-full max-w-3xl mx-auto bg-card shadow-light rounded-lg">
        <CardContent className="p-6 space-y-6">
          {isConnected && !isConnectedToCorrectNetwork && (
            <p className="text-center text-destructive">
              You are connected to the wrong network. Please switch to{" "}
              <a
                href={providerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {providerUrl}
              </a>{" "}
              in your wallet.
            </p>
          )}

          <div className="space-y-4">
            <div className="flex gap-2">
              {views.map((viewName) => (
                <Button
                  key={viewName}
                  variant={view === viewName ? "default" : "secondary"}
                  onClick={() => setRoute(viewName)}
                  className="flex-1 rounded-full"
                >
                  {viewName}
                </Button>
              ))}
            </div>

            <div className="bg-accent/10 rounded-2xl p-4">
              {view === "wallet" && <WalletComponent />}
              {isConnected && view === "faucet" && <Faucet />}
            </div>
          </div>

          {!isConnected && (
            <Button
              onClick={() => connect()}
              className="w-full rounded-full bg-primary text-primary-foreground text-lg py-6"
            >
              Connect Wallet
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

import { Button } from "@/components/ui/button";
import { useSwitchChain, useAccount } from "wagmi";
import { connect } from "@wagmi/core";
import { injected } from "@wagmi/connectors";
import { neoxTestnet } from "@/main";
import { config } from "@/main";
import { Card, CardContent } from "@/components/ui/card";

export default function EarnNeoX() {
  const { switchChain } = useSwitchChain();
  const { address, chain } = useAccount();

  return (
    <main className="min-h-screen bg-background p-8">
      <Card className="w-full max-w-3xl mx-auto bg-card shadow-light rounded-lg">
        <CardContent className="p-6 space-y-6">
          {!address ? (
            <p className="mb-1 text-center text-xl font-medium dark:text-zinc-300/70">
              <strong>Please connect your wallet for use App</strong>
            </p>
          ) : (
            <div>
              <h2 className="mb-1 text-xl font-medium dark:text-zinc-300/70">
                My Address
              </h2>
              <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4">
                <p>{address}</p>
              </div>
            </div>
          )}

          {address && chain?.id !== neoxTestnet.id && (
            <p className="text-center text-destructive">
              You are connected to the wrong network. Please switch to{" "}
              <span className="text-primary hover:underline">NeoX Testnet</span>
              .
            </p>
          )}

          <h2 className="mb-1 text-xl font-medium dark:text-zinc-300/70">
            Balance
          </h2>
          <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4"><Button className="w-1/3 text-primary">Refresh</Button></div>

          <h2 className="mb-1 text-xl font-medium dark:text-zinc-300/70">
            Deposit to
          </h2>
          <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4"><Button className="w-1/3 text-primary">Deposit</Button></div>

          <div className="space-y-4">
            <div className="bg-accent/10 rounded-2xl p-4">
              {!address && config && (
                <Button
                  onClick={() => connect(config, { connector: injected() })}
                  className="w-full rounded-full bg-primary text-primary-foreground text-lg py-6"
                >
                  Connect Wallet
                </Button>
              )}

              {address && chain?.id !== neoxTestnet.id && (
                <Button
                  onClick={() => switchChain({ chainId: neoxTestnet.id })}
                  className="w-full rounded-full bg-primary text-primary-foreground text-lg py-6"
                >
                  Switch to NeoX Testnet
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

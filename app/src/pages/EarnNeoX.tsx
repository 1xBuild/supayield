import { Button } from "@/components/ui/button";
import { useSwitchChain, useAccount } from "wagmi";
import { connect, disconnect } from "@wagmi/core";
import { injected } from "@wagmi/connectors";
import { neoxTestnet } from "@/main";
import { config } from "@/main";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EarnNeoX() {
  const { switchChain } = useSwitchChain();
  const { address, chain } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  function simulateButtonClick(action: () => void, delay: number) {
    setIsLoading(true);
    toast.success(`🎉 Well done you deposited ${depositAmount} ETH !`);
    setTimeout(() => {
      action();
      setIsLoading(false);
    }, delay);
  }

  useEffect(() => {
    async function switchToChain() {
      try {
        if (address && chain?.id !== neoxTestnet.id) {
          await switchChain({ chainId: neoxTestnet.id });
        }
      } catch (error) {
        console.error("Échec du changement de réseau :", error);
      }
    }

    switchToChain();
  }, [address, chain?.id]);

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
                <p>
                  My Address: {address.slice(0, 6)}...{address.slice(-4)}
                </p>
                {address && config && (
                  <Button onClick={() => disconnect(config)} className="w-1/3">
                    Disconnect Wallet
                  </Button>
                )}
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
          <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4">
            <input
              type="text"
              className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono border border-gray-300"
              disabled
              placeholder={address ? "0.5 ETH" : "Please connect your wallet"}
            />
            {address && (
              <Button color="secondary" className="w-1/3">
                Refresh
              </Button>
            )}
          </div>

          <h2 className="mb-1 text-xl font-medium dark:text-zinc-300/70 mt-8">
            Deposit to <br />
            <span className="text-muted-foreground text-sm">
              Up to <strong>3,11% </strong>APY
            </span>
          </h2>
          <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4">
            <input
              type="number"
              step="any"
              value={depositAmount}
              onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
              className="w-2/3 bg-gray-800 custom-input dark:text-black rounded-md px-2 py-1 mr-3 truncate font-mono"
              style={{ border: "1px solid gray" }}
            />
            {isLoading ? (
              <Loader className="mx-auto" />
            ) : (
              <span className="w-1/3">
                {address && (
                  <Button
                    color="secondary"
                    className="w-full"
                    onClick={() =>
                      simulateButtonClick(
                        () => console.log("Deposit action"),
                        3000
                      )
                    } // Simulate deposit
                  >
                    Deposit
                  </Button>
                )}
              </span>
            )}
          </div>

          {isLoading && (
            <div>
              <p>
                ⚡️ We received your deposit, see the tx on :{" "}
                <a
                  href={`https://app.fuel.network/tx/#`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Explorer
                </a>
              </p>
            </div>
          )}

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
                  className="w-full rounded-full bg-primary text-primary-foreground text-lg py-6 p-8"
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

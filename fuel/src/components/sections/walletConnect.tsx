import { useConnectUI, useIsConnected, useNetwork } from "@fuels/react"
import { useEffect } from "react"
import { useRouter } from "@/hooks/useRouter"
import { Button } from "@/components/ui/button"
import Faucet from "@/components/fuels/Faucet"
import { providerUrl } from "@/lib"
import HeroSection from "./Hero"
import WalletComponent from "@/components/fuels/Wallet";

export default function App() {
  const { connect } = useConnectUI()
  const { isConnected, refetch } = useIsConnected()
  const { network } = useNetwork()
  const { view, views, setRoute } = useRouter()
  const isConnectedToCorrectNetwork = network?.url === providerUrl

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {!isConnected && (
            <section className="text-center">
              <HeroSection />
              <Button onClick={() => connect()} className="w-full sm:w-auto">
                Connect Wallet
              </Button>
            </section>
          )}

          {isConnected && !isConnectedToCorrectNetwork && (
            <section className="text-center text-white">
              <p>
                You are connected to the wrong network. Please switch to{" "}
                <a
                  href={providerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {providerUrl}
                </a>{" "}
                in your wallet.
              </p>
            </section>
          )}

          {isConnected && isConnectedToCorrectNetwork && (
            <section className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {views.map((viewName) => (
                  <Button
                    key={viewName}
                    variant={view === viewName ? "default" : "secondary"}
                    onClick={() => setRoute(viewName)}
                    className="flex-1"
                  >
                    {viewName}
                  </Button>
                ))}
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                {view === "wallet" && <WalletComponent />}
                {view === "faucet" && <Faucet />}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
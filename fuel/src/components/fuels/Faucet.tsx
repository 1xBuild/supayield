import { useBalance, useWallet } from "@fuels/react"
import { useEffect, useState } from "react"
import LocalFaucet from "./LocalFaucet"
import Button from "./Button"
import { isLocal, renderFormattedBalance, testnetFaucetUrl } from "../../lib"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Faucet() {
  const { wallet } = useWallet()
  const connectedWalletAddress = wallet?.address.toB256() || ""

  const [addressToFund, setAddressToFund] = useState("")

  const { balance, refetch } = useBalance({ address: addressToFund })

  const [initialAddressLoaded, setInitialAddressLoaded] = useState(false)

  useEffect(() => {
    if (connectedWalletAddress && !initialAddressLoaded && !addressToFund) {
      setAddressToFund(connectedWalletAddress)
      setInitialAddressLoaded(true)
    }
  }, [connectedWalletAddress, addressToFund, initialAddressLoaded])

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000)
    return () => clearInterval(interval)
  }, [refetch])

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Faucet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium text-muted-foreground">
            Address
          </label>
          <Input
            id="address"
            type="text"
            value={addressToFund}
            className="w-full bg-secondary text-secondary-foreground"
            onChange={(e) => setAddressToFund(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="balance" className="text-sm font-medium text-muted-foreground">
            Balance
          </label>
          <div className="flex items-center space-x-2">
            <Input
              id="balance"
              type="text"
              value={balance ? `${renderFormattedBalance(balance)} ETH` : ""}
              className="w-2/3 bg-secondary text-secondary-foreground"
              disabled
              data-testid="balance"
            />
            <Button className="w-1/3 text-primary" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>
        </div>

        {!isLocal && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Testnet Faucet</h3>
            <iframe
              src={`${testnetFaucetUrl}?address=${connectedWalletAddress}`}
              title="Faucet"
              className="w-full h-[500px] border-0 rounded-md"
            />
          </div>
        )}

        {isLocal && (
          <>
            <LocalFaucet refetch={refetch} addressToFund={addressToFund} />
            <p className="text-xs text-muted-foreground">
              If you would like to visit the testnet faucet, you can do so{" "}
              <a
                href={`${testnetFaucetUrl}?address=${connectedWalletAddress}&autoClose&redirectUrl=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                here
              </a>
              .
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
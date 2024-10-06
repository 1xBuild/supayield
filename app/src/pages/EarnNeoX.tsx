import React from "react";

import { Button } from "@/components/ui/button";
import { useSwitchChain, useAccount } from "wagmi";
import { connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { neoxTestnet } from "@/main";
import { config } from "@/main";

export default function EarnNeoX() {
  const { switchChain } = useSwitchChain()
  const { address, chain } = useAccount()
  return <div>
    {!address && config && 
      <Button onClick={() => connect(config, { connector: injected() })}>
        Connect Wallet
      </Button>
    }
    {address && chain?.id !== neoxTestnet.id && (
      <Button onClick={() => switchChain({ chainId: neoxTestnet.id })}>
        Switch to NeoX Testnet
      </Button>
    )}
  </div>
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Provider } from "fuels";
import Router from "./config/router";
import { providerUrl } from "./lib";
import { WalletProvider } from "./contexts/walletContext";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { http, createConfig, WagmiProvider } from "wagmi";
import { defineChain } from 'viem'

export const neoxTestnet = defineChain({
  id: 12227332,
  name: 'TestNet NeoX T4',
  nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://neoxt4seed1.ngd.network'], wss: ['wss://neoxt4wss1.ngd.network'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://xt4scan.ngd.network/' },
  },
  contracts: {
    multicall3: {
      address: '0x82096F92248dF7afDdef72E545F06e5be0cf0F99'
    },
  },
})

const queryClient = new QueryClient();

const connectors = defaultConnectors({
  devMode: true,
  burnerWalletConfig: { fuelProvider: Provider.create(providerUrl) },
});

export const config = createConfig({
  chains: [neoxTestnet],
  transports: {
    [neoxTestnet.id]: http(),
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider fuelConfig={{ connectors }}>
        <WalletProvider>
          <WagmiProvider config={config}>
            <Router />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </WagmiProvider>
        </WalletProvider>
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>
);

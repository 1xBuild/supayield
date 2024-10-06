import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextProps {
  address: string | null;
  balanceEth: number | null;
  balanceSupa: number | null;
  setAddress: (address: string | null) => void;
  setBalanceEth: (balance: number | null) => void;
  setBalanceSupa: (balanceSupa: number | null) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balanceEth, setBalanceEth] = useState<number | null>(null);
  const [balanceSupa, setBalanceSupa] = useState<number | null>(null);

  const value = {
    address,
    balanceEth,
    balanceSupa,
    setAddress,
    setBalanceEth,
    setBalanceSupa,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook for consuming the context
export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};
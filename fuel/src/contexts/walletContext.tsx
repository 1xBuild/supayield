import React, { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextProps {
  address: string;
  balance: number | null;
  setAddress: (address: string) => void;
  setBalance: (balance: number) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);

  const value = {
    address,
    balance,
    setAddress,
    setBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

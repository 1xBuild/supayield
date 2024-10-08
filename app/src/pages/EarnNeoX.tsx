import { Button } from "@/components/ui/button";
import {
  useSwitchChain,
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { connect, disconnect } from "@wagmi/core";
import { injected } from "@wagmi/connectors";
import { neoxTestnet } from "@/main";
import { config } from "@/main";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatUnits, parseUnits } from "ethers";

// Add SUPA ABI
const supaAbi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
] as const;

const xBnbTokenAddress = "0x4A468E0793bD3c434aa81A66F66D8Cf467cf68Ea";
const tokenVaultAddress = "0x1AeE4c95C71b3A2580348e4bA9A39F117732495C";
const tokenAbi = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
] as const;

const tokenVaultAbi = [
  {
    inputs: [{ name: "_assets", type: "uint256" }],
    name: "_deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function EarnNeoX() {
  const { switchChain } = useSwitchChain();
  const { address, chain } = useAccount();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [balanceSupa, setBalanceSupa] = useState<number>(0);
  const [isReadyForDeposit, setIsReadyForDeposit] = useState<boolean>(false);
  const { data: hashApproval, error: errorApproval, writeContract: writeApproval } = useWriteContract();
  const { data: hashDeposit, error: errorDeposit, writeContract: writeDeposit } = useWriteContract();

  const approve = (amount: number) => {
    console.log("Approval amount:", amount);
    setIsBtnLoading(true);
    const amountInWei = parseUnits(amount.toString(), 18);
    // Send approval transaction
    writeApproval({
      address: xBnbTokenAddress,
      abi: tokenAbi,
      functionName: "approve",
      args: [tokenVaultAddress, amountInWei],
    });
  };

  const depositOnContract = async (amount: number) => {
    const amountInWei = parseUnits(amount.toString(), 18);
    // Call _deposit function on TokenVault contract
    console.log("Sending deposit transaction...");
    await writeDeposit({
      address: tokenVaultAddress,
      abi: tokenVaultAbi,
      functionName: "_deposit",
      args: [amountInWei],
    });
  };

  // Read contract for xBNB token balance
  const { data: balanceData } = useReadContract({
    address: xBnbTokenAddress,
    abi: tokenAbi,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  // New useReadContract for SUPA balance
  const { data: supaBalanceData } = useReadContract({
    address: "0x1AeE4c95C71b3A2580348e4bA9A39F117732495C",
    abi: supaAbi,
    functionName: "balanceOf",
    args: [address!],
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    if (balanceData) {
      setTokenBalance(formatUnits(balanceData as bigint, 18)); // Assuming 18 decimals
    }
  }, [balanceData]);

  useEffect(() => {
    if (supaBalanceData) {
      setBalanceSupa(parseFloat(formatUnits(supaBalanceData as bigint, 18)));
    }
  }, [supaBalanceData]);

  // Add a useEffect to switch to the correct network if needed
  useEffect(() => {
    async function switchToChain() {
      try {
        if (address && chain?.id !== neoxTestnet.id) {
          await switchChain({ chainId: neoxTestnet.id });
        }
      } catch (error) {
        console.error("Failed to switch network:", error);
      }
    }
    switchToChain();
  }, [address, chain?.id, switchChain]);

  const resultApproval = useWaitForTransactionReceipt({
    hash: hashApproval,
    confirmations: 0,
  });

  const resultDeposit = useWaitForTransactionReceipt({
    hash: hashDeposit,
    confirmations: 1,
  });

  // Add a useEffect to display the error message
  useEffect(() => {
    if (errorDeposit || errorApproval) {
      console.error("Error during the deposit process:", errorDeposit || errorApproval);
      toast.error(
        "There was an error processing your deposit. Please check the console for details."
      );
      setIsBtnLoading(false);
    }
  }, [errorApproval, errorDeposit]);

  // Add a useEffect to handle the approval success and start the deposit
  useEffect(() => {
    if (resultApproval.isSuccess && !isReadyForDeposit) {
      toast.success(`You approved the deposit, now you can deposit!`);
      setIsReadyForDeposit(true);
      window.setTimeout(() => {
        depositOnContract(depositAmount);
      }, 100);
    }
  }, [resultApproval.isSuccess]);

  useEffect(() => {
    if (resultDeposit.isSuccess) {
      toast.success(`🎉 Well done! You deposited ${depositAmount} xBNB!`);
    }
    setIsBtnLoading(false);
  }, [resultDeposit.isSuccess, depositAmount]);

  return (
    <main className="min-h-screen bg-background p-8">
      <Card className="w-full max-w-3xl mx-auto bg-card shadow-light rounded-lg">
        <CardContent className="p-6 space-y-6">
          {!address ? (
            <p className="mb-1 text-center text-xl font-medium dark:text-zinc-300/70">
              <strong>Please connect your wallet to use the App</strong>
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
              placeholder={
                address
                  ? `${tokenBalance.slice(0, 6)} xBNB`
                  : "Please connect your wallet"
              }
            />
            {address && (
              <Button
                color="secondary"
                className="w-1/3"
                onClick={() => {
                  // Refresh balance
                  // This will refetch the balanceData automatically
                }}
              >
                Refresh
              </Button>
            )}
          </div>

          <h2 className="mb-1 text-xl font-medium dark:text-zinc-300/70 mt-8">
            Deposit to <br />
            <span className="text-muted-foreground text-sm">
              Up to <strong>5.11% </strong>APY
            </span>
          </h2>
          <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4">
            <input
              type="number"
              step="any"
              value={depositAmount}
              disabled={!address || isBtnLoading}
              onChange={(e) =>
                setDepositAmount(parseFloat(e.target.value) || 0)
              }
              className="w-2/3 bg-gray-800 custom-input dark:text-black rounded-md px-2 py-1 mr-3 truncate font-mono"
              style={{ border: "1px solid gray" }}
            />
            {isBtnLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              <span className="w-1/3">
                {address && (
                  <Button
                    color="secondary"
                    className="w-full"
                    onClick={() => approve(depositAmount)}
                    disabled={isBtnLoading}
                  >
                    Deposit
                  </Button>
                )}
              </span>
            )}
          </div>

          {resultDeposit.isSuccess && (
            <div>
              <p>
                ⚡️ We received your deposit, see the tx on :{" "}
                <a
                  href={`https://xt4scan.ngd.network/tx/${hashDeposit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  NeoX Explorer
                </a>
              </p>
              <p>💰 Your earned {balanceSupa ? balanceSupa : 0} $SUPA</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-accent/10 rounded-2xl p-4">
              {!address && config && (
                <Button
                  onClick={() =>
                    connect(config, { connector: injected() })
                  }
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

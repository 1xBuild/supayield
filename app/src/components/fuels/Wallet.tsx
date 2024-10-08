import {
  useWallet,
  useBalance,
  useIsConnected,
  useDisconnect,
} from "@fuels/react";
import { useEffect, useState } from "react";
import { useWalletContext } from "../../contexts/walletContext";
import { AssetId, BN, bn, Provider, Wallet, WalletUnlocked } from "fuels";
import { MiraAmm, PoolId, ReadonlyMiraAmm } from "mira-dex-ts";
import Button from "./Button";
import LocalFaucet from "./LocalFaucet";
import {
  contractId,
  isLocal,
  providerUrl,
  renderFormattedBalance,
} from "../../lib.tsx";
import { TestContract } from "../../sway-api/index.ts";
import { Address } from "fuels";
import { IdentityInput } from "@/sway-api/contracts/TestContract.ts";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export default function WalletComponent() {
  const { isConnected } = useIsConnected();
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance, refetch } = useBalance({ address });
  const [depositAmount, setDepositAmount] = useState(0);
  const [contract, setContract] = useState<TestContract>();
  const [isLoading, setIsLoading] = useState(false);
  const [total_assets, setTotalAssets] = useState(0);
  const { setAddress, setBalanceEth, setBalanceSupa, balanceSupa } =
    useWalletContext();
  const { disconnect } = useDisconnect();
  const [txid, setTxid] = useState<string | null>(null);

  const [miraAmm, setMiraAmm] = useState<MiraAmm | null>(null);
  const [readonlyMiraAmm, setReadonlyMiraAmm] =
    useState<ReadonlyMiraAmm | null>(null);
  const [adminWallet, setAdminWallet] = useState<WalletUnlocked | null>(null);

  const ETH_ADDRESS =
    "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07";
  const USDT_ADDRESS =
    "0x3f007b72f7bcb9b1e9abe2c76e63790cd574b7c34f1c91d6c2f407a5b55676b9";
  const FUEL_DECIMALS = 9;
  const DEFAULT_SLIPPAGE = 1;
  const DEFAULT_GAS_LIMIT = 1_000_000;

  async function initMira() {
    const provider = await Provider.create(providerUrl);
    const adminWallet = Wallet.fromMnemonic(
      process.env.VITE_WALLET_SEED || "",
      undefined,
      undefined,
      provider
    );
    const miraAmm = new MiraAmm(adminWallet);
    const readonlyMiraAmm = new ReadonlyMiraAmm(provider);
    setAdminWallet(adminWallet);
    setMiraAmm(miraAmm);
    setReadonlyMiraAmm(readonlyMiraAmm);
  }

  useEffect(() => {
    initMira();
  }, []);

  useEffect(() => {
    if (wallet) {
      const testContract = new TestContract(contractId, wallet);
      setContract(testContract);
    }
  }, [wallet]);

  useEffect(() => {
    if (address) {
      setAddress(address);
    }
    if (balance && balance.toNumber) {
      setBalanceEth(balance.toNumber());
    }
  }, [address, balance, setAddress, setBalanceEth]);

  // Initialize contract
  useEffect(() => {
    if (contract && !total_assets) {
      const getTotalAssets = async () => {
        const { value } = await contract.functions.total_assets().get();
        console.log("total_assets", value.toNumber());
        setTotalAssets(value.toNumber());
      };

      getTotalAssets();
    }
  }, [contract, total_assets]);

  async function swapETHtoUSDT(
    amountInFloat: number,
    slippageInPercent: number = DEFAULT_SLIPPAGE
  ): Promise<[BN, BN, string] | undefined> {
    console.log("swapETHtoUSDT", amountInFloat, slippageInPercent);
    if (!adminWallet || !readonlyMiraAmm || !miraAmm) return;

    try {
      const amountIn = bn(Math.floor(amountInFloat * 10 ** FUEL_DECIMALS));

      const assetIdEth = Address.fromString(ETH_ADDRESS);
      const assetIdUsdt = Address.fromString(USDT_ADDRESS);
      const assetIn: AssetId = { bits: assetIdEth.toB256() };
      const assetOut: AssetId = { bits: assetIdUsdt.toB256() };
      const poolEthUsdc: PoolId = [assetIn, assetOut, false];

      // Preview the swap to get the expected output amount
      const expectedOutputAmount = await readonlyMiraAmm.previewSwapExactInput(
        assetIn,
        amountIn,
        [poolEthUsdc]
      );
      console.log("Expected output amount:", expectedOutputAmount.toString());

      // Set amountOutMin to 99% of the expected output to account for slippage
      const amountOutMin = expectedOutputAmount[1]
        .mul(100 - slippageInPercent)
        .div(100);
      console.log("Amount out min:", amountOutMin.toString());

      const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const txParams = {
        gasLimit: DEFAULT_GAS_LIMIT,
      };

      const txRequest = await miraAmm.swapExactInput(
        amountIn,
        assetIn,
        amountOutMin,
        [poolEthUsdc],
        deadline,
        txParams
      );

      // Execute the transaction
      const response = await adminWallet.sendTransaction(txRequest);
      const result = await response.wait();
      console.log("Transaction result:", result);
      console.log("Transaction status:", result.status); // This is the transaction status (to display)
      console.log("Transaction transactionId:", result.id); // This is the transaction ID (to display)]
      return [amountIn, amountOutMin, result.id];
    } catch (error) {
      console.error("Error in swap function:", error);
      toast.error(
        `⚠️ Swap failed: "An unexpected error occurred during the swap. Please try again later."}`
      );
      return;
    }
  }

  async function sendDepositToTemporaryWallet(amount: number) {
    if (!wallet || !contract || !address || !miraAmm) return;
    console.log("sendDepositToTemporaryWallet", amount);

    try {
      const adminWalletAddress = Address.fromString(address);
      const receiverIdentity: IdentityInput = {
        Address: { bits: adminWalletAddress.toB256() },
      };
      const vaultSubId =
        "0x0000000000000000000000000000000000000000000000000000000000000001";
      const amountToForward = bn(Math.floor(amount * 10 ** FUEL_DECIMALS));

      const call = await contract.functions
        .deposit(receiverIdentity, vaultSubId)
        .callParams({
          forward: { amount: amountToForward, assetId: ETH_ADDRESS },
        })
        .call();
      const result = await call.waitForResult();

      // Extract the balance information directly from the result
      const supaBalance = result.value?.toNumber();
      console.log("supaBalance ==> ", supaBalance);
      if (supaBalance !== undefined) {
        setBalanceSupa(supaBalance);
      }

      console.log("result", result);
      console.log("transactionId", result.transactionId); // This is the transaction ID (to display)
    } catch (error) {
      console.error(error);
      toast.error(
        `⚠️ Deposit failed: "An unexpected error occurred. Please try again later."}`
      );
    }
  }

  async function addLiquidity(amount0: BN, amount1: BN) {
    console.log("addLiquidity", amount0, amount1);
    if (!adminWallet || !contract || !address || !miraAmm) return;

    const assetIdEth = Address.fromString(ETH_ADDRESS);
    const assetIdUsdt = Address.fromString(USDT_ADDRESS);
    const assetIn: AssetId = { bits: assetIdEth.toB256() };
    const assetOut: AssetId = { bits: assetIdUsdt.toB256() };
    const poolEthUsdc: PoolId = [assetIn, assetOut, false];

    const amount0Desired = amount0;
    const amount1Desired = amount1;
    const amount0Min = bn(0);
    const amount1Min = bn(0);

    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    const txParams = {
      gasLimit: DEFAULT_GAS_LIMIT,
    };

    try {
      const txRequest = await miraAmm.addLiquidity(
        poolEthUsdc,
        amount0Desired,
        amount1Desired,
        amount0Min,
        amount1Min,
        deadline,
        txParams
      );
      const response = await adminWallet.sendTransaction(txRequest);
      const result = await response.wait();
      console.log("Transaction result:", result);
      console.log("Transaction status:", result.status); // This is the transaction status (to display)
      console.log("Transaction transactionId:", result.id); // This is the transaction ID (to display)
      return result;
    } catch (error) {
      console.error(error);
      toast.error(
        `⚠️ Liquidity addition failed: "An unexpected error occurred. Please try again later."}`
      );
    }
  }

  async function deposit(amount: number) {
    if (!wallet || !contract || !address || !miraAmm) return;
    setIsLoading(true);

    try {
      console.log("deposit", amount);
      await sendDepositToTemporaryWallet(amount);
      const [ethAmount, usdtAmount] =
        (await swapETHtoUSDT(depositAmount / 2)) ?? [];
      console.log("ethAmount to add liquidity", ethAmount);
      console.log("usdtAmount to add liquidity", usdtAmount);
      if (ethAmount && usdtAmount) {
        try {
          const result = await addLiquidity(ethAmount, usdtAmount);

          if (result) {
            setTxid(result?.id);
          }
          
          toast.success(`🎉 Well done you deposited ${amount} ETH !
          `);
        } catch (error) {
          toast.error("⚠️ Failed to add liquidity");
          console.error(error);
        }
      }
      console.log("deposit done");
    } catch (error) {
      toast.error("⚠️ Failed to deposit");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <>
      {!isConnected ? (
        <p className="mb-1 text-center text-xl font-medium dark:text-zinc-300/70">
          <strong>Please connect your wallet for use App</strong>
        </p>
      ) : (
        <div>
          <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4">
            <p>
              My Address: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            {isConnected && (
              <Button
                onClick={() => disconnect()}
                className="w-1/3"
                color="secondary"
              >
                Disconnect
              </Button>
            )}
          </div>
        </div>
      )}
      <div>
        <h2 className="mb-1 text-xl font-medium dark:text-zinc-300/70 mt-8">
          Balance
        </h2>
        <div className="flex items-center justify-between text-base dark:text-zinc-50 p-4">
          <input
            type="text"
            value={balance ? `${renderFormattedBalance(balance)} ETH` : ""}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
            placeholder={isConnected ? "0 ETH" : "Please connect your wallet"}
            style={{ border: "1px solid gray" }}
          />
          {isConnected && (
            <Button
              color="secondary"
              onClick={() => refetch()}
              className="w-1/3"
            >
              Refresh
            </Button>
          )}
        </div>
      </div>
      <div>
        <h2 className="mb-1 text-xl font-medium dark:text-zinc-300/70 mt-8">
          Deposit <br />
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
            <Loader className="mx-auto animate-spin" />
          ) : (
            <span className="w-1/3">
              {isConnected && (
                <Button
                  onClick={() => deposit(depositAmount)}
                  className="w-full"
                >
                  Deposit
                </Button>
              )}
            </span>
          )}
        </div>
        {txid && (
          <div>
            <p>
              ⚡️ We received your deposit, see the tx on :{" "}
              <a
                href={`https://app.fuel.network/tx/${txid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Fuel Explorer
              </a>
            </p>
            <p>💰 Your earned {balanceSupa ? balanceSupa / 1000 : 0} $SUPA</p>
          </div>
        )}
      </div>
      {isLocal && <LocalFaucet refetch={refetch} />}
    </>
  );
}

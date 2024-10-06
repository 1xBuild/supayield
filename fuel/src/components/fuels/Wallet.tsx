import { useDisconnect, useWallet, useBalance } from "@fuels/react";
import { useEffect, useState } from "react";
import { AssetId, bn, Provider, Wallet } from 'fuels';
import { MiraAmm, PoolId, ReadonlyMiraAmm } from 'mira-dex-ts';
import Button from "./Button";
import LocalFaucet from "./LocalFaucet";
import { contractId, isLocal, providerUrl, renderFormattedBalance } from "../../lib.tsx";
import { TestContract } from "../../sway-api/index.ts";
import { Address } from "fuels";
import { IdentityInput } from "@/sway-api/contracts/TestContract.ts";

export default function WalletComponent() {
  const { disconnect } = useDisconnect();
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance, refetch } = useBalance({ address });
  const [depositAmount, setDepositAmount] = useState(0);
  const [contract, setContract] = useState<TestContract>();
  const [isLoading, setIsLoading] = useState(false);
  const [total_assets, setTotalAssets] = useState(0);

  useEffect(() => {
    if (wallet) {
      const testContract = new TestContract(contractId, wallet);
      setContract(testContract);
    }
  }, [wallet]);

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

  async function swapUSDTtoETH(amountInFloat: number, slippageInPercent: number = 1) {
    setIsLoading(true);
    if (!address) return;

    try {
      const provider = await Provider.create(providerUrl);
      const wallet = Wallet.fromMnemonic(process.env.VITE_WALLET_SEED || "", undefined, undefined, provider);
      const miraAmm = new MiraAmm(wallet);
      const readonlyMiraAmm = new ReadonlyMiraAmm(provider);

      const decimalsEth = 9; // 9 decimals for Fuel
      const amountIn = bn(Math.floor(amountInFloat * 10 ** decimalsEth));

      const assetIdEth = Address.fromString("0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07");
      const assetIdUsdt = Address.fromString("0x3f007b72f7bcb9b1e9abe2c76e63790cd574b7c34f1c91d6c2f407a5b55676b9");
      const assetIn: AssetId = {
        bits: assetIdEth.toB256()
      };
      const assetOut: AssetId = {
        bits: assetIdUsdt.toB256()
      };

      const poolEthUsdc: PoolId = [assetIn, assetOut, false];
      
      // Preview the swap to get the expected output amount
      const expectedOutputAmount = await readonlyMiraAmm.previewSwapExactInput(assetIn, amountIn, [poolEthUsdc]);
      console.log("Expected output amount:", expectedOutputAmount.toString());

      // Set amountOutMin to 99% of the expected output to account for slippage
      const amountOutMin = expectedOutputAmount[1].mul(100 - slippageInPercent).div(100);
      console.log("Amount out min:", amountOutMin.toString());

      const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const txParams = {
        gasLimit: 1_000_000,
      };

      const txRequest = await miraAmm.swapExactInput(
        amountIn, assetIn, amountOutMin, [poolEthUsdc], deadline, txParams
      );

      // Execute the transaction
      const response = await wallet.sendTransaction(txRequest);
      const result = await response.wait();
      console.log("Transaction result:", result);
      console.log("Transaction status:", result.status); // This is the transaction status (to display)
      console.log("Transaction transactionId:", result.id); // This is the transaction ID (to display)
    } catch (error) {
      console.error("Error in swap function:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deposit(amount: number) {
    console.log("wallet", wallet);
    console.log("contract", contract);
    console.log("address", address);
    if (!wallet || !contract || !address) return;
    setIsLoading(true);

    try {
      const walletAddress = Address.fromString(address);
      const receiverIdentity: IdentityInput = {
        Address: { bits: walletAddress.toB256() }
      };
      const baseAssetId = '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07'; // Base Eth
      const vaultSubId = '0x0000000000000000000000000000000000000000000000000000000000000001';
      const amountToForward = bn(amount).mul(bn(10).pow(18));
      
      console.log("baseAssetId", baseAssetId);
      console.log("amount", amount);
      console.log("receiverIdentity", receiverIdentity);
      console.log("vaultSubId", vaultSubId);
      console.log("amountToForward", amountToForward);
      
      const call = await contract.functions
        .deposit(receiverIdentity, vaultSubId)
        .callParams({
          forward: {amount: amountToForward, assetId: baseAssetId},
        })
        .call();
      // transactionSubmitNotification(call.transactionId);
      const result = await call.waitForResult();
      console.log("result", result);
      // transactionSuccessNotification(result.transactionId);
      // setCounter(result.value.toNumber());
    } catch (error) {
      console.error(error);
      // errorNotification("Error incrementing counter");
    }
    setIsLoading(false);
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
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Address
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={address}
            className="w-2/3 bg-gray-800 rounded-md mb-2 md:mb-0 px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button onClick={() => disconnect()} className="w-1/3">
            Disconnect
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Balance
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={balance ? `${renderFormattedBalance(balance)} ETH` : ""}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button onClick={() => refetch()} className="w-1/3">
            Refresh
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Deposit Amount
        </h3>
        <input
          type="number" step="any"
          value={depositAmount}
          onChange={(e) => setDepositAmount(parseFloat(e.target.value) || 0)}
          className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
        />
        <Button onClick={() => deposit(depositAmount)} className="w-1/3">
          Deposit
        </Button>
        {isLoading && <p>Loading...</p>}
        <p>Total Assets: {total_assets}</p>
        <Button onClick={() => swapUSDTtoETH(depositAmount)} className="w-1/3">
          Swap
        </Button>
      </div>
      <div>
        <p>
          Fuel supports a range of wallets. This dApp utilizes wallet connectors
          to provide simple wallet integration. You can read more about them{" "}
          <a
            href="https://docs.fuel.network/docs/wallet/dev/connectors/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
      {isLocal && <LocalFaucet refetch={refetch} />}
    </>
  );
}

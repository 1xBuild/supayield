import { useDisconnect, useWallet, useBalance } from "@fuels/react";
import { useEffect, useState } from "react";
import { bn } from 'fuels';

import Button from "./Button";
import LocalFaucet from "./LocalFaucet";
import { contractId, isLocal, renderFormattedBalance } from "../../lib.tsx";
import { TestContract } from "../../sway-api/index.ts";
import { Address } from "fuels";
import { IdentityInput } from "@/sway-api/contracts/TestContract.ts";

export default function Wallet() {
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
          <Button onClick={() => disconnect()} className="w-1/3 text-primary">
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
          <Button onClick={() => refetch()} className="w-1/3 text-primary">
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
        <Button onClick={() => deposit(depositAmount)} className="w-1/3 text-primary">
          Deposit
        </Button>
        {isLoading && <p>Loading...</p>}
        <p>Total Assets: {total_assets}</p>
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

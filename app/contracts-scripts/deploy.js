const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const TokenVault = await ethers.getContractFactory("TokenVault");
  const xBNB = "0x4A468E0793bD3c434aa81A66F66D8Cf467cf68Ea"; // xBNB Address
  const gasPrice = await ethers.provider.getGasPrice();
  console.log("Gas Price:", gasPrice);

  const tokenVaultInstance = await TokenVault.deploy(
    xBNB,
    "SUPA",
    "SUPA",
    {
      gasPrice: gasPrice,
      gasLimit: 3000000,
    }
  );

  await tokenVaultInstance.deployed();
  console.log("TokenVault deployed to:", tokenVaultInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    neoxTestnet: {
      url: "https://neoxt4seed1.ngd.network",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 12227332,
      gasPrice: 20000000000,
    },
  },
};

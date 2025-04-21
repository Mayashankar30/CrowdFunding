require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");
require("dotenv").config();
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-verify");

module.exports = {
  defaultNetwork: "zkSyncSepoliaTestnet", 
  zksolc: {
    version: "1.4.1",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zkSyncSepoliaTestnet: {
      url: "https://sepolia.era.zksync.dev", 
      ethNetwork: "sepolia", 
      zksync: true, 
      chainId: 300, 
      verifyURL: "https://explorer.sepolia.era.zksync.dev/contract_verification", 
    },
    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io", 
      ethNetwork: "mainnet", 
      zksync: true,
      chainId: 324, 
      verifyURL: "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
    sepolia: {
      url: 'https://rpc.ankr.com/eth_sepolia/8d70503f58cbe750e0aa4b0852aa41583175ee47dad54f96c4a9463073a06cc4', // Sepolia RPC URL
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 11155111, // Sepolia chain ID
    },
  },etherscan: {
    apiKey: 'EMEBFJ28E719VZ64BB2JPHZJIQ88Y5HF1J', 
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },sourcify: {
    enabled: false,
  },
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

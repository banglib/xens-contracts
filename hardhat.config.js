require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-truffle5');
require("hardhat-abi-exporter");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");

real_accounts = undefined;

if(process.env.OWNER_KEY) {
  real_accounts = [process.env.OWNER_KEY];
}

module.exports = {
  zksolc: {
    version: "1.3.8",
    compilerSource: "binary",
    settings: {},
  },
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
    ],
  },
  abiExporter: {
    path: './build/contracts',
    clear: true,
    flat: true,
    spacing: 2
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ["test", "use_root"],
      chainId: 5,
      accounts: real_accounts,
      gasMultiplier: 2
      // gasPrice: 30567057697 // 如果线上拥堵可能要调高gas
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ["use_root"],
      chainId: 1,
      accounts: real_accounts,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`,
      tags: ["test","use_root"],
      chainId: 11155111,
      accounts: real_accounts,
    },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev",
      ethNetwork: "https://goerli.infura.io/v3/dec405f7baf24770906c5c35bafd18b3", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
      tags: ["test","use_root"],
      accounts: real_accounts,
      chainId:280
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
      chainId: 4,
      accounts: real_accounts,
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    owner: {
      default: 0, //先默认同一个
    },
    visitor: {
      default: 2
    }
  },
};

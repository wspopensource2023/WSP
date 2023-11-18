import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import * as dotenv from "dotenv";
dotenv.config();

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const GOERLI_RPC_URI = process.env.GOERLI_RPC_URI;

const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;
const MUMBAI_RPC_URI = process.env.MUMBAI_RPC_URI;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const MAINNET_RPC_URI = process.env.MAINNET_RPC_URI;

const CONFLUX_PRIVATE_KEY = process.env.CONFLUX_PRIVATE_KEY;
const CONFLUX_RPC_URI = process.env.CONFLUX_RPC_URI;

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.17",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    gasReporter: {
        enabled: true,
        currency: "CNY",
        gasPrice: 21,
    },
    mocha: {
        timeout: 100000000,
    },
    networks: {
        goerli: {
            url: GOERLI_RPC_URI,
            gasPrice: 5000000000, // 5gwei
            chainId: 5,
            gas: "auto",
            accounts: [String(GOERLI_PRIVATE_KEY)],
        },
        mumbai: {
            url: MUMBAI_RPC_URI,
            gasPrice: "auto",
            chainId: 80001,
            gas: "auto",
            accounts: [String(MUMBAI_PRIVATE_KEY)],
        },
        mainnet: {
            url: MAINNET_RPC_URI,
            gasPrice: "auto",
            chainId: 1,
            gas: "auto",
            accounts: [],
        },
        conflux: {
            url: CONFLUX_RPC_URI,
            gasPrice: "auto",
            chainId: 71,
            gas: "auto",
            accounts: [String(CONFLUX_PRIVATE_KEY)],
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;

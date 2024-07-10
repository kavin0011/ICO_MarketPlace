import { ethers } from "ethers";
import Web3Modal from "web3modal";

import ERC20Generator from "./ERC20Generator.json";
import icoMarketplace from "./icoMarketplace.json";

export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

export const ICO_MARKETPLACE_ADDRESS = "0x32FDb4168d452FD6F7D2A30441965eE4617c9b5a";
export const ICO_MARKETPLACE_ABI = icoMarketplace.abi;

// PINATA KEY

export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

const networks = {
    sepolia: {
        chainId: `0x${Number(11155111).toString(16)}`, // Sepolia Test Network Chain ID
        chainName: "Sepolia Test Network",
        nativeCurrency: {
            name: "Sepolia Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://sepolia.infura.io/v3/389e2ef3656e4bb0bdbcbf51ff1a5905"], // Replace with your Infura project ID or another RPC URL
        blockExplorerUrls: ["https://sepolia.etherscan.io/"], // Sepolia Etherscan URL
    },
    Polygon_Amoy: {
        chainId: `0x${Number(80002).toString(16)}`,
        chainName: "Polygon Amoy",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls: ["https://amoy.polygonscan.com/"],
    },
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/polygon"],
        blockExplorerUrls: ["https://polygonscan.com/"],
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/bsc"],
        blockExplorerUrls: ["https://bscscan.com/"],
    },
};

const changeNetwork = async ({ networkName }) => {
    try {
        if (!window.ethereum) throw new Error("No crypto wallet found");
        const networkConfig = networks[networkName];
        if (!networkConfig) throw new Error("Network Configuration not found");
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                ...networkConfig,
            }],
        });
    } catch (e) {
        console.log(e.message);
    }
};

export const handleNetworkSwitch = async () => {
    const networkName = "sepolia"; 
    await changeNetwork({ networkName });
};

export const shortenAddress = (address) => `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;

// CONTRACT

const fetchContract = (address, abi, signer) => {
    return new ethers.Contract(address, abi, signer);
};

// ICOMARKETPLACE
export const ICOMarketPlaceContract = async () => {
    try {

        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        console.log("Signer",signer);

        const contract = new ethers.Contract(ICO_MARKETPLACE_ADDRESS,ICO_MARKETPLACE_ABI,signer);
        console.log("Contract:",contract);
        return contract;
    } catch (e) {
        console.log(e);
    }
};

// TOKENCONTRACT
export const TokenContract = async (Token_Address) => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        // const contract = fetchContract(Token_Address, ICO_MARKETPLACE_ABI, signer);
        const contract = new ethers.Contract(Token_Address,ERC20Generator_ABI, signer);
        return contract;
    } catch (e) {
        console.log(e);
    }
};


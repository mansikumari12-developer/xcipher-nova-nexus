import { ethers } from "ethers";

// X Cipher Token Contract Address (BSC Testnet - Replace with mainnet)
export const TOKEN_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual contract

// Token ABI (simplified - add full ABI from your contract)
export const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

// Presale Contract ABI (simplified)
export const PRESALE_ABI = [
  "function buyTokens() payable",
  "function tokenPrice() view returns (uint256)",
];

export const PRESALE_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace

export async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed!");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, signer, address };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
}

export async function getTokenBalance(address: string, provider: ethers.providers.Web3Provider) {
  try {
    const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, provider);
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    return ethers.utils.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return "0";
  }
}

export async function addTokenToMetaMask() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed!");
  }

  try {
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: TOKEN_CONTRACT_ADDRESS,
          symbol: "XCP",
          decimals: 18,
          image: "https://example.com/xcp-logo.png", // Replace with actual logo URL
        },
      },
    });

    return wasAdded;
  } catch (error) {
    console.error("Error adding token to MetaMask:", error);
    throw error;
  }
}

export async function buyTokens(amount: string, signer: ethers.Signer) {
  try {
    const contract = new ethers.Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_ABI, signer);
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Error buying tokens:", error);
    throw error;
  }
}

// Declare ethereum on window for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

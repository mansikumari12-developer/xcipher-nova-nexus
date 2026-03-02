import { ethers } from "ethers";

// BSC Testnet Chain ID
export const BSC_TESTNET_CHAIN_ID = 97;
export const BSC_TESTNET_RPC = "https://data-seed-prebsc-1-s1.binance.org:8545/";

// X Cipher Token Contract Address (BSC Testnet)
export const TOKEN_CONTRACT_ADDRESS = "0xe06576F5052b0195C4304dFd5cf672Bb149751fe";

// Mock USDT Address (BSC Testnet)
export const USDT_CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";

// Owner Wallet (receives payments)
export const OWNER_WALLET = "0x62117CBF1C75d1565cFF6554D2FD54Bb7A80B069";

// XCipher Token ABI (matching deployed contract)
export const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function priceUSDT() view returns (uint256)",
  "function priceBNB() view returns (uint256)",
  "function ownerWallet() view returns (address)",
  "function owner() view returns (address)",
  "function buyTokensWithUSDT(uint256 usdtAmount) external",
  "function buyTokensWithBNB() external payable",
];

// ERC20 ABI for USDT approve + allowance
export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export async function switchToBSCTestnet() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed!");
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }], // 97 in hex
    });
  } catch (switchError: any) {
    // Chain not added, add it
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
            chainName: "BSC Testnet",
            nativeCurrency: { name: "BNB", symbol: "tBNB", decimals: 18 },
            rpcUrls: [BSC_TESTNET_RPC],
            blockExplorerUrls: ["https://testnet.bscscan.com"],
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
}

export async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask install karein!");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    // Switch to BSC Testnet
    await switchToBSCTestnet();

    // Re-init provider after chain switch
    const updatedProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = updatedProvider.getSigner();
    const address = await signer.getAddress();

    return { provider: updatedProvider, signer, address };
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

export async function getUSDTBalance(address: string, provider: ethers.providers.Web3Provider) {
  try {
    const contract = new ethers.Contract(USDT_CONTRACT_ADDRESS, ERC20_ABI, provider);
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    return ethers.utils.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error getting USDT balance:", error);
    return "0";
  }
}

export async function buyWithUSDT(usdtAmount: string, signer: ethers.Signer) {
  // USDT has 6 decimals typically, but check mock USDT
  const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, ERC20_ABI, signer);
  const decimals = await usdtContract.decimals();
  const amount = ethers.utils.parseUnits(usdtAmount, decimals);

  // Step 1: Approve XCIP contract to spend USDT
  const allowance = await usdtContract.allowance(
    await signer.getAddress(),
    TOKEN_CONTRACT_ADDRESS
  );

  if (allowance.lt(amount)) {
    const approveTx = await usdtContract.approve(TOKEN_CONTRACT_ADDRESS, amount);
    await approveTx.wait();
  }

  // Step 2: Call buyTokensWithUSDT
  const xcipContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);
  const tx = await xcipContract.buyTokensWithUSDT(amount);
  await tx.wait();
  return tx;
}

export async function buyWithBNB(bnbAmount: string, signer: ethers.Signer) {
  const xcipContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, signer);
  const tx = await xcipContract.buyTokensWithBNB({
    value: ethers.utils.parseEther(bnbAmount),
  });
  await tx.wait();
  return tx;
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
          symbol: "XCIP",
          decimals: 18,
          image: "",
        },
      },
    });
    return wasAdded;
  } catch (error) {
    console.error("Error adding token to MetaMask:", error);
    throw error;
  }
}

// Declare ethereum on window for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

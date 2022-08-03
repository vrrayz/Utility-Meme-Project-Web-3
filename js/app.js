// import { ethers } from "./ethers-5.2.esm.min.js";


//  Create WalletConnect Provider
const wcDefault = new WalletConnectProvider.default({
    rpc: {
      // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      56: "https://bsc-dataseed.binance.org/",
    },
  });
await wcDefault.enable();

// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()
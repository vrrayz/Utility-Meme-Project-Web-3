import { BigNumber, ethers } from "./ethers-5.2.esm.min.js";

// Contract addresses and abi
const tokenAddress = "0xcaa5ecf38b32c27c5e651d2dbacd7750eef6f056";
const cakeLpAddress = "0x2E6004C0afA04bb88bfBf560B40F96A8Eb3fF798";
const stakingContractAddress = "0x434df6942154fc4A15008604a80B0eb65594EA6B";
const tokenABI = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
      { internalType: "uint256", name: "totalSupply_", type: "uint256" },
      { internalType: "address[4]", name: "addrs", type: "address[4]" },
      {
        internalType: "uint256[4]",
        name: "buyFeeSetting_",
        type: "uint256[4]",
      },
      {
        internalType: "uint256[4]",
        name: "sellFeeSetting_",
        type: "uint256[4]",
      },
      {
        internalType: "uint256",
        name: "tokenBalanceForReward_",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isExcluded",
        type: "bool",
      },
    ],
    name: "ExcludeFromFees",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isExcluded",
        type: "bool",
      },
    ],
    name: "ExcludeMultipleAccountsFromFees",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "oldValue",
        type: "uint256",
      },
    ],
    name: "GasForProcessingUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newLiquidityWallet",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldLiquidityWallet",
        type: "address",
      },
    ],
    name: "LiquidityWalletUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "iterations",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "claims",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastProcessedIndex",
        type: "uint256",
      },
      { indexed: true, internalType: "bool", name: "automatic", type: "bool" },
      { indexed: false, internalType: "uint256", name: "gas", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "processor",
        type: "address",
      },
    ],
    name: "ProcessedDividendTracker",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensSwapped",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SendDividends",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "pair", type: "address" },
      { indexed: true, internalType: "bool", name: "value", type: "bool" },
    ],
    name: "SetAutomatedMarketMakerPair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensSwapped",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethReceived",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokensIntoLiqudity",
        type: "uint256",
      },
    ],
    name: "SwapAndLiquify",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
    ],
    name: "UpdateDividendTracker",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAddress",
        type: "address",
      },
    ],
    name: "UpdateUniswapV2Router",
    type: "event",
  },
  {
    inputs: [],
    name: "AmountLiquidityFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AmountMarketingFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AmountTokenRewardsFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "value", type: "bool" },
    ],
    name: "EnemyAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "_isEnemy",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_marketingWalletAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "automatedMarketMakerPairs",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyDeadFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyLiquidityFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyMarketingFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyTokenRewardsFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deadWallet",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "dividendTokenBalanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dividendTracker",
    outputs: [
      {
        internalType: "contract TokenDividendTracker",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "excludeFromDividends",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "excluded", type: "bool" },
    ],
    name: "excludeFromFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "accounts", type: "address[]" },
      { internalType: "bool", name: "excluded", type: "bool" },
    ],
    name: "excludeMultipleAccountsFromFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gasForProcessing",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAccountDividendsInfo",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "getAccountDividendsInfoAtIndex",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "int256", name: "", type: "int256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClaimWait",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastProcessedIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfDividendTokenHolders",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalDividendsDistributed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isExcludedFromDividends",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isExcludedFromFees",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "gas", type: "uint256" }],
    name: "processDividendTracker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sellDeadFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sellLiquidityFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sellMarketingFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sellTokenRewardsFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "pair", type: "address" },
      { internalType: "bool", name: "value", type: "bool" },
    ],
    name: "setAutomatedMarketMakerPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "rewardsFee", type: "uint256" },
      { internalType: "uint256", name: "marketingFee", type: "uint256" },
      { internalType: "uint256", name: "deadFee", type: "uint256" },
    ],
    name: "setBuyTaxes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "addr", type: "address" }],
    name: "setDeadWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "wallet", type: "address" },
    ],
    name: "setMarketingWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "liquidity", type: "uint256" },
      { internalType: "uint256", name: "rewardsFee", type: "uint256" },
      { internalType: "uint256", name: "marketingFee", type: "uint256" },
      { internalType: "uint256", name: "deadFee", type: "uint256" },
    ],
    name: "setSelTaxes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "setSwapTokensAtAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapManual",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapTokensAtAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Pair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapV2Router",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "claimWait", type: "uint256" }],
    name: "updateClaimWait",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newValue", type: "uint256" }],
    name: "updateGasForProcessing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "val", type: "uint256" }],
    name: "updateMinimumTokenBalanceForDividends",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
    name: "updateUniswapV2Router",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "withdrawableDividendOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
const cakeLpAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "amount0Out", type: "uint256" },
      { internalType: "uint256", name: "amount1Out", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const stakingContractABI = [
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "changeCakeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "changeOriginalToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_split",
        type: "uint256",
      },
    ],
    name: "changeSplit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimCakeTokenEarnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimOriginalTokenEarnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "depositCake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "depositOriginalToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cakeApy",
        type: "uint256",
      },
    ],
    name: "setCakeApy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_originalTokenApy",
        type: "uint256",
      },
    ],
    name: "setOriginalTokenApy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "_lpAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawCake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawOriginalToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cakeApy",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cakeBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cakeLpToken",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "calculateUserCakeEarnings",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "calculateUserOriginalTokenEarnings",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "originalToken",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "originalTokenApy",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "originalTokenBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakingDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "lastOriginalTokenClaimTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalOriginalTokenStaked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastCakeClaimTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalCakeStaked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalActualCakeStaked",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalCakeDeposited",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalOriginalTokenDeposited",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

//  Create WalletConnect Provider
const wcDefault = new WalletConnectProvider.default({
  rpc: {
    // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    56: "https://bsc-dataseed.binance.org/",
  },
});

const decimals = 18;

let provider;
let signer;
let userAddress;
let tokenContract;
let stakingContract;
let cakeLpContract;
let tokenSupply;

let connectBtns = document.getElementsByClassName("connectBtns");
let walletModalBtn = document.getElementsByClassName("unlockWalletBtn");
document.getElementById("tokenAddress").innerText = tokenAddress;
let connectedStakingDetails = document.getElementsByClassName(
  "connected-staking-details"
);

// Variables zebra
let depositZebraModal = document.getElementById("depositZebraModal");
let depositZebraButton = document.querySelector("#depositZebra");
let approveZebraButton = document.querySelector("#approveZebraButton");
let stakeZebraButton = document.querySelector("#stakeZebraButton");
let depositZebraInput = document.querySelector("#depositZebraInput");
let depositZebraModalBs = new bootstrap.Modal(depositZebraModal);
let zzEarned = document.querySelector("#zzEarned");
let zzStaked = document.querySelector("#zzStaked");
let claimZebraButton = document.querySelector("#claimZebra");

let withdrawZebra = document.querySelector("#withdrawZebra");
let withdrawZebraModalBs = new bootstrap.Modal(withdrawZebraModal);
let withdrawZebraButton = document.querySelector("#withdrawZebraButton");
let withdrawZebraInput = document.querySelector("#withdrawZebraInput");

// Variables cake
let depositCakeModal = document.getElementById("depositCakeModal");
let depositCakeButton = document.querySelector("#depositCake");
let approveCakeButton = document.querySelector("#approveCakeButton");
let stakeCakeButton = document.querySelector("#stakeCakeButton");
let depositCakeInput = document.querySelector("#depositCakeInput");
let depositCakeModalBs = new bootstrap.Modal(depositCakeModal);
let zzCakeEarned = document.querySelector("#zzCakeEarned");
let zzCakeStaked = document.querySelector("#zzCakeStaked");
let claimCakeButton = document.querySelector("#claimCake");

let withdrawCake = document.querySelector("#withdrawCake");
let withdrawCakeModalBs = new bootstrap.Modal(withdrawCakeModal);
let withdrawCakeButton = document.querySelector("#withdrawCakeButton");
let withdrawCakeInput = document.querySelector("#withdrawCakeInput");

// deposit
depositZebraButton.addEventListener("click", function () {
  toggleDepositZebraButton();
});
depositCakeButton.addEventListener("click", function () {
  toggleDepositCakeButton();
});

//   approve
approveZebraButton.addEventListener("click", function () {
  approveZebra(depositZebraInput.value);
});
approveCakeButton.addEventListener("click", function () {
  approveCake(depositCakeInput.value);
});

// stake
stakeZebraButton.addEventListener("click", function () {
  stakeZebra(depositZebraInput.value);
});
stakeCakeButton.addEventListener("click", function () {
  stakeCake(depositCakeInput.value);
});
//   claim
claimZebraButton.addEventListener("click", function () {
  claimZebra();
});
claimCakeButton.addEventListener("click", function () {
  claimCake();
});

//   withdraw
withdrawZebra.addEventListener("click", function () {
  toggleWithdrawZebraButton();
});
withdrawZebraButton.addEventListener("click", function () {
  withdrawZebraToken(withdrawZebraInput.value);
});
withdrawCake.addEventListener("click", function () {
  toggleWithdrawCakeButton();
});
withdrawCakeButton.addEventListener("click", function () {
  withdrawCakeToken(withdrawCakeInput.value);
});

// modal toggles
function toggleDepositZebraButton() {
  getUserZebraBalance();
  depositZebraModalBs.show();
}
function toggleDepositCakeButton() {
  getUserCakeBalance();
  depositCakeModalBs.show();
}
function toggleWithdrawZebraButton() {
  withdrawZebraModalBs.show();
}
function toggleWithdrawCakeButton() {
  withdrawCakeModalBs.show();
}
// If the user is already connected
Array.prototype.map.call(walletModalBtn, (x) => {
  x.addEventListener("click", async function () {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else if (wcDefault) {
      provider = new ethers.providers.Web3Provider(wcDefault);
    }
    let myModal = new bootstrap.Modal(
      document.getElementById("chooseWalletModal"),
      { keyboard: false }
    );
    signer = provider.getSigner();
    await signer.getAddress().then(
      (res) => {
        userAddress = res;
        hideConnectBtn();
        getTokenSupply();
        updateDetails();
      },
      () => {
        myModal.show();
      }
    );
  });
});

for (let index = 0; index < connectBtns.length; index++) {
  let walletType = "";
  if (index == 0) {
    walletType = "metamask";
  }
  if (index == 1) {
    walletType = "walletconnect";
  }
  connectBtns[index].addEventListener("click", function (event) {
    event.preventDefault();
    connectWallet(walletType);
  });
}
async function connectWallet(walletType) {
  event.preventDefault();
  try {
    if (walletType == "metamask") {
      // / A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      provider = new ethers.providers.Web3Provider(window.ethereum);
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
    } else if (walletType == "walletconnect") {
      //  Enable session (triggers QR Code modal)
      await wcDefault.enable();

      provider = new ethers.providers.Web3Provider(wcDefault);
    } else {
      alert("incorrect wallet sent");
      return;
    }
  } catch (error) {
    console.log(error);
  }
  signer = provider.getSigner();
  userAddress = await signer.getAddress();
  hideConnectBtn();
  updateDetails();
  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  $("#chooseWalletModal").modal("hide");
}

function hideConnectBtn() {
  if (userAddress) {
    walletModalBtn[0].style.display = "none";
    walletModalBtn[1].style.display = "none";
    for (let index = 0; index < connectedStakingDetails.length; index++) {
      connectedStakingDetails[index].classList.toggle("d-none");
      connectContract();
    }
    //   swapSection.style.display = "block";
  }
}

async function connectContract() {
  tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
  tokenContract = await tokenContract.deployed();
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  cakeLpContract = new ethers.Contract(cakeLpAddress, cakeLpAbi, provider);
  cakeLpContract = await cakeLpContract.deployed();
}

async function getTokenSupply() {
  let totalS = await tokenContract.totalSupply();
  totalS = ethers.utils.formatUnits(totalS, decimals);
  // totalS = BigNumber.from(totalS._hex).toString()
  tokenSupply = totalS;
}
async function getUserZebraBalance() {
  let balance = await tokenContract.balanceOf(userAddress);
  balance = ethers.utils.formatUnits(balance, decimals);
  let zebraBalanceElement = document.querySelectorAll(".zebraBalance");
  for (let index = 0; index < zebraBalanceElement.length; index++) {
    zebraBalanceElement[index].innerText = balance;
  }
}
async function getUserCakeBalance() {
  let balance = await cakeLpContract.balanceOf(userAddress);
  balance = ethers.utils.formatUnits(balance, decimals);
  let cakeBalanceElement = document.querySelectorAll(".cakeBalance");
  for (let index = 0; index < cakeBalanceElement.length; index++) {
    cakeBalanceElement[index].innerText = balance;
  }
}
async function approveZebra(amount) {
  // console.log(amount)
  let nAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
  // let nAmount = ethers.utils.parseUnits(amount, decimals);
  await tokenContract
    .connect(signer)
    .approve(stakingContractAddress, nAmount)
    .then((res) => {
      tokenContract.on("Approval", (owner, spender, amount, event) => {
        approveZebraButton.style.display = "none";
        stakeZebraButton.removeAttribute("disabled");
        console.log("Approved " + spender + " allowance " + amount);
      });
    });
}
async function approveCake(amount) {
  // console.log(amount)
  let nAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
  // let nAmount = ethers.utils.parseUnits(amount, decimals);
  await cakeLpContract
    .connect(signer)
    .approve(stakingContractAddress, nAmount)
    .then((res) => {
      cakeLpContract.on("Approval", (owner, spender, amount, event) => {
        approveCakeButton.style.display = "none";
        stakeCakeButton.removeAttribute("disabled");
        console.log("Approved " + spender + " allowance " + amount);
      });
    });
}
async function stakeZebra(amount) {
  // console.log(amount)
  let nAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
  // let nAmount = ethers.utils.parseUnits(amount, decimals);
  await stakingContract
    .connect(signer)
    .depositOriginalToken(nAmount)
    .then((res) => {
      tokenContract.on("Transfer", (from, to, value, event) => {
        // approveZebraButton.style.display = "none";
        // stakeZebraButton.removeAttribute("disabled");
        // console.log(from+" Transferred  "+value+" to "+to);
        if (from == userAddress && to == stakingContractAddress) {
          depositZebraModalBs.hide();
          updateDetails();
        }
      });
    });
}
async function stakeCake(amount) {
  let nAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
  await stakingContract
    .connect(signer)
    .depositCake(nAmount)
    .then((res) => {
      cakeLpContract.on("Transfer", (from, to, value, event) => {
        // approveZebraButton.style.display = "none";
        // stakeZebraButton.removeAttribute("disabled");
        // console.log(from+" Transferred  "+value+" to "+to);
        if (from == userAddress && to == stakingContractAddress) {
          depositCakeModalBs.hide();
          updateDetails();
        }
      });
    });
}
async function updateDetails() {
  updateZZEarned();
  updateZZStaked();

  updateZZCakeEarned();
  updateZZCakeStaked();
}

async function updateZZEarned() {
  zzEarned.innerText = await getZZEarned();
}
async function updateZZCakeEarned() {
  zzCakeEarned.innerText = await getZZCakeEarned();
}

async function updateZZStaked() {
  zzStaked.innerText = await getZZStaked();
}
async function updateZZCakeStaked() {
  zzCakeStaked.innerText = await getZZCakeStaked();
}
async function getZZEarned() {
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let zE = await stakingContract.calculateUserOriginalTokenEarnings(
    userAddress
  );
  zE = ethers.utils.formatUnits(zE, decimals);
  // console.log(zE)
  return zE;
}
async function getZZCakeEarned() {
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let zE = await stakingContract.calculateUserCakeEarnings(userAddress);
  zE = ethers.utils.formatUnits(zE, decimals);
  // console.log(zE)
  return zE;
}
async function getZZStaked() {
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let zS = await stakingContract.stakingDetails(userAddress);
  // zS = ethers.utils.formatUnits(zS.totalOriginalTokenStaked,decimals)
  return ethers.utils.formatUnits(zS.totalOriginalTokenStaked, decimals);
  // return zE
}
async function getZZCakeStaked() {
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let zS = await stakingContract.stakingDetails(userAddress);
  // zS = ethers.utils.formatUnits(zS.totalOriginalTokenStaked,decimals)
  return ethers.utils.formatUnits(zS.totalActualCakeStaked, decimals);
  // return zE
}
async function claimZebra() {
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let action = await stakingContract
    .connect(signer)
    .claimOriginalTokenEarnings()
    .then((res) => {
      tokenContract.on("Transfer", (from, to, value, event) => {
        // approveZebraButton.style.display = "none";
        // stakeZebraButton.removeAttribute("disabled");
        // console.log(from+" Transferred  "+value+" to "+to);
        if (from == stakingContractAddress && to == userAddress) {
          updateDetails();
        }
      });
    });
}
async function claimCake() {
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let action = await stakingContract
    .connect(signer)
    .claimCakeTokenEarnings()
    .then((res) => {
      cakeLpContract.on("Transfer", (from, to, value, event) => {
        if (from == stakingContractAddress && to == userAddress) {
          updateDetails();
        }
      });
    });
}
async function withdrawZebraToken(amount) {
  let nAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let action = await stakingContract
    .connect(signer)
    .withdrawOriginalToken(nAmount)
    .then((res) => {
      tokenContract.on("Transfer", (from, to, value, event) => {
        // approveZebraButton.style.display = "none";
        // stakeZebraButton.removeAttribute("disabled");
        // console.log(from+" Transferred  "+value+" to "+to);
        if (from == stakingContractAddress && to == userAddress) {
          updateDetails();
          withdrawZebraModalBs.hide();
        }
      });
    });
}
async function withdrawCakeToken(amount) {
  let nAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
  stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    provider
  );
  stakingContract = await stakingContract.deployed();
  let action = await stakingContract
    .connect(signer)
    .withdrawCake(nAmount)
    .then((res) => {
      cakeLpContract.on("Transfer", (from, to, value, event) => {
        // approveZebraButton.style.display = "none";
        // stakeZebraButton.removeAttribute("disabled");
        // console.log(from+" Transferred  "+value+" to "+to);
        if (from == stakingContractAddress && to == userAddress) {
          updateDetails();
          withdrawCakeModalBs.hide();
        }
      });
    });
}

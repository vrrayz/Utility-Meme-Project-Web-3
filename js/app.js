// import "./dist-web3.min.js";

// const platinumAddress = "0x0D714A328CEF6B403A752625692fF965Bb948baA"; //platinum mainnet
// const platinumABI = [
// 	{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{
// 				indexed: true,
// 				internalType: "address",
// 				name: "owner",
// 				type: "address",
// 			},
// 			{
// 				indexed: true,
// 				internalType: "address",
// 				name: "spender",
// 				type: "address",
// 			},
// 			{
// 				indexed: false,
// 				internalType: "uint256",
// 				name: "value",
// 				type: "uint256",
// 			},
// 		],
// 		name: "Approval",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{
// 				indexed: true,
// 				internalType: "address",
// 				name: "account",
// 				type: "address",
// 			},
// 			{
// 				indexed: false,
// 				internalType: "bool",
// 				name: "isExcluded",
// 				type: "bool",
// 			},
// 		],
// 		name: "ExcludeFromFees",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{
// 				indexed: false,
// 				internalType: "address[]",
// 				name: "accounts",
// 				type: "address[]",
// 			},
// 			{
// 				indexed: false,
// 				internalType: "bool",
// 				name: "isExcluded",
// 				type: "bool",
// 			},
// 		],
// 		name: "ExcludeMultipleAccountsFromFees",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{
// 				indexed: true,
// 				internalType: "uint256",
// 				name: "newValue",
// 				type: "uint256",
// 			},
// 			{
// 				indexed: true,
// 				internalType: "uint256",
// 				name: "oldValue",
// 				type: "uint256",
// 			},
// 		],
// 		name: "GasForProcessingUpdated",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{
// 				indexed: true,
// 				internalType: "address",
// 				name: "previousOwner",
// 				type: "address",
// 			},
// 			{
// 				indexed: true,
// 				internalType: "address",
// 				name: "newOwner",
// 				type: "address",
// 			},
// 		],
// 		name: "OwnershipTransferred",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{
// 				indexed: false,
// 				internalType: "uint256",
// 				name: "iterations",
// 				type: "uint256",
// 			},
// 			{
// 				indexed: false,
// 				internalType: "uint256",
// 				name: "claims",
// 				type: "uint256",
// 			},
// 			{
// 				indexed: false,
// 				internalType: "uint256",
// 				name: "lastProcessedIndex",
// 				type: "uint256",
// 			},
// 			{ indexed: true, internalType: "bool", name: "automatic", type: "bool" },
// 			{ indexed: false, internalType: "uint256", name: "gas", type: "uint256" },
// 			{
// 				indexed: true,
// 				internalType: "address",
// 				name: "processor",
// 				type: "address",
// 			},
// 		],
// 		name: "ProcessedDividendTracker",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{
// 				indexed: false,
// 				internalType: "uint256",
// 				name: "tokensSwapped",
// 				type: "uint256",
// 			},
// 			{
// 				indexed: false,
// 				internalType: "uint256",
// 				name: "amount",
// 				type: "uint256",
// 			},
// 		],
// 		name: "SendDividends",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: true, internalType: "address", name: "pair", type: "address" },
// 			{ indexed: true, internalType: "bool", name: "value", type: "bool" },
// 		],
// 		name: "SetAutomatedMarketMakerPair",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: true, internalType: "address", name: "from", type: "address" },
// 			{ indexed: true, internalType: "address", name: "to", type: "address" },
// 			{
// 				indexed: false,
// 				internalType: "uint256",
// 				name: "value",
// 				type: "uint256",
// 			},
// 		],
// 		name: "Transfer",
// 		type: "event",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "uint256", name: "maxBuy", type: "uint256" },
// 			{ internalType: "uint256", name: "maxSell", type: "uint256" },
// 			{ internalType: "uint256", name: "maxWallet", type: "uint256" },
// 		],
// 		name: "SetMaxTxLimit",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "", type: "address" }],
// 		name: "_isBot",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "owner", type: "address" },
// 			{ internalType: "address", name: "spender", type: "address" },
// 		],
// 		name: "allowance",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "spender", type: "address" },
// 			{ internalType: "uint256", name: "amount", type: "uint256" },
// 		],
// 		name: "approve",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "", type: "address" }],
// 		name: "automatedMarketMakerPairs",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "account", type: "address" }],
// 		name: "balanceOf",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "buyTaxes",
// 		outputs: [
// 			{ internalType: "uint256", name: "rewards", type: "uint256" },
// 			{ internalType: "uint256", name: "marketing", type: "uint256" },
// 			{ internalType: "uint256", name: "team", type: "uint256" },
// 			{ internalType: "uint256", name: "dev", type: "uint256" },
// 			{ internalType: "uint256", name: "liquidity", type: "uint256" },
// 		],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "claim",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "coolDownBalance",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "coolDownTime",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "deadWallet",
// 		outputs: [{ internalType: "address", name: "", type: "address" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "decimals",
// 		outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "spender", type: "address" },
// 			{ internalType: "uint256", name: "subtractedValue", type: "uint256" },
// 		],
// 		name: "decreaseAllowance",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "devWallet",
// 		outputs: [{ internalType: "address", name: "", type: "address" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "account", type: "address" }],
// 		name: "dividendTokenBalanceOf",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "dividendTracker",
// 		outputs: [
// 			{
// 				internalType: "contract PlatinumDividendTracker",
// 				name: "",
// 				type: "address",
// 			},
// 		],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "enableTradingEnabled",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "account", type: "address" },
// 			{ internalType: "bool", name: "value", type: "bool" },
// 		],
// 		name: "excludeFromDividends",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "account", type: "address" },
// 			{ internalType: "bool", name: "excluded", type: "bool" },
// 		],
// 		name: "excludeFromFees",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address[]", name: "accounts", type: "address[]" },
// 			{ internalType: "bool", name: "excluded", type: "bool" },
// 		],
// 		name: "excludeMultipleAccountsFromFees",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "forceSend",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "gasForProcessing",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "account", type: "address" }],
// 		name: "getAccountDividendsInfo",
// 		outputs: [
// 			{ internalType: "address", name: "", type: "address" },
// 			{ internalType: "int256", name: "", type: "int256" },
// 			{ internalType: "int256", name: "", type: "int256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 		],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
// 		name: "getAccountDividendsInfoAtIndex",
// 		outputs: [
// 			{ internalType: "address", name: "", type: "address" },
// 			{ internalType: "int256", name: "", type: "int256" },
// 			{ internalType: "int256", name: "", type: "int256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 			{ internalType: "uint256", name: "", type: "uint256" },
// 		],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "getClaimWait",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "getCurrentRewardToken",
// 		outputs: [{ internalType: "string", name: "", type: "string" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "getLastProcessedIndex",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "getNumberOfDividendTokenHolders",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "getTotalDividendsDistributed",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "spender", type: "address" },
// 			{ internalType: "uint256", name: "addedValue", type: "uint256" },
// 		],
// 		name: "increaseAllowance",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "account", type: "address" }],
// 		name: "isExcludedFromFees",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "", type: "address" }],
// 		name: "lastSell",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "marketingWallet",
// 		outputs: [{ internalType: "address", name: "", type: "address" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "maxBuyAmount",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "maxSellAmount",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "maxWalletBalance",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "name",
// 		outputs: [{ internalType: "string", name: "", type: "string" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "owner",
// 		outputs: [{ internalType: "address", name: "", type: "address" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "pair",
// 		outputs: [{ internalType: "address", name: "", type: "address" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "gas", type: "uint256" }],
// 		name: "processDividendTracker",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "renounceOwnership",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "tokenAddress", type: "address" },
// 		],
// 		name: "rescueBEP20Tokens",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "router",
// 		outputs: [{ internalType: "contract IRouter", name: "", type: "address" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "sellTaxes",
// 		outputs: [
// 			{ internalType: "uint256", name: "rewards", type: "uint256" },
// 			{ internalType: "uint256", name: "marketing", type: "uint256" },
// 			{ internalType: "uint256", name: "team", type: "uint256" },
// 			{ internalType: "uint256", name: "dev", type: "uint256" },
// 			{ internalType: "uint256", name: "liquidity", type: "uint256" },
// 		],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "uint256", name: "numberOfBlocks", type: "uint256" },
// 		],
// 		name: "setAntiBotBlocks",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "newPair", type: "address" },
// 			{ internalType: "bool", name: "value", type: "bool" },
// 		],
// 		name: "setAutomatedMarketMakerPair",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "bot", type: "address" },
// 			{ internalType: "bool", name: "value", type: "bool" },
// 		],
// 		name: "setBot",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address[]", name: "bots", type: "address[]" },
// 			{ internalType: "bool", name: "value", type: "bool" },
// 		],
// 		name: "setBulkBot",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "uint256", name: "_rewards", type: "uint256" },
// 			{ internalType: "uint256", name: "_marketing", type: "uint256" },
// 			{ internalType: "uint256", name: "_team", type: "uint256" },
// 			{ internalType: "uint256", name: "_dev", type: "uint256" },
// 			{ internalType: "uint256", name: "_liquidity", type: "uint256" },
// 		],
// 		name: "setBuyTaxes",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "claimWait", type: "uint256" }],
// 		name: "setClaimWait",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "uint256", name: "timeInSeconds", type: "uint256" },
// 			{ internalType: "uint256", name: "balance", type: "uint256" },
// 		],
// 		name: "setCooldownTime",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "newWallet", type: "address" }],
// 		name: "setDevWallet",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "newValue", type: "uint256" }],
// 		name: "setGasForProcessing",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "newWallet", type: "address" }],
// 		name: "setMarketingWallet",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "maxBuy", type: "uint256" }],
// 		name: "setMaxBuyLimits",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "maxSell", type: "uint256" }],
// 		name: "setMaxSellLimits",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "maxWallet", type: "uint256" }],
// 		name: "setMaxWallet",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
// 		name: "setMinBalanceForDividends",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "uint256", name: "_rewards", type: "uint256" },
// 			{ internalType: "uint256", name: "_marketing", type: "uint256" },
// 			{ internalType: "uint256", name: "_team", type: "uint256" },
// 			{ internalType: "uint256", name: "_dev", type: "uint256" },
// 			{ internalType: "uint256", name: "_liquidity", type: "uint256" },
// 		],
// 		name: "setSellTaxes",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "bool", name: "_enabled", type: "bool" }],
// 		name: "setSwapEnabled",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
// 		name: "setSwapTokensAtAmount",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "newWallet", type: "address" }],
// 		name: "setTeamWallet",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "startTradingBlock",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "swapEnabled",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "swapTokensAtAmount",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "symbol",
// 		outputs: [{ internalType: "string", name: "", type: "string" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "teamWallet",
// 		outputs: [{ internalType: "address", name: "", type: "address" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "totalSupply",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [],
// 		name: "tradingEnabled",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "recipient", type: "address" },
// 			{ internalType: "uint256", name: "amount", type: "uint256" },
// 		],
// 		name: "transfer",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ internalType: "address", name: "sender", type: "address" },
// 			{ internalType: "address", name: "recipient", type: "address" },
// 			{ internalType: "uint256", name: "amount", type: "uint256" },
// 		],
// 		name: "transferFrom",
// 		outputs: [{ internalType: "bool", name: "", type: "bool" }],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
// 		name: "transferOwnership",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
// 		name: "updateDividendTracker",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "newRouter", type: "address" }],
// 		name: "updateRouter",
// 		outputs: [],
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ internalType: "address", name: "account", type: "address" }],
// 		name: "withdrawableDividendOf",
// 		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{ stateMutability: "payable", type: "receive" },
// ];

// const web3static = new Web3("https://bsc-dataseed1.binance.org/");
// const contractStatic = new web3static.eth.Contract(
// 	platinumABI,
// 	platinumAddress
// );

// const DEAD = "0x000000000000000000000000000000000000dead";
// const decimals = 9;
// let usdPrice;

// window.addEventListener("load", async () => {
// 	getPrices()
// });

// function modifyField(name, value) {
// 	document.querySelector(name).textContent = value;
// }

// function getPrices() {
// 	// Remember to change the address to what's on the mainnet. this is a dummy
// 	jQuery
// 		.ajax("https://api.pancakeswap.info/api/v2/tokens/" + platinumAddress, {
// 			dataType: "json",
// 		})
// 		.done(async function (response) {
// 			usdPrice = BigNumber(response.data.price);
// 			console.log(usdPrice)
// 			modifyField("#platinumPrice", BigNumber(response.data.price).decimalPlaces(5).toString());
// 			getMarketCap();
// 			// getLiquidity();
// 			// getBurned();
// 		});
// }

// function getMarketCap() {
// 	// Get market cap
// 	jQuery
// 		.ajax(
// 			"https://app.platinum-finance.net/getTokenDetails.php" /*'http://localhost:8000/getTokenDetails.php'*/,
// 			{ dataType: "json" }
// 		)
// 		.done(async function (data) {
// 			let deadTokens = await getPlatinumBalance(DEAD);
// 			let totalBurnedTokensValue = BigNumber(deadTokens).div(BigNumber(10 ** decimals));
// 			let supply = BigNumber(data.tokensupply).minus(totalBurnedTokensValue);
// 			let mCap = usdPrice.times(supply);
// 			modifyField("#marketCap", mCap.decimalPlaces(2).toFormat());
// 			modifyField("#dailyVolume", BigNumber(data.dailyvolume).decimalPlaces(2).toFormat());
// 		});
// }
// async function getPlatinumBalance(address) {
// 	let balance = await contractStatic.methods
// 		.balanceOf(address)
// 		.call({ from: platinumAddress }, function (error, result) {
// 			return result / 10 ** decimals;
// 		});
// 	return balance;
// }
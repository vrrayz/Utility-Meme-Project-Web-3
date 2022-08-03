// import { ethers } from "./ethers-5.2.esm.min.js";

//  Create WalletConnect Provider
const wcDefault = new WalletConnectProvider.default({
    rpc: {
        // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        56: "https://bsc-dataseed.binance.org/",
    },
});

let provider;
let signer;
let userAddress;

let connectBtns = document.getElementsByClassName("connectBtns");
let walletModalBtn = document.getElementsByClassName("unlockWalletBtn");
let connectedStakingDetails = document.getElementsByClassName("connected-staking-details");

// If the user is already connected
Array.prototype.map.call(walletModalBtn, (x) => {
    x.addEventListener("click", async function () {
        let web3;
        if (window.ethereum) {
            web3 = new ethers.providers.Web3Provider(window.ethereum);
        } else if (wcDefault) {
            web3 = new ethers.providers.Web3Provider(wcDefault);
        }
        let myModal = new bootstrap.Modal(
            document.getElementById("chooseWalletModal"),
            { keyboard: false }
        );
        signer = web3.getSigner();
        await signer.getAddress().then((res) => {
            userAddress = res;
            hideConnectBtn();
        }, () => {
            myModal.show()
        });
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
            connectedStakingDetails[index].classList.toggle('d-none')
        }
        //   swapSection.style.display = "block";
    }
}

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { ethers, utils } from "ethers";
//import abi from "./contracts/Bank.json";

const checkIfWalletIsConnected = async () => {
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let userAddress = await signer.getAddress();
            console.log("address",userAddress)
            provider.getBalance(account).then((balance) => {
                // convert a currency unit from wei to ether
                const balanceInEth = ethers.utils.formatEther(balance)
                console.log(`balance: ${balanceInEth} ETH`)
            })
            const net = await provider.getNetwork()
            console.log(net) // 42
            //setIsWalletConnected(true);
            //setCustomerAddress(account);
            console.log(account)
            console.log("Account Connected: ", account);
        } else {
            setError("Please install a MetaMask wallet to use our bank.");
            console.log("No Metamask detected");
        }
    } catch (error) {
        console.log(error);
    }
}


const getBankName = async () => {

    try {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(provider);
            console.log(signer)
            //const bankContract = new ethers.Contract(contractAddress, contractABI, signer);

            //let bankName = await bankContract.bankName();
            //bankName = utils.parseBytes32String(bankName);
            //setCurrentBankName(bankName.toString());
        } else {
            console.log("Ethereum object not found, install Metamask.");
            setError("Please install a MetaMask wallet to use our bank.");
        }
    } catch (error) {
        console.log(error);
    }
}

checkIfWalletIsConnected()
getBankName()


createApp(App).mount('#app')

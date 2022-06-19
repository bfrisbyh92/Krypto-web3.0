import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
        });

        return transactionContract;
}

export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e,name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value,}));
    }

    const checkIfWalletIsConnected = async () => {

        try{
            if(!ethereum)return alert("Please Install Metamask Extension!");
            const accounts = await ethereum.request({method: "eth_accounts"});

            if(accounts.length){
                    setCurrentAccount(accounts[0]);
                    console.log(accounts);
                    // getAllTransactions;
                }else{
                    console.log("No accounts found");
        }
            
            }
            catch(err){
                console.log(err);
                throw new Error("No Ethereum object!")
            }

    }

    const connectWallet = async () => {
        try {
            if(!ethereum)return alert("Please Install Metamask Extension!");
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            setCurrentAccount(accounts[0])
            console.log(currentAccount)
        }
        catch(err) {
            console.log(err);
            throw new Error("No Ethereum object!")
        }
    }

    const sendTransaction = async() => {
            try{
                if(!ethereum)return alert("Please Install Metamask Extension!");
                const {addressTo, amount, keyword, message} = formData;
// ^^^ Getting data from welcome component form ^^^
                 const transactionContract = getEthereumContract();
                 const parsedAmount = ethers.utils.parseEther(amount);
// ^^^ Uses ethers built in utils to parse amount because ethereum will only accept hexadecimal  ^^^ //

                 await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        //  ^^^ Equal to 21000 gwei ^^^ //
                        value: parsedAmount._hex,
// ^^^ Passing in parsedAmount instead of 'amount' ethereum network accepts only accepts hexadecimal values ^^^
                    }] 
                });

               const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
               setIsLoading(true);
               console.log(`Loading... -- transactionHash => '${transactionHash.hash}'`);
               await transactionHash.wait();
               setIsLoading(false);
               console.log(`Success! -- transactionHash = '${transactionHash.hash}' Complete`);
               const transactionCount = await transactionContract.getTransactionCount();
               setTransactionCount(transactionCount.toNumber());
// ^^^ addToBlockchain function coming from backend solidity file,  '../../../smart_contract/contracts/Transactions.sol'^^^
            }
            catch(err) {
                console.log(err);
                throw new Error("No Ethereum object!")
            }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[])

    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}


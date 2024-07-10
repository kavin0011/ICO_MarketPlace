import React , {useState,useContext,createContext ,useEffect} from 'react';
import {ethers} from "ethers";
import Web3Modal, { setLocal } from "web3modal";
import toast from "react-hot-toast";

//INTERNAL IMPORT 
import {ERC20Generator,
    ERC20Generator_BYTECODE,
    handleNetworkSwitch,
    shortenAddress,
    ICO_MARKETPLACE_ADDRESS,
    ICOMarketPlaceContract,
    TokenContract,
    PINATA_API_KEY,
    PINATA_SECRENT_KEY,
    ERC20Generator_ABI
} from './constants'
import { TransactionTypes } from "ethers/lib/utils";

const StateContext = createContext();
export const StateContextProvider = ({children})=>{
    //STATE VARIABLE
    const [address,setaddress] =useState();
    const [accountBalance,setAccountBalance] = useState(null);
    const [loader , setLoader] =useState(false);
    const [reCall, setRecall] = useState(0);
    const [currency , setCurrency] = useState("MATIC");

    //COMPONENT
    const [openBuyToken , setOpenBuyToken] = useState(false);
    const [openWithdrawToken,setopenwithdrawToken] =useState(false);
    const [openTransfertoken,setopenTransferToken] = useState(false);
    const [openTokenCreater,setopenTokenCreater] = useState(false);
    const [openCreateICO,setopenCreateICO] = useState(false);

    const notifySuccess = (msg)=> toast.success(msg,{duration:2000});
    const notifyError = (msg)=> toast.error(msg,{duration:2000});

    //FUNCTION
    const checkIfwalletConnected=async()=>{
        try{
            if(!window.ethereum) return notifyError("No account found");
            await handleNetworkSwitch();
            const accounts = await window.ethereum.request({method:"eth_accounts",});
           if(accounts.length){
            setaddress(accounts[0]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getbalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getbalance);
            setAccountBalance(bal);
            return accounts[0];
           }
           else{
            notifyError("No account Found");
           }
        }catch(e){
          console.log(e.message);
          notifyError("No account Found");
        }
    }

    useEffect(()=>{
        checkIfwalletConnected();
    },[address]);
    const connectWallet=async()=>{
        try{
            if(!window.ethereum ) return notifyError("No account found");
            await handleNetworkSwitch();
            const accounts = await window.ethereum.request({method:"eth_requestAccounts",});
           if(accounts.length){
            setaddress(accounts[0]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getbalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getbalance);
            setAccountBalance(bal);
            return accounts[0];
           }
           else{
            notifyError("No account Found");
           }
        }catch(e){
          console.log(e.message);
          notifyError("No account Found");
        }
    }

    //MAIN FUNCTION
    const _deployContract = async(signer,account,name,symbol,supply,imageURL)=>{
     try{
        const factory = new ethers.ContractFactory(ERC20Generator_ABI,ERC20Generator_BYTECODE,signer);

        const totalSupply = Number(supply)
        const _initialSupply = ethers.utils.parseEther(totalSupply.toString());

        const contract = await factory.deploy(_initialSupply, name, symbol);
        await contract.deployed();
        
        console.log(signer);
        console.log(account);
        console.log(name);
        console.log(symbol);
        console.log(supply);
        console.log(imageURL);
        console.log(_initialSupply);
        console.log(totalSupply);
          console.log(contract.address);
        if(contract.address){
            const today = Date.now();
            let date = new Date(today);
            const _tokenCreatedDate = date.toLocaleDateString("en-US");

            const _token ={
                account:account,
                supply:supply.toString(),
                name:name,
                symbol:symbol,
                tokenAddress:contract.address,
                transactionHash:contract.deployTransaction.hash,
                createdAt:_tokenCreatedDate,
                logo:imageURL,
            };
            console.log(_token);
            
            addTokenToHistory(_token);
            setLoader(false);
            setRecall(reCall+1);
            setopenTokenCreater(false);
            notifySuccess("Token Created Succesfully");
}
}catch(e){
    setLoader(false);
    notifyError("Something Went wrong , try again Later !");
    console.log(e);
}
    }
    const addTokenToHistory = (_token) => {
        // Retrieve the existing history from localStorage
        const history = localStorage.getItem("TOKEN_HISTORY");
        let tokenHistory = [];
      
        if (history) {
          try {
            const parsedHistory = JSON.parse(history);
            // Ensure parsedHistory is an array
            tokenHistory = Array.isArray(parsedHistory) ? parsedHistory : [parsedHistory];
          } catch (error) {
            console.error("Error parsing TOKEN_HISTORY from localStorage:", error);
          }
        }
      
        // Add the new token to the history array
        tokenHistory.push(_token);
      
        // Save the updated history back to localStorage
        localStorage.setItem("TOKEN_HISTORY", JSON.stringify(tokenHistory));
      };

   
    const createERC20= async(token,account,imageURL)=>{
        const{name,symbol,supply} = token;
        try{
            setLoader(true)
            notifySuccess("Creating token...");
            if(!name||!supply||!symbol){
                notifyError("Data Missing");
            }
            else{
                const web3modal = new Web3Modal();
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();

                _deployContract(signer,account,name,symbol,supply,imageURL);
            }
        }catch(e){
         setLoader(false);
         notifyError("Something went worng , try again laater");
         console.log(e);
        }
    }

    const GET_ALL_ICOSALE_TOKEN= async()=>{
        try{
            setLoader(true);
            const address = await connectWallet();
            const contract = await ICOMarketPlaceContract();

            if(address){
               const allicoSaleToken = await contract.getAllTokens();

               const _tokenArray = Promise.all(
                 allicoSaleToken.map(async(token)=>{
                    const tokenContract = await TokenContract(token?.token);
                    
                    const balance = await tokenContract.balanceOf(ICO_MARKETPLACE_ADDRESS);
                    console.log("icoSalBal",ethers.utils.formatEther(balance.toString()))

                    return{
                        creater:token.creater,
                        token:token.token,
                        name:token.name,
                        symbol:token.symbol,
                        supported: token.supported,
                        price: ethers.utils.formatEther(token?.price.toString()),
                        icoSalBal:ethers.utils.formatEther(balance.toString()),
                    };
                })
            )
            // console.log(icoSalBal)
               setLoader(false);
               return _tokenArray;
            }
        }catch(e){
            notifyError("Something Went Wrong !");
         console.log(e);
        }
    }

    const GET_ALL_USER_ICOSALE_TOKEN = async()=>{
        try{
            setLoader(true);
            const address = await connectWallet();
            console.log("All User address");
            const contract = await ICOMarketPlaceContract();
            console.log("ALL User contract",contract);
            if(address){
               const allicoSaleToken = await contract.getTokenCreatedBy(address);
                console.log("allicoSaleToken",allicoSaleToken);
               const _tokenArray = Promise.all(
                 allicoSaleToken.map(async(token)=>{
                    const tokenContract = await TokenContract(token?.token);

                    const balance = await tokenContract.balanceOf(ICO_MARKETPLACE_ADDRESS);
                    console.log("balance",balance);
                    return{
                        creater:token.creater,
                        token:token.token,
                        name:token.name,
                        symbol:token.symbol,
                        supported: token.supported,
                        price: ethers.utils.formatEther(token?.price.toString()),
                        icoSalBal:ethers.utils.formatEther(balance.toString()),
                    };
                 })
               )
               setLoader(false);
               return _tokenArray;
            }
        }catch(e){
            notifyError("Something Went Wrong !");
            console.log(e);
        }
    }

    const createICOSALE = async(icoSale)=>{
        try{
            const {address,price} = icoSale;
            if(!address||!price) return notifyError("Data is Not Fully Provided");
            setLoader(true);
            notifySuccess("Creating icoSale...");
            await connectWallet();

            const contract = await ICOMarketPlaceContract();
            console.log("contract");
            const payAmount = ethers.utils.parseUnits(price.toString(),"ether");
            console.log("payAmount");
            console.log(address,payAmount);
            const transaction = await contract.createICOScale(address,payAmount,{
                gasLimit: ethers.utils.hexlify(8000000),
            });
            console.log("Transaction");

            await transaction.wait();

            if(transaction.hash){
                  setLoader(false);
                  setopenCreateICO(false);
                  setRecall(reCall+1);
            }
            notifySuccess("ICOSale Created");
        }catch(e){
         console.log(e);
         setLoader(false);
         setopenCreateICO(false);
         notifyError("Something went Wrong !");
        }
    }

    const buyToken = async(tokenAddress,tokenQuantity)=>{
        try{

            console.log("Buy token Address",tokenAddress);
            console.log("Buy token quantity",tokenQuantity);
           if(!tokenAddress||!tokenQuantity) return notifyError("Data Missing");
           setLoader(true);
           notifySuccess("Purchasing token...");

           const address = await connectWallet();
           const contract = await ICOMarketPlaceContract();

           const _tokenbalance = await contract.getbalance(tokenAddress);
           const _tokenDetails = await contract.getTokenDetails(tokenAddress);

           const availableToken = ethers.utils.formatEther(_tokenbalance.toString());

           if(availableToken>0){
              const price = ethers.utils.formatEther(_tokenDetails.price.toString())*Number(tokenQuantity);

              const payAmount = ethers.utils.parseUnits(price.toString(),"ether");

              const transaction = await contract.buyToken(tokenAddress,Number(tokenQuantity),{
                value:payAmount.toString(),
                gasLimit:ethers.utils.hexlify(8000000),
              });

              await transaction.wait();

              setLoader(false);
              setRecall(reCall+1);
              setOpenBuyToken(false);
              notifySuccess("Transaction completed succesfully");
            }else{
                setLoader(false);
                setOpenBuyToken(false);
                notifyError("Your token balance is 0");
            }
        }catch(e){
         setLoader(false);
         setOpenBuyToken(false);
         notifyError("Something went wrong");
         console.log(e);
        }
    }

    const transferTokens= async(transferTokenData)=>{
        try{
           if(!transferTokenData.address||!transferTokenData.amount||!transferTokenData.tokenAdd) return notifyError("Data is not comletely given");

           setLoader(true);
           notifySuccess("transaction is processing...");
           const address = await connectWallet();

           const contract = await TokenContract(transferTokenData.tokenAdd);
           const _available = await contract.balanceOf(address);
           const availableToken = ethers.utils.formatEther(_available.toString());
           if(availableToken >1){
            const payAmount = ethers.utils.parseUnits(
                transferTokenData.amount.toString(),
                "ether"
            );
            const transaction = await contract.transfer(transferTokenData.address,
                payAmount,
                {
                    gasLimit:ethers.utils.hexlify(9000000),
                }
            );

            await transaction.wait();
            setLoader(false);
            setRecall(reCall+1);
            setopenTransferToken(false);
            notifySuccess("Transaction completed succesfully ! ");
        }
        else{
            setLoader(false);
            setRecall(reCall+1);
            setopenTransferToken(false);
            notifyError("Your Balance is Not Sufficient...");
            
        }
    }catch(e){
        console.log(e);
        setLoader(false);
        setRecall(reCall+1);
        setopenTransferToken(false);
        notifyError("SomeThing Went Wrong");
        }
    }

    const withdrawToken = async(withdrawQuantity)=>{
        try{
            if(!withdrawQuantity.amount || !withdrawQuantity.token) return notifyError("Data is Missing !");

            setLoader(true);
            notifySuccess("Transaction is being processing...");
            
            const address = await connectWallet();
            const contract = await ICOMarketPlaceContract();

            const payAmount = ethers.utils.parseUnits(
                withdrawQuantity.amount.toString(),
                "ether"
            );

            const transaction = await contract.withdrawToken(
                withdrawQuantity.token,
                payAmount,{
                    gasLimit:ethers.utils.hexlify(9000000),
                }
            );

            await transaction.wait();
            setLoader(false);
            setRecall(reCall+1);
            setopenwithdrawToken(false);
            notifySuccess("Transaction completed succesfully");
            
        }catch(e){
            console.log(e);
            setLoader(false);
            setRecall(reCall+1);
            setopenwithdrawToken(false);
            notifySuccess("SomeThing Went Wrong");
        }
    }
    return <StateContext.Provider value={{
        withdrawToken,
        transferTokens ,
        buyToken,
        createICOSALE,
        GET_ALL_ICOSALE_TOKEN,
        GET_ALL_USER_ICOSALE_TOKEN,
        createERC20,
        shortenAddress,
        ICO_MARKETPLACE_ADDRESS,
        PINATA_API_KEY,
        PINATA_SECRENT_KEY,
        openBuyToken , 
        setOpenBuyToken,
        openWithdrawToken,
        setopenwithdrawToken,
        openTransfertoken,
        setopenTransferToken,
        openTokenCreater,
        setopenTokenCreater,
        openCreateICO,
        setopenCreateICO,
        address,
        setaddress,
        accountBalance,
        loader,
        setLoader,
        currency,
        connectWallet,
        reCall
     }}>{children}</StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);
import React,{useState,useEffect} from "react";

// INTERNAL IMPORT
import Button from "./Button";
import { shortenAddress } from "../Context/constants";
const Header = ({accountBalance,
  setAddress,
  address,
  connectWallet,
  ICO_MARKETPLACE_ADDRESS,
  shortenaddress,
  setopenAllICO,
  setopenTokenCreater,
  openTokenCreator,
  setopenTokenHistory,
  openTokenHistory,
  setopenICOMarketplace,
  openICOMarketplace,
  openAllICO,
  opentokentransfer1,
  setopentokentransfer,opencreateico,
  setopencreateico}) => {
  const [isMetaMaskInstalled, setisMetaMaskInstalled] = useState(false)
  useEffect(() => {
    if(typeof window.ethereum!=="undefined"){
      setisMetaMaskInstalled(true);
      window.ethereum.on("accountsChanged",handleAccountChanged);
    }

    return()=>{
      if(typeof window.ethereum !=="undefined"){
         window.ethereum.removeListener("accountsChanged",handleAccountChanged);
      }
    };
  }, [address])
   const handleAccountChanged=(accounts)=>{
        setAddress(accounts[0]);
   }
  return(
    <header className="header">
      <nav>
        <div className="logo">
          <a href="/">ICO.<span>MARKET</span></a>
        </div>
        <input type="checkbox" name="" id = "menu-toggle"/>
        <label htmlFor="menu-toggle" className="menu-icon">
          &#9776;
        </label>
        <ul className="menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a onClick={()=> openICOMarketplace?
            setopenICOMarketplace(false):
            setopenICOMarketplace(true)
            }>All ICO Created On the Chain</a>
          </li>
          <li>
            <a onClick={()=> openAllICO?
            setopenAllICO(false):
            setopenAllICO(true)
            }>Created ICO for Sale</a>
          </li>
          <li>
             <a onClick={()=> opentokentransfer1?
              setopentokentransfer(false):
              setopentokentransfer(true)}>Transfer Token</a> 
          </li>
          <li>
            <a onClick={()=> opencreateico?
            setopencreateico(false):
            setopencreateico(true)
            }>Creat ICO</a>
          </li>
          <li>
            <a type="button" onClick={()=> openTokenHistory?
            setopenTokenHistory(false):
            setopenTokenHistory(true)
            }>History</a>
          </li>
          <li>
            <a onClick={()=> openTokenCreator?
            setopenTokenCreater(false):
            setopenTokenCreater(true)
            }>Create Token</a>
          </li>
          {address?(
           <li>
            <Button name={`${shortenAddress(address)}:
            ${accountBalance?.slice(0,5)}`}/>
              </li>
          ):(<li>
            <Button name="Connect Wallet" handleClick={connectWallet}/>
          </li>)
          }
        </ul>
      </nav>
    </header>
  )
};

export default Header;

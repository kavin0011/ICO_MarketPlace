import React,{useState,useEffect} from 'react';

//INTERNAL IMPORT
import Input from "./Input";
import Button from './Button';
const TokenTransfer = ({
    address,
      transferTokens,
      connectWallet,
      setopenTransferToken,
      setopentokentransfer1}) => {
        const [transfertokendata, settransfertokendata] = useState({
            address:"",
            tokenAdd:"",
            amount:""
        })
  return (
    <>
    <div className="modal">
      <div div className="modal-content">
        <span onClick={()=>setopentokentransfer1(false)} className="close">&times;</span>
        <h2>Transfer Token</h2>
        <div className="input-Container" style={{marginTop:"1rem"}}>
          <Input placeholder={" To Address"}
           handleChange={(e)=>settransfertokendata({...transfertokendata, address: e.target.value})} />
          <Input placeholder={"Token Address"}
           handleChange={(e)=>settransfertokendata({...transfertokendata, tokenAdd: e.target.value})} />
          <Input placeholder={"Amount"}
           handleChange={(e)=>settransfertokendata({...transfertokendata, amount: e.target.value})} />
        </div>
        <div className="button-box" style={{marginTop:"1rem"}}>
          {
            address?(<Button name="Token Transfer" handleClick={()=>transferTokens(transfertokendata)}/>):
            (<Button name="Connect Wallet" handleClick={()=>connectWallet()}/>)
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default TokenTransfer
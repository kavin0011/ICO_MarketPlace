import React,{useState,useEffect} from "react";

//INTERNAL IMPORT
import Input from './Input'
import Button from "./Button";

const BuyToken = ({
       array,
       address,
       buyToken,
       connectWallet,
       setOpenBuyToken,
       buyICO,
       currency
}) => {

  const [tokenQuantity, settokenQuantity] = useState(0)
  const [tokenaddress, settokenaddress] = useState();
  console.log("BUY TOKEN",tokenQuantity);
  console.log("BUY TOKEN",`${buyICO?.price}`);
  return(
    <>
    <div className="modal">
      <div div className="modal-content">
        <span onClick={()=>setOpenBuyToken(false)} className="close">&times;</span>
        <h2>Buy Token</h2>
        <div className="input-Container" style={{marginTop:"1rem"}}>
          <Input placeholder={"Quantity"}
           handleChange={(e)=>settokenQuantity(e.target.value)} />
          <Input placeholder={tokenQuantity?`${tokenQuantity*Number(array.icoSalBal)} ${currency}`:"Output"}/>
          <Input placeholder={"Token Address"} handleChange={(e)=>settokenaddress(e.target.value)}/>
          </div>
        <div className="button-box" style={{marginTop:"1rem"}}>
          {
            address?(<Button name="Buy Token" handleClick={()=>buyToken(tokenaddress,tokenQuantity)}/>):
            (<Button name="Connect Wallet" handleClick={()=>connectWallet()}/>)
          }
        </div>
      </div>
    </div>
    </>
  )
};

export default BuyToken;

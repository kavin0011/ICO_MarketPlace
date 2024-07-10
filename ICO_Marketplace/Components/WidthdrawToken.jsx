import React,{useState,useEffect} from "react";

//INTERNAL IMPORT
import Input from './Input'
import Button from "./Button";
import { useStateContext } from "../Context";

const WidthdrawToken = ({
  address,
      withdrawToken,
      connectWallet,
      setopenwithdrawToken
}) => {
  const [withdrawquantity, setwithdrawquantity] = useState({
    token:"",
    amount:""
  })
  return (
    <>
    <div className="modal">
      <div div className="modal-content">
        <span onClick={()=>setopenwithdrawToken(false)} className="close">&times;</span>
        <h2>Withdraw Token</h2>
        <div className="input-Container" style={{marginTop:"1rem"}}>
          <Input placeholder={" Token Address"}
           handleChange={(e)=>setwithdrawquantity({...withdrawquantity, tokenAdd: e.target.value})} />
          <Input placeholder={"Quantity"}
           handleChange={(e)=>setwithdrawquantity({...withdrawquantity, address: e.target.value})} />
          </div>
        <div className="button-box" style={{marginTop:"1rem"}}>
          {
            address?(<Button name="Token Transfer" handleClick={()=>withdrawToken(withdrawquantity)}/>):
            (<Button name="Connect Wallet" handleClick={()=>connectWallet()}/>)
          }
        </div>
      </div>
    </div>
    </>
  )
};

export default WidthdrawToken;

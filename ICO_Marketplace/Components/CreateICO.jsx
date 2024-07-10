import React,{useState} from "react";

//INTERNAL IMPORT
import Input from "./Input";
import Button from "./Button";

const CreateICO = ({
    shortenAddress,
    setopenCreateICO,
    connectWallet,
    address,
    createICOSALE,
    setopencreateico
}) => {
  const [icoSale, seticoSale] = useState({
    address:"",
    price:""
  })
  return (
    <>
    <div className="modal">
      <div div className="modal-content">
        <span onClick={()=>setopencreateico(false)} className="close">&times;</span>
        <h2>Create ICO</h2>
        <div className="input-Container" style={{marginTop:"1rem"}}>
          <Input placeholder={"Address"}
           handleChange={(e)=>seticoSale({...icoSale, address: e.target.value})} />
          <Input placeholder={"Price"}
           handleChange={(e)=>seticoSale({...icoSale, price: e.target.value})} />
        </div>
        <div className="button-box" style={{marginTop:"1rem"}}>
          {
            address?(<Button name="Create ICO" handleClick={()=>createICOSALE(icoSale)}/>):
            (<Button name="Connect Wallet" handleClick={()=>connectWallet()}/>)
          }
        </div>
      </div>
    </div>
    </>
  )
};

export default CreateICO;


import React,{useState} from "react";
//INTERNAL IMPORT
import UploadLogo from "./UploadLogo";
import Input from "./Input";
import Button from "./Button";
const TokenCreator = ({createERC20,
  shortenAddress,
  setopenTokenCreater,
  setLoader,
  address,
  connectWallet,
  PINATA_API_KEY,
  PINATA_SECRENT_KEY}) => {
    const [imageUrl, setimageUrl] = useState("")
    const [token, settoken] = useState({
      name:"",
      symbol:"",
      supply:""
    });
  return(
  <div id={"myModal"} className="modal">
    <div className="modal-content">
      <span onClick={()=>setopenTokenCreater(false)} className="close">
        &times;
      </span>
      <h2 style={{marginBottom:"1rem"}}>Create Token</h2>
      <UploadLogo
        imageUrl={imageUrl} 
        setimageUrl={setimageUrl}
        setLoader={setLoader}
        PINATA_API_KEY={PINATA_API_KEY}
        PINATA_SECRENT_KEY={PINATA_SECRENT_KEY}/>
        <div className="input-Container">
          <Input placeholder ={"Name"}
          handleChange={(e)=>settoken({...token,name:e.target.value})}/>
          <Input placeholder ={"Symbol"}
          handleChange={(e)=>settoken({...token,symbol:e.target.value})}/>
          <Input placeholder ={"Supply"}
          handleChange={(e)=>settoken({...token,supply:e.target.value})}/>
        </div>
        <div className="button-box" style={{marginTop:"1rem"}}>
          {
            address?(<Button name="Create Token" handleClick={()=>createERC20(token,address,imageUrl)}/>):
            (<Button name="Connect Wallet" handleClick={()=>connectWallet()}/>)
          }
        </div>
    </div>
  </div>
  )
};

export default TokenCreator;

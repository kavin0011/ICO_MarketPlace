import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";
import WidthdrawToken from "./WidthdrawToken";

const TokenHistory = ({shortenAddress,setopenTokenHistory}) => {
  const notifyError=(msg)=> toast.error(msg,{duration:4000});
  const notifySuccess=(msg)=> toast.success(msg,{duration:4000});
  const CopyAddress = (text)=>{
    navigator.clipboard.writeText(text);
    notifySuccess("Copied Succesfully");
  };

  const [history, sethistory] = useState(null);
  useEffect(()=>{
    const StoredData = localStorage.getItem("TOKEN_HISTORY");
    if(StoredData){
      const parsedata = JSON.parse(StoredData);
      const dataArray = Array.isArray(parsedata) ? parsedata : [parsedata];
      sethistory(dataArray);
      console.log(dataArray);
    }
  },[]);
  return (
    <>
<div className="modal">
  <div className="modal-content">
    <span onClick={()=>setopenTokenHistory(false)} className="close">&times;</span>
    <h2>Token History</h2>
    <div className="tabe-container">
      <table className="custom-table">
        <thead>
          <td>Logo</td>
          <td>Name</td>
          <td>Symbol</td>
          <td>Supply</td>
          <td>Address</td>
          <td>Hash</td>
        </thead>
        <tbody>
          {history?.map((token,index)=>(
              <tr key={index+1}>
                <td onClick={()=>navigator.clipboard.writeText(token?.logo)}>
                  <img src={token?.logo||"not Uploaded"} alt="not uploaded"
                  style={{
                    width:"30px",
                    height:"auto",
                    borderRadius:"10px",
                  }}></img>
                </td>
                <td>{token?.name}</td>
                <td>{token?.symbol}</td>
                <td>{token?.supply}</td>
                <td onClick={()=>{
                  CopyAddress(token?.tokenAddress)}}>
                  {shortenAddress(token?.tokenAddress)}  
                </td>
                <td onClick={()=>{
                  CopyAddress(token?.transactionHash)}}>
                  {shortenAddress(token?.transactionHash)} <sl-copy-button value="Shoelace rocks!"></sl-copy-button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
</div>
    </>
  )
};

export default TokenHistory;

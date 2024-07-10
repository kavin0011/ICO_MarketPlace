import React from "react";
import toast from "react-hot-toast";

const ICOMarket = ({ array, 
  shortenAddress,
  handleClick,
   currency}) => {
    const notifyError=(msg)=>toast.error(msg,{duration:2000}); 
    const notifySuccess=(msg)=>toast.success(msg,{duration:2000});
    const copyAddress =(text)=>{
      navigator.clipboard.writeText(text);
      notifySuccess("Copied Succesfully");
    };
  return (
    <div className="modal">
  <div className="modal-content">
    <span onClick={()=> handleClick(false)} className="close">
      &times;
      </span>
    <h2>All ICO Created</h2>
    <div className="tabe-container">
      <table className="custom-table">
        <thead>
          <td>Name</td>
          <td>Symbol</td>
          <td>Supply</td>
          <td>Token</td>
          <td>Creater</td>
          <td>Price</td>
        </thead>
        <tbody>
          {array?.map((token,index)=>(
              <tr key={index+1}>
                <td>{token?.name}</td>
                <td>{token?.symbol}</td>
                <td>{token?.icoSalBal}</td>
                <td onClick={()=>{
                  copyAddress(token?.token)}}>
                  {shortenAddress(token?.token)}  
                </td>
                <td onClick={()=>{
                  copyAddress(token?.creater)}}>
                  {shortenAddress(token?.creater)}
                </td>
                <td>{token?.price} {currency}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
};

export default ICOMarket;

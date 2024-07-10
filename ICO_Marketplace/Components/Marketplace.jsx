import React from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Button from "./Button";
const Marketplace = ({
  array, 
  shortenAddress, 
  setbuyICO, 
  setOpenBuyToken,
  currency
}) => {
  const notifyError=(msg)=>toast.error(msg,{duration:2000});
  const notifySuccess=(msg)=>toast.success(msg,{duration:2000});
  const CopyAddress = (text)=>{
    navigator.clipboard.writeText(text);
    notifySuccess("Copied Succesfully");
  };
  return(
    <><div className="tabe-container">
      <table className="custom-table">
        <thead>
          <td>Name</td>
          <td>Symbol</td>
          <td>Supply</td>
          <td>Token</td>
          <td>Creater</td>
          <td>Price</td>
          <td></td>
        </thead>
        <tbody>
          {array?.map((token,index)=>(
              <tr key={index+1}>
                <td>{token?.name}</td>
                <td>{token?.symbol}</td>
                <td>{token?.icoSalBal}</td>
                <td onClick={()=>{
                  CopyAddress(token?.token)}}>
                  {shortenAddress(token?.token)}  
                </td>
                <td onClick={()=>{
                  CopyAddress(token?.creater)}}>
                  {shortenAddress(token?.creater)}
                </td>
                <td>{token?.price} {currency}</td>
                <td onClick={()=>(setbuyICO(false),setOpenBuyToken(true))}><Button name={"Buy"}/></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    </>
  )
};

export default Marketplace;

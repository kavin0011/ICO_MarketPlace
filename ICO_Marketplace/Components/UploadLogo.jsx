import React,{useState,useEffect,useCallback} from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import {useDropzone} from "react-dropzone"

//INTERNAL IMPORT 
import UploadICON from "./SVG/UploadICON";
const UploadLogo = ({imageUrl,
  setimageUrl,
  setLoader,
  PINATA_API_KEY,
  PINATA_SECRENT_KEY}) => {
    const notifyError=(msg)=>toast.error(msg,{duration:4000});
    const notifySuccess=(msg)=> toast.success(msg,{duration:4000});

    const uploadtoIPFS=async(file)=>{
        if(file){
          try {
            setLoader(true);
        
            const PINATA_API_KEY = "ff8bb0e5c012e5a4aa32";
            const PINATA_SECRET_API_KEY = "9652e162fe06ba0ceb91cc1289f025969a90b03c1a3ecfe7c293ea11997ad441";
            const JWT = process.env.NEXT_PUBLIC_JWT_KEY;
        
            if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
              setLoader(false);
              notifyError("API keys are missing");
              return;
            }
        
            const formData = new FormData();
            formData.append("file", file);
        
            const response = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              maxBodyLength: "Infinity",
              headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
                "Content-Type": "multipart/form-data",
              },
            });
        
            const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            setimageUrl(url);
            setLoader(false);
            notifySuccess("Logo Uploaded Successfully");
          } catch (e) {
            setLoader(false);
            notifyError("Check your Pinata keys");
            console.error(e);
          }
        }
    }
    const onDrop = useCallback(async(acceptedFile)=>{
      await uploadtoIPFS(acceptedFile[0]); 
    });
    const {getInputProps,getRootProps}=useDropzone({onDrop,maxSize:500000000000});
  return (
    <>
    {
      imageUrl?(
        <div>
        <img src = {imageUrl} style={{width:"200px",height:"auto"}} alt = "Image Not Found"></img>
        </div>
      ):(
        <div {...getRootProps()}>
          <label htmlFor="file" className="custum-file-upload">
            <div className="icon"><UploadICON/></div>
            <div className="text">
              <span>Click to upload Logo</span>
            </div>
            <input type="file" id="file" {...getInputProps()}/>
          </label>
        </div>
      )
    }
    </>
  )
};

export default UploadLogo;

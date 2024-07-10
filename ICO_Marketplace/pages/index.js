import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useStateContext } from '../Context';
import Button from '../Components/Button';
import BuyToken from '../Components/BuyToken';
import Card from '../Components/Card';
import CreateICO from '../Components/CreateICO';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ICOMarket from '../Components/ICOMarket';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import Marketplace from '../Components/Marketplace';
import PreSaleList from '../Components/PreSaleList';
import Table from '../Components/Table';
import TokenCreator from '../Components/TokenCreator';
import TokenHistory from '../Components/TokenHistory';
import TokenTransfer from '../Components/TokenTransfer';
import UploadLogo from '../Components/UploadLogo';
import WidthdrawToken from '../Components/WidthdrawToken';

const Index = () => {
  const {
    withdrawToken,
    transferTokens,
    buyToken,
    createICOSALE,
    GET_ALL_ICOSALE_TOKEN,
    GET_ALL_USER_ICOSALE_TOKEN,
    createERC20,
    shortenAddress,
    ICO_MARKETPLACE_ADDRESS,
    PINATA_API_KEY,
    PINATA_SECRENT_KEY,
    openBuyToken,
    setOpenBuyToken,
    openWithdrawToken,
    setopenwithdrawToken,
    openTransfertoken,
    setopenTransferToken,
    openTokenCreater,
    setopenTokenCreater,
    openCreateICO,
    setopenCreateICO,
    address,
    setaddress,
    accountBalance,
    loader,
    setLoader,
    connectWallet,
    currency,
    reCall,
  } = useStateContext();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [openAllICO, setopenAllICO] = useState(false);
  const [openTokenHistory, setopenTokenHistory] = useState(false);
  const [openICOMarketplace, setopenICOMarketplace] = useState(false);
  const [opentokentransfer1, setopentokentransfer1] = useState(false);
  const [opencreateico, setopencreateico] = useState(false)

  const [allICOs, setallICOs] = useState([]);
  const [alluserICOs, setalluserICOs] = useState([]);
  const [buyICO, setbuyICO] = useState();

  const copyAddress = () => {
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
    notifySuccess('Copied Successfully');
  };

  useEffect(() => {
    if (address) {
      GET_ALL_ICOSALE_TOKEN().then((token) => {
        console.log('ALL', token);
        setallICOs(token);
      });
      GET_ALL_USER_ICOSALE_TOKEN().then((token) => {
        console.log('USER', token);
        setalluserICOs(token);
      });
    }
  }, [address, reCall]);

  return (
    <div>
      <Header
        accountBalance={accountBalance}
        setAddress={setaddress}
        address={address}
        connectWallet={connectWallet}
        ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
        shortenaddress={shortenAddress}
        setopenAllICO={setopenAllICO}
        setopenTokenCreater={setopenTokenCreater}
        openTokenCreator={openTokenCreater}
        setopenTokenHistory={setopenTokenHistory}
        openTokenHistory={openTokenHistory}
        setopenICOMarketplace={setopenICOMarketplace}
        openICOMarketplace={openICOMarketplace}
        openAllICO={openAllICO}
        opentokentransfer1={opentokentransfer1}
        setopentokentransfer={setopentokentransfer1}
        opencreateico={opencreateico}
        setopencreateico={setopencreateico}
      />
      <div className="create">
        <h1 style={{ fontSize: '2rem' }}>All ICOs MarketPlace</h1>
        {allICOs?.length !== 0 && (
          <Marketplace
            array={allICOs}
            shortenAddress={shortenAddress}
            setbuyICO={setbuyICO}
            setOpenBuyToken={setOpenBuyToken}
            currency={currency}
          />
        )}
        <Card
          setopenAllICO={setopenAllICO}
          setopenTokenCreater={setopenTokenCreater}
          setopenTransferToken={setopenTransferToken}
          setopenTokenHistory={setopenTokenHistory}
          setopenwithdrawToken={setopenwithdrawToken}
          setopenICOMarketplace={setopenICOMarketplace}
          setopenCreateICO={setopenCreateICO}
          copyAddress={copyAddress}
        />
      </div>
      {openTokenCreater && (
        <TokenCreator
          createERC20={createERC20}
          shortenAddress={shortenAddress}
          setopenTokenCreater={setopenTokenCreater}
          setLoader={setLoader}
          address={address}
          connectWallet={connectWallet}
          PINATA_API_KEY={PINATA_API_KEY}
          PINATA_SECRENT_KEY={PINATA_SECRENT_KEY}
        />
      )}
      {openTokenHistory && (
        <TokenHistory shortenAddress={shortenAddress} setopenTokenHistory={setopenTokenHistory} />
      )}
      {opencreateico && (
        <CreateICO
          shortenAddress={shortenAddress}
          setopenCreateICO={setopenCreateICO}
          connectWallet={connectWallet}
          address={address}
          createICOSALE={createICOSALE}
          setopencreateico={setopencreateico}
        />
      )}
      {openAllICO && (
        <ICOMarket
          array={alluserICOs}
          shortenAddress={shortenAddress}
          handleClick={setopenAllICO}
          currency={currency}
        />
      )}
      {openICOMarketplace && (
        <ICOMarket
          array={allICOs}
          shortenAddress={shortenAddress}
          handleClick={setopenICOMarketplace}
          currency={currency}
        />
      )}
      {openBuyToken && <BuyToken 
      array={alluserICOs}
       address={address}
       buyToken={buyToken}
       connectWallet={connectWallet}
       setOpenBuyToken={setOpenBuyToken}
       buyICO={buyICO}
       currency={currency}/>}
      {opentokentransfer1 && <TokenTransfer
      address={address}
      transferTokens={transferTokens}
      connectWallet={connectWallet}
      setopenTransferToken={setopenTransferToken}
      setopentokentransfer1={setopentokentransfer1}
      />}
      {openWithdrawToken && <withdrawToken
      address={address}
      withdrawToken={withdrawToken}
      connectWallet={connectWallet}
      setopenwithdrawToken={setopenwithdrawToken} />}
      <Footer />
      {loader && <Loader />}
    </div>
  );
};

export default Index;

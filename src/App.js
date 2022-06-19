import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";




import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import Magazino from  './contract/Magazino.abi.json';
import Magazines from './components/Magazines';
import NewMagazine from './components/NewMagazine';


const ERC20_DECIMALS = 18;


const contractAddress = "0x3E9E94aB53f989173e212E64275D80e5e4bB75a0";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";




function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [magazines, setMagazines] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error Occurred");
      
     }
   };
 
    
   const getBalance = (async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(Magazino, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  });


  
  const unpublishMagazine = async (_index) => {
    try {
      await contract.methods.unpublishMagazine(_index).send({ from: address });
      getMagazine();
      getBalance();
    } catch (error) {
      alert(error);
    }};
   

 
   
   const getMagazine =  async () => {
     const magazinesLength = await contract.methods.getmagazineslength().call();
     console.log(magazinesLength);
     const _magazinn = []
     for (let index = 0; index < magazinesLength; index++) {
       console.log(magazinesLength);
       let _magazines = new Promise(async (resolve, reject) => {
       let magazine = await contract.methods.getMagazine(index).call();

       resolve({
        index: index,
        owner: magazine[0],
        image: magazine[1],
        name: magazine[2],
        edition: magazine[3],
       price: magazine[4],
       magazineid: magazine[5]

                 
      });
    });
    _magazinn.push(_magazines);
  }
  const _magazines = await Promise.all(_magazinn);
  setMagazines(_magazines);
  console.log(magazines)
  
};


useEffect(() => {
  connectToWallet();
}, []);

useEffect(() => {
  if (kit && address) {
    getBalance();
   
  }
}, [kit, address]);

useEffect(() => {
  if (contract) {
    getMagazine();
  }
}, [contract]);  


const addMagazine = async (
  _image,
  _name,
  _edition,
  price
) => {

  const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .addMagazine(_image, _name, _edition, _price)
        .send({ from: address });
       getMagazine();
    } catch (error) {
      console.log(error);
    }
  };

  const buyMagazine = async (_index,) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    
      
      await cUSDContract.methods
        .approve(contractAddress, magazines[_index].price)
        .send({ from: address });
      await contract.methods.buyMagazine(_index).send({ from: address });
      getMagazine();
      getBalance();
    } catch (error) {
      console.log(error)
    }};

  



  return (
    <div>
      <Navbar balance = {cUSDBalance} />
      <Magazines magazines ={magazines}
      buyMagazine = {buyMagazine}
      unpublishMagazine = {unpublishMagazine}
      Owner={address}
       
       
      
       
      />
       <NewMagazine addMagazine = {addMagazine}
       
/>
    </div>
    )
  }

export  default App;

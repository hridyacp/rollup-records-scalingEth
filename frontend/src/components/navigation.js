import { useEffect, useRef, useState } from "react";
import ghoLogo from '../Assets/logobg.png';
import user from '../Assets/profile.png';
import { Grid } from "@mui/material";
import connectWal from "../Assets/connectWallet.png";

function Navigation({setAccount,setIsConnected,isConnected}) {
    const node = useRef();
// const connectWallet=async()=>{      
//     if (window.ethereum) {
//         try{
//      const accounts= await window.ethereum.request({ method: 'eth_requestAccounts' });
//      console.log(accounts,"accounts")
//      if(accounts.length>0){
//      setAccount(accounts[0])
//      localStorage.setItem("walletAddress",accounts[0]);
//      setIsConnected(true);
//      }
//      else{
//         setIsConnected(false);
//      }
//     }
//     catch{
//         console.log("user refused to connect")
//     }
//      //If yes
//      //setIsConnected(true);
//      //setIsNickName(false)
//      //else
   
//      //send another api with nickname and wallet address
//       // const provider = new ethers.providers.Web3Provider(window.ethereum);
//     }
//     else{
//         alert("Please install metamask");
//         window.open('https://metamask.io/','_blank')
//     }
//   }
//   useEffect(()=>{
//     if(window.ethereum){
//      window.ethereum.on('accountsChanged', (accounts) => {
//      if(accounts?.length===0){
//      localStorage.clear();
//      setIsConnected(false);
//      }
//    });
//     }
//    },[])
//    useEffect(()=>{
//     if(localStorage.getItem("walletAddress")!==null && localStorage.getItem("walletAddress")!=='' && localStorage.getItem("walletAddress")!==undefined){
//       setIsConnected(true)
//     }
//        else{
//         setIsConnected(false)
//        }
//     },[])
   
  return (
    <div className="p-2 flex justify-between w-[100%]">
        <img width="130px" height="15px" className="ml-8" src={ghoLogo} alt="ghologo" />
    {/* {!isConnected?
  <button className="text-white p-2 mt-2 mr-16 h-[40px] text-lg font-mont font-normal"  onClick={connectWallet}> <img width="60px" height="15px" className="ml-8" src={connectWal} alt="connect wallet" /></button>
  : <> */}
  <Grid item xs={2} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
  <img width="55px" height="55px" className="mr-16 mt-2" src={user} alt="user" style={{opacity:"1"}} />
  </Grid>
  {/* </>} */}
 
  </div>
  )
}
export default Navigation;
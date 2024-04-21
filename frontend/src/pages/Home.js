import { useState } from "react";
import vid from "../Assets/video.mp4";
import Navigation from "../components/navigation";
import "./home.css";
import gitIcon from "../Assets/github.png";
import fbIcon from "../Assets/fb.png";
import LnIcon from "../Assets/ln.png";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

function Home(){
    const [account,setAccount]=useState("");
    const [isConnected,setIsConnected]=useState(true);
    const [type,setType]=useState('');
    const [price,setPrice]=useState(0);
    const [quantity,setQuantity]=useState(0);
    const [isSuccess,setIsSuccess]=useState(false);
   const vertical='top';
   const horizontal='right';
    const handleClose=()=>{
      setIsSuccess(false);
    }

    const getOrder=async()=>{
      console.log(type,price,quantity)
      try{
      const response = await axios.post("http://localhost:4000/order", {
                        type: type,
                        price:price,
                        quantity:quantity
                    })
                    console.log(response,"axios response")  
                    if(response){
                      setIsSuccess(true);
                    }
                  } catch{
                    console.log("error");
                    setIsSuccess(false);
                  }             
    }
    const handleInput=(e,inType)=>{
      console.log(e.target.value,"e")
if(inType==="type"){
  setType(e.target.value);
}
else if(inType==="price"){
  setPrice(e.target.value)
}
else if(inType==="quantity"){
  setQuantity(e.target.value)
}
    }

    return(
        <div className="h-[100%]">
        <video autoPlay loop muted>
                  <source src={vid} type = 'video/mp4' autoPlay loop/>
                  </video>
                <div container className="absolute w-[100%] h-[100%]">
                <div container className="flex flex-col justify-around gap-10 w-[100%] h-[100%]">
                <Navigation setAccount={(account)=>setAccount(account)} setIsConnected={(isConnected)=>setIsConnected(isConnected)} isConnected={isConnected}/>
                <div className="flex justify-center items-center content-center h-[100%] pt-8">
                <div className="card-container item-center content-center text-white flex flex-col gap-8 justify-between p-10 border-none rounded-lg max-h-[650px] min-w-[400px]">
          <div></div>
        <div className="flex flex-col gap-4 justify-start">
        <div className="flex flex-col gap-1">
           <label className="text-md font-normal text-left">Type</label>
            {/* <input type="text" className="border-none rounded-lg h-[40px] " name="collateral"  onChange={(e)=>handleInput(e,"collateral")}/> */}
            <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          sx={{backgroundColor:"white",borderRadius:"10px",height:"45px"}}
          onChange={(e)=>handleInput(e,"type")}
        >
          <MenuItem value={"bid"}>Bid</MenuItem>
          <MenuItem value={"ask"}>Ask</MenuItem>
        </Select>
      </FormControl>
    </Box>
          </div>
            <div className="flex flex-col gap-1">
            <label className="text-md font-normal text-left font-mont font-400">Price</label>
            <input type="text" name="tokens" defaultValue={price}  className="border-none rounded-lg h-[40px] text-black font-mont font-normal p-2"  onChange={(e)=>handleInput(e,"price")}/>
            
            </div> 
            <div className="flex flex-col gap-1">
            <label className="text-md font-normal text-left font-mont font-400">Quantity</label>
            <input type="text" name="tokens" defaultValue={quantity}  className="border-none rounded-lg h-[40px] text-black font-mont font-normal p-2"  onChange={(e)=>handleInput(e,"quantity")} />
            
            </div> 
              
            </div>
            <div className=" flex justify-center gap-4">
            <button onClick={getOrder} className="bg-white text-black text-[16px] text-center font-normal rounded-lg p-2 hover:bg-[#EBC351] font-mont font-400">Place Order</button>
            </div>
                  
           
        </div>
        </div>
      <div className="flex justify-around items-center mt-40">
  <div class="card card0">
    <div class="border">
      <h2>Built By: Hridya</h2>
      <div class="icons">
      <img className={"fa"} width={"40px"} height="40px" src={LnIcon} alt="linkdin" />
                                <img className={"fa"} width={"40px"} height="40px" src={fbIcon} alt="FB" />
                                <img  className={"fa"} width={"40px"} height="40px" src={gitIcon} alt="Git" />
      </div>
    </div>
  </div>

<footer className="footer-section">
        <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div className="copyright-text">
                            <p>Copyright &copy; 2018, All Right Reserved Hridya</p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </footer>
    </div>  

              </div>
                </div>
                <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Placed order successfully
  </Alert>
  </Snackbar>
                </div>
  
    )
}
export default Home;
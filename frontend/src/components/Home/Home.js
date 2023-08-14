import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Home = ({ userInfo }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("buy");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorReceiverId, setErrorReceiverId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  const handleTabChange = (tab) => {
    setSuccess('');
    setError('');
    setErrorAmount('');
    setErrorReceiverId('');
    setActiveTab(tab);
  };
  

  const onBuyClick = (ele) => {
    setErrorAmount('');
    var buyamount= document.getElementById('buyamount').value;
    if(!buyamount || buyamount === "0"){ 
      setErrorAmount("Buying amount should be greater than 0.");
      return;
    }

    let config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_PATH}transactions/buy`,
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: { tacos: buyamount }
    };

    axios.request(config).then((res) => {
      setSuccess(res.data.msg);

      localStorage.setItem("tacos", res.data.data.tacos);
      localStorage.setItem("wallet", res.data.data.wallet);

      setTimeout(() => {
        setSuccess("");
        document.getElementById('buyamount').value = "";
      }, 2000);
    }).catch((err)=> {
      if(typeof err.response.data === 'string' && err.response.data === 'Unauthorized'){
        localStorage.clear();
        navigate("/login");
      }else{
        setError(err.response.data.error);
      }
    });
  };

  const onSellClick = (ele) => {
    setErrorAmount('');
    var sellamount= document.getElementById('sellamount').value;
    if(!sellamount || sellamount === "0"){ 
      setErrorAmount("Sell amount should be greater than 0.");
      return;
    }

    let config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_PATH}transactions/sell`,
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: { tacos: sellamount }
    };

    axios.request(config).then((res) => {
      setSuccess(res.data.msg);
      
      localStorage.setItem("tacos", res.data.data.tacos);
      localStorage.setItem("wallet", res.data.data.wallet);

      setTimeout(() => {
        setSuccess("");
        document.getElementById('sellamount').value = "";
      }, 2000);
    }).catch((err)=> {
      if(typeof err.response.data === 'string' && err.response.data === 'Unauthorized'){
        localStorage.clear();
        navigate("/login");
      }else{
        setError(err.response.data.error);
      }
    });
  };

  const onTransClick = (ele) => {
    setErrorAmount('');
    setErrorReceiverId('');
    var receiverid= document.getElementById('receiverid').value;
    if(!receiverid || receiverid === ""){ 
      setErrorReceiverId("Receiver Id is required.");
      return;
    }
    var transAmount= document.getElementById('transAmount').value;
    if(!transAmount || transAmount === "0"){ 
      setErrorAmount("Tacos Amount should be greater than 0.");
      return;
    }

    let config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_PATH}transactions/transfer`,
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: { sender: localStorage.getItem("userId"), receiver: receiverid, tacos: transAmount }
    };

    axios.request(config).then((res) => {
      setSuccess(res.data.msg);
      
      localStorage.setItem("tacos", res.data.data.tacos);
      localStorage.setItem("wallet", res.data.data.wallet);

      setTimeout(() => {
        setSuccess("");
        document.getElementById('receiverid').value = "";
        document.getElementById('transAmount').value = "";
      }, 2000);
    }).catch((err)=> {
      if(typeof err.response.data === 'string' && err.response.data === 'Unauthorized'){
        localStorage.clear();
        navigate("/login");
      }else{
        setError(err.response.data.error);
      }
    });
  };

  useEffect(() => {
    if(!userId){
      navigate("/login");
    }
  }, []);

  return (
    <div className="profile">
      <Header />
      {/* <h1 style={{ color: "white" }}>Welcome {username} !!</h1> */}
      <div className={basestyle.mainWrapper}>
        <div className={basestyle.tabs}>
          <div
            className={`${basestyle.tab} ${activeTab === "buy" ? basestyle.active : ""}`}
            onClick={() => handleTabChange("buy")}
          >
            Buy
          </div>
          <div
            className={`${basestyle.tab} ${activeTab === "sell" ? basestyle.active : ""}`}
            onClick={() => handleTabChange("sell")}
          >
            Sell
          </div>
          <div
            className={`${basestyle.tab} ${activeTab === "trade" ? basestyle.active : ""}`}
            onClick={() => handleTabChange("trade")}
          >
            Transfer
          </div>
        </div>
        <div className={basestyle.tabContent}>
          {
            activeTab === "buy" ? (<>
              <form>
                <input
                  type="number"
                  name="buyamount"
                  id="buyamount"
                  placeholder="Tacos Value"
                />
                {errorAmount ? <p className={basestyle.error}>{errorAmount}</p> : "" }
                {error ? <p className={basestyle.error}>{error}</p> : "" }
                {success ? <p className="alert-success">{success}</p> : "" }
                <button type="button" className={basestyle.button_common} onClick={onBuyClick}>
                  Buy
                </button>
              </form></>):
            activeTab === "sell" ? (<>
              <form>
                <input
                  type="number"
                  name="sellamount"
                  id="sellamount"
                  placeholder="Tacos Value"
                />
                {errorAmount ? <p className={basestyle.error}>{errorAmount}</p> : "" }
                {success ? <p className="alert-success">{success}</p> : "" }
                {error ? <p className={basestyle.error}>{error}</p> : "" }
                <button type="button" className={basestyle.button_common} onClick={onSellClick}>
                  Sell
                </button>
              </form>
            </>):(<>
              <form>
                <input
                  type="text"
                  name="senderid"
                  id="senderid"
                  placeholder="Sender id"
                  value={userId}
                  disabled
                  readOnly
                />
                <input
                  type="text"
                  name="receiverid"
                  id="receiverid"
                  placeholder="Receiver id"
                />
                {errorReceiverId ? <p className={basestyle.error}>{errorReceiverId}</p> : "" }
                <input
                  type="number"
                  name="transAmount"
                  id="transAmount"
                  placeholder="Tacos Value"
                />
                {errorAmount ? <p className={basestyle.error}>{errorAmount}</p> : "" }
                {error ? <p className={basestyle.error}>{error}</p> : "" }
                {success ? <p className="alert-success">{success}</p> : "" }
                <button type="button" className={basestyle.button_common} onClick={onTransClick}>
                  Transfer
                </button>
              </form>
            </>)
          }
        </div>
      </div>
    </div>
  );
};

export default Home;

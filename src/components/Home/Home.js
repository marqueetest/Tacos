import React, { useState } from "react";
import basestyle from "../Base.module.css";
import Header from "../Header";

const Home = ({ setUserState, username }) => {
  const [activeTab, setActiveTab] = useState("buy"); // Default active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  let tabContent = null;

  if (activeTab === "buy") {
    tabContent =
      <form>
        <input
          type="number"
          id="buyamount"
          placeholder="amount"
        />
        <button className={basestyle.button_common}>
          Buy
        </button>
      </form>;
  } else if (activeTab === "sell") {
    tabContent =
      <form>
        <input
          type="number"
          id="sellamount"
          placeholder="amount"
        />
        <button className={basestyle.button_common}>
          Sell
        </button>
      </form>;
  } else if (activeTab === "trade") {
    tabContent = <form>
      <input
        type="number"
        id="senderid"
        placeholder="Sender id"
      />
      <input
        type="number"
        id="receiverid"
        placeholder="Receiver id"
      />
      <input
        type="number"
        id="amount"
        placeholder="Amount"
      />
      <button className={basestyle.button_common}>
        Transfer
      </button>

    </form>;;
  }

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
          {tabContent}
        </div>
      </div>
      {/* <button className={basestyle.button_common} onClick={() => setUserState({})}>
        Logout
      </button> */}
    </div>
  );
};

export default Home;

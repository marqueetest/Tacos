import React, { useState, useEffect } from "react";
import Header from "../Header";
import basestyle from "../Base.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaWallet} from "react-icons/fa"


const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        let config = {
            method: 'get',
            url: `${process.env.REACT_APP_BASE_PATH}users`,
            headers: { 
              'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
          };

        axios.request(config).then((res) => {
            
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("userId", res.data._id);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("tacos", res.data.tacos);
            localStorage.setItem("wallet", res.data.wallet);

            setUser(res.data);
        }).catch((err)=> {
            if(typeof err.response.data === 'string' && err.response.data === 'Unauthorized'){
                localStorage.clear();
                navigate("/login");
            }
        });
    }, []);

    return (
        <div className="profile">
            <Header />
            <div className={basestyle.mainWrapper}>
                <h4>Tacos</h4>
                <h6 className={basestyle.username}>welcome, {user.username}</h6>
                <div className={basestyle.wrapper}>
                    <span>Tacos</span>
                    <span> {user.tacos} </span>
                </div>
                <div className={basestyle.wrapper}>
                    <div className={basestyle.walletLeft}>
                        <span>Wallet</span>
                        <span>${user.wallet}</span>
                    </div>
                    <div className={basestyle.walletRight}>
                        <button type="button">
                        <FaWallet size={30}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;


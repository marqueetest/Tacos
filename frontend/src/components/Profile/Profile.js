import React, { useState, useEffect } from "react";
import Header from "../Header";
import basestyle from "../Base.module.css";

const Profile = () => {

    return (
        <div className="profile">
            <Header />
            <div className={basestyle.mainWrapper}>
                <h4>welcome,username</h4>
                <div className="wallet">
                    <span>wallet</span>
                    <span>$2500.00</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;


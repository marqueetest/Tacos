import React from 'react';
import basestyle from "./Base.module.css";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    const onClick =()=>{
      navigate("/profile");
    };

    const onBackClick =()=>{
      navigate(-1);
    };

    const onLogout =()=>{
      localStorage.clear();
      navigate("/login");
    };

    return (
      <nav className={basestyle.navbar}>
        <div className={basestyle.logo} onClick={onBackClick}>Tacos</div>
        <ul className={basestyle.navlinks}>
          <li><a href="javascript:;" onClick={onClick}>Profile</a></li>
          <li><a href="javascript:;" onClick={onLogout}>Log Out</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Header;

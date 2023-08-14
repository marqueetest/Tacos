import React from 'react';
import basestyle from "./Base.module.css";
const Header = () => {
    return (
      <nav className={basestyle.navbar}>
        <div className={basestyle.logo}>Logo</div>
        <ul className={basestyle.navlinks}>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Header;

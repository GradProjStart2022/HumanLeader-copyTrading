// src/components/Nav.js

import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Nav.css'

const Nav = () => {
  return (
    <nav>
      <div>
        <NavLink to="/" className="navbutton" >
            Dashboard
        </NavLink>
      </div>
    <div>
        <NavLink to="/Userboard" className="navbutton" >
          USER
        </NavLink>
      </div>
    <div>
        <NavLink to="/leaderboard" className="navbutton" >
          LEADER
        </NavLink>
      </div>
    <div>
        <NavLink to="/Subboard" className="navbutton" >
          SUBSCRIBE
        </NavLink>
      </div>
    <div>
        <NavLink to="/Tradeboard" className="navbutton" >
          TRADE
        </NavLink>
      </div>
    <div>
        <NavLink to="/Settingboard" className="navbutton" >
          SETTING
        </NavLink>
      </div>
      
    </nav>
  );
};

export default Nav;
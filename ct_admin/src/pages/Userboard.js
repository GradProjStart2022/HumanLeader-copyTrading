// src/pages/Userboard

import React from "react";
import UserTable from '../components/tables/UserTable'
import Useradd from "../components/addpopups/Useradd";

import '../styles/pages/userpage.css'
import '../styles/PageCommon.css'


class Userboard extends React.Component {
  render () {
    return (
      <div className="contentsArea">
      <div className="userpage">
        <div className="header">
          <h1>User</h1>
          <Useradd/>        
        </div>
        <UserTable/>
      </div>
      </div>
    )
    
  }
}

export default Userboard;
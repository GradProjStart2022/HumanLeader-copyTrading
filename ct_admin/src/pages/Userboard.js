// src/pages/Userboard

import React from "react";
import UserTable from '../components/tables/UserTable'

import '../styles/pages/userpage.css'
import '../styles/PageCommon.css'


class Userboard extends React.Component {
  render () {
    return (
      <div className="contentsArea">
      <div className="userpage">
        <h1>User</h1>
        <UserTable/>
      </div>
      </div>
    )
    
  }
}

export default Userboard;
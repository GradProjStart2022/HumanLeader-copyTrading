// src/pages/Dashboard

import React from "react";

import UserTable from '../components/tables/UserTable'
import LeaderTable from '../components/tables/LeaderTable'
import SubTable from '../components/tables/Subtable'
import TreadeTable from '../components/tables/TradeTable'



import '../styles/pages/dashboardpage.css'
import '../styles/PageCommon.css'
import '../styles/modal.css'


class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      showPopup : false
    };
  }
  

  render () {
    return (
      <div className="contentsArea">
        <div className="dashboardpage" >
          <h1>Dashboard</h1>

          <div style = {{ 
            "display": "grid", 
            "grid-template-columns" : "1fr 1fr",
            "column-gap": "20px",
            "padding-right" : "20px"}}>
          <h3>User</h3>
          <h3>Leader</h3>
            <div style={{ height: "130px", overflowY: "scroll" }}>
                
                <UserTable/>
            </div>
            <div style={{ height: "130px", overflowY: "scroll" }}>
                <LeaderTable/>
            </div>
          
            <h3>Subscribe</h3>
            <h3>Trade</h3>

            <div style={{ height: "130px", overflowY: "scroll" }}>
                <SubTable/>
            </div>

            <div style={{ height: "130px", overflowY: "scroll" }}>
                <TreadeTable/>
            </div>

            </div>
          
            
        </div>
      </div>
    )
  }
}

export default Dashboard;
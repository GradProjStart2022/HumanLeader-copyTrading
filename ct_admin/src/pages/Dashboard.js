// src/pages/Dashboard

import React from "react";
import DisplayTable from "../components/displayTable";
import '../styles/pages/dashboardpage.css'
import '../styles/PageCommon.css'

class Dashboard extends React.Component {
  render () {
    return (
      <div className="contentsArea">
        <div className="dashboardpage">
          <h1>Dashboard</h1>
            <DisplayTable/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
// src/pages/Leaderboard

import React from "react";
import LeaderTable from "../components/tables/LeaderTable"
import Leaderadd from "../components/addpopups/Leaderadd"

import '../styles/pages/leaderpage.css'
import '../styles/PageCommon.css'
import '../styles/pages/dashboardpage.css'
import '../styles/PageCommon.css'

class Leaderboard extends React.Component {
  render () {
    return (
      <div className="contentsArea">
        <div className="leaderpage">
            <div className="header">
              <h1>Leader</h1>
              <Leaderadd/>
            </div>
            <LeaderTable/>
        </div>
      </div>
    )
  }
}

export default Leaderboard;
// src/pages/Leaderboard

import React from "react";
import LeaderTable from "../components/tables/LeaderTable"

import '../styles/pages/leaderpage.css'
import '../styles/PageCommon.css'
import '../styles/pages/dashboardpage.css'
import '../styles/PageCommon.css'

class Leaderboard extends React.Component {
  render () {
    return (
      <div className="contentsArea">
        <div className="leaderpage">
          <h1>Leader</h1>
            <LeaderTable/>
        </div>
      </div>
    )
  }
}

export default Leaderboard;
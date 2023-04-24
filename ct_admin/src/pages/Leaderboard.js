// src/pages/Leaderboard

import React from "react";
import LeaderTable from "../components/LeaderTable"

import '../styles/pages/leaderpage.css'
import '../styles/PageCommon.css'
import '../styles/pages/dashboardpage.css'
import '../styles/PageCommon.css'


const callAPI = () => {
  fetch("http://124.50.247.56:3000/leader/all")
  .then(response => response.json())
  .then(data => {
      console.log(JSON.stringify(data.data))
  })
  .catch(error => console.error(error));
}

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
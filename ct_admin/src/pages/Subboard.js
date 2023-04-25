// src/pages/Subboard

import React from "react";
import SubTable from '../components/tables/Subtable'
import Subadd from '../components/addpopups/Subadd'

import '../styles/pages/subpage.css'
import '../styles/PageCommon.css'
import '../styles/pages/dashboardpage.css'
import '../styles/PageCommon.css'

class Subboard extends React.Component {
  render () {
    return (
    <div className="contentsArea">
      <div className="subpage">
        <div className="header">
          <h1>Subscribe</h1>
          <Subadd/>
        </div>
          <SubTable/>
          
      </div>
    </div>
    )
  }
}

export default Subboard;
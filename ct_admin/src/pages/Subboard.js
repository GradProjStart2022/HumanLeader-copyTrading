// src/pages/Subboard

import React from "react";
import SubTable from '../components/Subtable'

import '../styles/pages/subpage.css'
import '../styles/PageCommon.css'
import '../styles/pages/dashboardpage.css'
import '../styles/PageCommon.css'

class Subboard extends React.Component {
  render () {
    return (
    <div className="contentsArea">
      <div className="subpage">
        <h1>Subscribe</h1>
          <SubTable/>
          
      </div>
    </div>
    )
  }
}

export default Subboard;
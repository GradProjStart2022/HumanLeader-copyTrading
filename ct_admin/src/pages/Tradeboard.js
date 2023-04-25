// src/pages/Tradeboard

import React from "react";
import TradeTable from '../components/tables/TradeTable'

import '../styles/pages/tradepage.css'
import '../styles/PageCommon.css'


class Tradeboard extends React.Component {
  render () {
    return (
      <div className="contentsArea">
      <div className="tradepage">
      <div className="header">
          <h1>Trade</h1>
                   
        </div>
          <TradeTable/>
      </div>
      </div>
    )
  }
}

export default Tradeboard;
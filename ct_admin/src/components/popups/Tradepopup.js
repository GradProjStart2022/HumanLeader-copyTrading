import React from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'

const TradePopup = (props) => {
  return (
    <Popup 
          trigger={ <button> Edit </button> } 
          modal
          nested
          style = {{ borderRadius : '5px'}}
          contentStyle = {{'background' : '#fff' , 'borderRadius':'5px'}}
          overlayStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
          
          {
            close => (
              <div className="Modal" >
                  <button className='close' onClick={()=>{close();}} >
                    &times;
                  </button>
                  <div className="header"> USER INFO </div>
                  <div className="contents"> 

                    <div className="inputdata">
                      <label>HISTORY_SEQ</label>
                      <input className="inputtext" value={`${props.item.HISTORY_SEQ}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>FOLLOWING_SEQ</label>
                      <input className="inputtext" value={`${props.item.FOLLOWING_SEQ}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>TRADE_TYPE</label>
                      <input className="inputtext" value={`${props.item.TRADE_TYPE}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>TRADE_ST</label>
                      <input className="inputtext" value={`${props.item.TRADE_ST}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>TRADE_NUM</label>
                      <input className="inputtext" value={`${props.item.TRADE_NUM}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>TRADE_SYMBOL</label>
                      <input className="inputtext" value={`${props.item.TRADE_SYMBOL}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>TRADE_MARKET</label>
                      <input className="inputtext" value={`${props.item.TRADE_MARKET}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>TRADE_PRICE</label>
                      <input className="inputtext" value={`${props.item.TRADE_PRICE}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>TRADE_VOLUME</label>
                      <input className="inputtext" value={`${props.item.TRADE_VOLUME}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>REG_DT</label>
                      <input className="inputtext" type="datetime" value={`${props.item.REG_DT}`} ></input>
                    </div>

                    <span>

                    </span>
                  
                  </div>
                  <div className="Actions">
                    <button 
                      className="button"
                      onClick = {()=>{close();}}
                    >
                      ok
                    </button>
                  </div>
              </div>


            )
          }


        </Popup>
  )
}

export default TradePopup
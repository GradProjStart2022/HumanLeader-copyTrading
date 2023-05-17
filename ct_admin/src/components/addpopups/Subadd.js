// src/components/addpopups/addSub.js

import React from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'

const Subadd = (props) => {
  return (
    <Popup 
          trigger={ <button style={{'marginLeft':'26px'}} > Add </button> } 
          modal
          nested
          style = {{ borderRadius : '5px'}}
          contentStyle = {{'background' : '#fff' , 'borderRadius':'5px'}}
          overlayStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
>
          
          {
            close => (
              <div className="Modal" 
                style = {{
                    "width" : "800px",
                }}
              
              >
                  <button className='close' onClick={()=>{close();}} >
                    &times;
                  </button>
                  <div className="header"> USER INFO </div>
                  <div className="sub-contents  contents" > 

                    <div className="inputdata">
                      <label>FOLLOWING_SEQ</label>
                      <input className="inputtext"></input>
                    </div>

                    <div className="inputdata">
                      <label>PUBLIC_ID</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>LEADER_SEQ</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>PURCHASE_TOKEN</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>FOLLOWING_TYPE</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>COPY_TRADE_TYPE</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>FIXED_AMOUNT</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>FIXED_RATIO</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>STOP_RATIO</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>IS_AUTO_TRADING_YN</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>FIXED_RATIO</label>
                      <input className="inputtext" ></input>
                    </div>
                    
                    <div className="inputdata">
                      <label>SUB_START_DT</label>
                      <input className="inputtext" type="datetime"  ></input>
                    </div>

                    <div className="inputdata">
                      <label>SUB_END_DT</label>
                      <input className="inputtext" type="datetime"  ></input>
                    </div>

                    <div className="inputdata">
                      <label>FOLLOWING_ST</label>
                      <input className="inputtext" ></input>
                    </div>

                    <div className="inputdata">
                      <label>REG_DT</label>
                      <input className="inputtext" type="datetime"  ></input>
                    </div>

                    <div className="inputdata">
                      <label>MOD_DT</label>
                      <input className="inputtext" type="datetime" ></input> 
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

export default Subadd
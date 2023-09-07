// src/components/popups/Leaderpopup.js

import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'

const LeaderPopup = (props) => {
  let [leaderData, setleaderData] = useState({
    ACCESS_KEY : props.item.ACCESS_KEY,
    SECRET_KEY : props.item.SECRET_KEY,
  })

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
                  <div className="header"> LEADER INFO </div>
                  <div className="contents"> 

                    <div className="inputdata">
                      <label>LEADER_SEQ</label>
                      <input className="inputtext" value={`${props.item.LEADER_SEQ}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>LEADER_UID</label>
                      <input className="inputtext" value={`${props.item.LEADER_UID}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>LEADER_NAME</label>
                      <input className="inputtext" value={`${props.item.LEADER_NAME}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>LEADER_IMAGE</label>
                      <input className="inputtext" value={`${props.item.LEADER_IMAGE}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>LEADER_CAPACITY</label>
                      <input className="inputtext" value={`${props.item.LEADER_CAPACITY}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>LEADER_PRICE</label>
                      <input className="inputtext" value={`${props.item.LEADER_PRICE}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>LEADER_AMOUNT</label>
                      <input className="inputtext" value={`${props.item.LEADER_AMOUNT}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>EXCHANGE_TYPE</label>
                      <input className="inputtext" value={`${props.item.EXCHANGE_TYPE}`}></input>
                    </div>
                    
                    <div className="inputdata">
                      <label>TRADER_ST</label>
                      <input className="inputtext" value={`${props.item.TRADER_ST}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>ACCESS_KEY</label>
                      <input className="inputtext" value={`${leaderData.ACCESS_KEY}`}
                        onChange = { (e) => {setleaderData({...leaderData, ACCESS_KEY: e.target.value})}}
                      ></input>
                    </div>

                    <div className="inputdata">
                      <label>SECRET_KEY</label>
                      <input className="inputtext" value={`${leaderData.SECRET_KEY}`}
                        onChange = { (e) => {setleaderData({...leaderData, SECRET_KEY: e.target.value})}}
                      ></input>
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

export default LeaderPopup
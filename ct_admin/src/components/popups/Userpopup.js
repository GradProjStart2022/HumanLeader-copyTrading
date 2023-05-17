// src/components/popups/Userpopup.js

import React from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'

const UserPopup = (props) => {
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
                      <label>PUBLIC_SEQ</label>
                      <input className="inputtext" value={`${props.item.PUBLIC_SEQ}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>PUBLIC_ID</label>
                      <input className="inputtext" value={`${props.item.PUBLIC_ID}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>PUBLIC_ST</label>
                      <input className="inputtext" value={`${props.item.PUBLIC_ST}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>REG_DT</label>
                      <input className="inputtext" type="datetime" value={`${props.item.REG_DT}`} ></input>
                    </div>

                    <div className="inputdata">
                      <label>MOD_DT</label>
                      <input className="inputtext" type="datetime" value={`${props.item.MOD_DT}`} ></input>
                    </div>

                    <div className="inputdata">
                      <label>ACCESS_KEY</label>
                      <input className="inputtext" value={`${props.item.ACCESS_KEY}`}></input>
                    </div>

                    <div className="inputdata">
                      <label>SECRET_KEY</label>
                      <input className="inputtext" value={`${props.item.SECRET_KEY}`}></input>
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

export default UserPopup
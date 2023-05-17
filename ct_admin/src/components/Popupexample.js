// src/components/Popupexample.js


import React from 'react';
import Popup from 'reactjs-popup';

import '../styles/modal.css'

const TempPopup = (props) => {
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
                      <label>NAME</label>
                      <input className="inputtext" ></input>
                    </div>
                    <div className="inputdata">
                      <label>PW</label>
                      <input className="inputtext" value={`${props.item.PUBLIC_ID}`}></input>
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

export default TempPopup
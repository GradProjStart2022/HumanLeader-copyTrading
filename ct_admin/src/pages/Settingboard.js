// src/pages/Settingboard

import React from "react";
import Popup from 'reactjs-popup'

import '../styles/pages/settingpage.css'
import '../styles/PageCommon.css'
import '../styles/modal.css'



class Settingboard extends React.Component {
  render () {
    return (
    <div className="contentsArea">
      <div className="settingpage">
        <h1>Setting</h1>
        <Popup 
          trigger={ <button> Trigger </button> } 
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
                  <div className="header"> Modal header </div>
                  <div className="contents"> 
                    <div className="inputdata">
                      <label>NAME</label>
                      <input className="inputtext" ></input>
                    </div>
                    <div className="inputdata">
                      <label>PW</label>
                      <input className="inputtext" value={"before password"}></input>
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

      </div>
    </div>
    )
  }
}

export default Settingboard;
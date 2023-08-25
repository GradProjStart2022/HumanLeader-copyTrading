// src/components/popups/Userpopup.js

import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'

function edit_date(dateString) {
  const parts = dateString.split('.'); // 문자열을 '.'을 기준으로 나눔
  const datePart = parts[0]; // 날짜 부분 (2022-07-29T14:47:14)을 얻음
  return datePart;
}

const UserPopup = (props) => {
  let [userdata, setUserdata] = useState({
    PUBLIC_SEQ : props.item.PUBLIC_SEQ,
    PUBLIC_ID : props.item.PUBLIC_ID,
    PUBLIC_ST : props.item.PUBLIC_ST,
    REG_DT : props.item.REG_DT,
    MOD_DT : props.item.MOD_DT,
    ACCESS_KEY : props.item.ACCESS_KEY,
    SECRET_KEY : props.item.SECRET_KEY,
    TOKEN : props.item.TOKEN,
  })

  const resetstate = () => {
    setUserdata({
      PUBLIC_SEQ : props.item.PUBLIC_SEQ,
      PUBLIC_ID : props.item.PUBLIC_ID,
      PUBLIC_ST : props.item.PUBLIC_ST,
      REG_DT : props.item.REG_DT,
      MOD_DT : props.item.MOD_DT,
      ACCESS_KEY : props.item.ACCESS_KEY,
      SECRET_KEY : props.item.SECRET_KEY,
      TOKEN : props.item.TOKEN
    })
  }

  const updatedata = async () => {
    const data = userdata
    

    let PUBLIC_SEQ = props.item.PUBLIC_SEQ
    let PUBLIC_ID = data.PUBLIC_ID
    let PUBLIC_ST = data.PUBLIC_ST
    let REG_DT = edit_date(`${data.REG_DT}`)
    let MOD_DT = edit_date(`${data.MOD_DT}`)
    let ACCESS_KEY = data.ACCESS_KEY
    let SECRET_KEY = data.SECRET_KEY
    let TOKEN = data.TOKEN

    const put_data = {
      PUBLIC_SEQ : PUBLIC_SEQ,
      PUBLIC_ID : PUBLIC_ID,
      PUBLIC_ST : PUBLIC_ST,
      REG_DT : REG_DT,
      MOD_DT : MOD_DT,
      ACCESS_KEY : ACCESS_KEY,
      SECRET_KEY : SECRET_KEY,
      TOKEN : TOKEN
    }

    console.log('put data: ',JSON.stringify(put_data));

      fetch('http://124.50.247.56:3000/user/info', {
        method : 'PUT',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(put_data)
      })
      .then((response) => response)
      .then((data) => {
        console.log('success to put user data', data);
      })
      .catch((err) => {
        console.log('유저 수정 api오류');
        console.error(err)
      })
  }

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
                      <input className="inputtext" value={userdata.PUBLIC_SEQ}
                      readOnly
                      ></input>
                    </div>

                    <div className="inputdata">
                      <label>PUBLIC_ID</label>
                      <input className="inputtext" value={userdata.PUBLIC_ID}
                      onChange = {
                        (e) => {setUserdata({...userdata,PUBLIC_ID: e.target.value})}
                      }></input>
                    </div>

                    <div className="inputdata">
                      <label>PUBLIC_ST</label>
                      <input className="inputtext" value={userdata.PUBLIC_ST}
                      onChange = {
                        (e) => {setUserdata({...userdata,PUBLIC_ST: e.target.value})}
                      }></input>
                    </div>

                    <div className="inputdata">
                      <label>REG_DT</label>
                      <input className="inputtext" type="datetime" value={userdata.REG_DT} 
                      onChange = {
                        (e) => {setUserdata({...userdata,REG_DT: e.target.value})}
                      }></input>
                    </div>

                    <div className="inputdata">
                      <label>MOD_DT</label>
                      <input className="inputtext" type="datetime" value={userdata.MOD_DT} 
                      onChange = {
                        (e) => {setUserdata({...userdata,MOD_DT: e.target.value})}
                      }></input>
                    </div>

                    <div className="inputdata">
                      <label>ACCESS_KEY</label>
                      <input className="inputtext" value={userdata.ACCESS_KEY}
                      onChange = {
                        (e) => {setUserdata({...userdata,ACCESS_KEY: e.target.value})}
                      }></input>
                    </div>

                    <div className="inputdata">
                      <label>SECRET_KEY</label>
                      <input className="inputtext" value={userdata.SECRET_KEY}
                      onChange = {
                        (e) => {setUserdata({...userdata,SECRET_KEY: e.target.value})}
                      }></input>
                    </div>

                    <div className="inputdata">
                      <label>TOKEN</label>
                      <input className="inputtext" value={userdata.TOKEN}
                      onChange = {
                        (e) => {setUserdata({...userdata,TOKEN: e.target.value})}
                      }></input>
                    </div>

                    <span>

                    </span>
                  
                  </div>
                  <div className="Actions">
                    <button 
                      className="button"
                      onClick = {async ()=>{
                        let isch = window.confirm('이대로 변경하시겠습니까?');
                        console.log(isch)
                        if (isch) {
                          await updatedata();
                          resetstate();
                        }
                        else {
                          resetstate();
                        }
                        
                        close();
                        
                      }}
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
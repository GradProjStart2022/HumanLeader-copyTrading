// src/components/addpopups/Useradd.js

import React from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'


class Useradd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LEADER_UID : '',
      LEADER_NAME : '',
      LEADER_IMAGE : '',
      LEADER_CAPACITY: '',
      LEADER_PRICE : '',
      LEADER_AMOUNT : '',
      EXCHANGE_TYPE : '',
      ACCESS_KEY : 'null',
      SECRET_KEY : 'null',
      TRADER_ST : '',
      REG_DT : this.formatCurrentDateTime(),
      MOD_DT : this.formatCurrentDateTime(),
    }
  }

  formatCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  // leader에 맞게 수정 필요
  exportdata(){
    const userdata = this.state
    console.log(JSON.stringify(userdata));
    alert(`${JSON.stringify(userdata)}`);
    fetch('http://124.50.247.56:3000/leader/new', {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(userdata)
    })
    .then((response) => response)
    .then((data)=>{
      console.log('success to add user', data);
    })
    .catch((err)=>{
      console.log('유저등록 api 오류');
      console.error(err);
    })
  }


  render() {
    return (
      <Popup 
            trigger={ <button style={{'marginLeft':'26px'}} > Add </button> } 
            modal
            nested
            style = {{ 'borderRadius' : '5px'}}
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
                        <input 
                          className="inputtext" 
                          type='text'
                          value={'AutoGenerate'}
                          readOnly
                        ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>LEADER_UID</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='LEADER_UID'
                          value={this.state.LEADER_UID}
                          onChange={
                            (e) => {this.setState({ LEADER_UID: e.target.value });
                                    console.log(`${this.state.LEADER_UID}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>LEADER_NAME</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='LEADER_NAME'
                          value={this.state.LEADER_NAME}
                          onChange={
                            (e) => {this.setState({ LEADER_NAME: e.target.value });
                                    console.log(`${this.state.LEADER_NAME}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>LEADER_IMAGE</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='LEADER_IMAGE'
                          value={this.state.LEADER_IMAGE}
                          onChange={
                            (e) => {this.setState({ LEADER_IMAGE: e.target.value });
                                    console.log(`${this.state.LEADER_IMAGE}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>LEADER_CAPACITY</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='LEADER_CAPACITY'
                          value={this.state.LEADER_CAPACITY}
                          onChange={
                            (e) => {this.setState({ LEADER_CAPACITY: e.target.value });
                                    console.log(`${this.state.LEADER_CAPACITY}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>LEADER_PRICE</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='LEADER_PRICE'
                          value={this.state.LEADER_PRICE}
                          onChange={
                            (e) => {this.setState({ LEADER_PRICE: e.target.value });
                                    console.log(`${this.state.LEADER_PRICE}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>LEADER_AMOUNT</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='LEADER_AMOUNT'
                          value={this.state.LEADER_AMOUNT}
                          onChange={
                            (e) => {this.setState({ LEADER_AMOUNT: e.target.value });
                                    console.log(`${this.state.LEADER_AMOUNT}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>EXCHANGE_TYPE</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='EXCHANGE_TYPE'
                          value={this.state.EXCHANGE_TYPE}
                          onChange={
                            (e) => {this.setState({ EXCHANGE_TYPE: e.target.value });
                                    console.log(`${this.state.EXCHANGE_TYPE}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>TRADER_ST</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='TRADER_ST'
                          value={this.state.TRADER_ST}
                          onChange={
                            (e) => {this.setState({ TRADER_ST: e.target.value });
                                    console.log(`${this.state.TRADER_ST}`)
                                    }
                                  }
                          ></input>
                      </div>
                    
                    </div>
                    <div className="Actions">
                      <button 
                        className="button"
                        onClick = {()=>{
                          this.exportdata();
                          console.log(JSON.stringify(this.state))
                          this.setState({
                            PUBLIC_ID : '',
                            PUBLIC_ST : '',
                            REG_DT : '1999-12-31T23:59:59',
                            MOD_DT : '2000-12-31T23:59:59',
                            ACCESS_KEY : '',
                            SECRET_KEY : '',
                            TOKEN : ''
                          })
                          close();}}
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


}

export default Useradd
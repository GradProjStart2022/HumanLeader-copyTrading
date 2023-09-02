// src/components/addpopups/Useradd.js

import React from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'


class Useradd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FOLLOWING_SEQ : '',
      PUBLIC_SEQ : '',
      PURCHASE_TOKEN : '',
      FOLLOWING_TYPE : '',
      COPY_TRADE_TYPE: '',
      FIXED_AMOUNT : '',
      FIXED_RATIO : '',
      STOP_RATIO : '',
      TAKE_RATIO : '',
      IS_AUTO_TRADING_YN : '',
      SUB_START_DT : '1999-12-31T23:59:59',
      SUB_END_DT : '2000-12-31T23:59:59',
      FOLLOWING_ST : '',
      REG_DT : '1999-12-31T23:59:59',
      MOD_DT : '2000-12-31T23:59:59',
    }
  }

  // sub 맞게 수정 필요
  exportdata(){
    const userdata = this.state
    console.log(JSON.stringify(userdata));
    alert(`${JSON.stringify(userdata)}`);
    fetch('http://124.50.247.56:3000/user/new', {
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
                    <div className="header"> USER INFO </div>
                    <div className="contents"> 
  
                      <div className="inputdata">
                        <label>FOLLOWING_SEQ</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          value={'AutoGenerate'}
                          readOnly
                        ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>PUBLIC_SEQ</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='PUBLIC_SEQ'
                          value={this.state.PUBLIC_SEQ}
                          onChange={
                            (e) => {this.setState({ PUBLIC_ID: e.target.value });
                                    console.log(`${this.state.PUBLIC_SEQ}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>PURCHASE_TOKEN</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='PURCHASE_TOKEN'
                          value={this.state.PURCHASE_TOKEN}
                          onChange={
                            (e) => {this.setState({ PURCHASE_TOKEN: e.target.value });
                                    console.log(`${this.state.PURCHASE_TOKEN}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>FOLLOWING_TYPE</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='FOLLOWING_TYPE'
                          value={this.state.FOLLOWING_TYPE}
                          onChange={
                            (e) => {this.setState({ FOLLOWING_TYPE: e.target.value });
                                    console.log(`${this.state.FOLLOWING_TYPE}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>COPY_TRADE_TYPE</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='COPY_TRADE_TYPE'
                          value={this.state.COPY_TRADE_TYPE}
                          onChange={
                            (e) => {this.setState({ COPY_TRADE_TYPE: e.target.value });
                                    console.log(`${this.state.COPY_TRADE_TYPE}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>FIXED_AMOUNT</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='FIXED_AMOUNT'
                          value={this.state.FIXED_AMOUNT}
                          onChange={
                            (e) => {this.setState({ FIXED_AMOUNT: e.target.value });
                                    console.log(`${this.state.FIXED_AMOUNT}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>FIXED_RATIO</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='FIXED_RATIO'
                          value={this.state.FIXED_RATIO}
                          onChange={
                            (e) => {this.setState({ FIXED_RATIO: e.target.value });
                                    console.log(`${this.state.FIXED_RATIO}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>STOP_RATIO</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='STOP_RATIO'
                          value={this.state.STOP_RATIO}
                          onChange={
                            (e) => {this.setState({ STOP_RATIO: e.target.value });
                                    console.log(`${this.state.STOP_RATIO}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>TAKE_RATIO</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='TAKE_RATIO'
                          value={this.state.TAKE_RATIO}
                          onChange={
                            (e) => {this.setState({ TAKE_RATIO: e.target.value });
                                    console.log(`${this.state.TAKE_RATIO}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>IS_AUTO_TRADING_YN</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='IS_AUTO_TRADING_YN'
                          value={this.state.IS_AUTO_TRADING_YN}
                          onChange={
                            (e) => {this.setState({ IS_AUTO_TRADING_YN: e.target.value });
                                    console.log(`${this.state.IS_AUTO_TRADING_YN}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>SUB_START_DT</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='yyyy-mm-ddTHH:MM:SS'
                          value={this.state.SUB_START_DT}
                          onChange={
                            (e) => {this.setState({ SUB_START_DT: e.target.value });
                                    console.log(`${this.state.SUB_START_DT}`)
                                    }
                                  }
                          ></input>
                      </div>
                      <div className="inputdata">
                        <label>SUB_END_DT</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='yyyy-mm-ddTHH:MM:SS'
                          value={this.state.SUB_END_DT}
                          onChange={
                            (e) => {this.setState({ SUB_END_DT: e.target.value });
                                    console.log(`${this.state.SUB_END_DT}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>FOLLOWING_ST</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='FOLLOWING_ST'
                          value={this.state.FOLLOWING_ST}
                          onChange={
                            (e) => {this.setState({ FOLLOWING_ST: e.target.value });
                                    console.log(`${this.state.FOLLOWING_ST}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>REG_DT</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='yyyy-mm-ddTHH:MM:SS'
                          value={this.state.REG_DT}
                          onChange={
                            (e) => {this.setState({ REG_DT: e.target.value });
                                    console.log(`${this.state.REG_DT}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>MOD_DT</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='yyyy-mm-ddTHH:MM:SS'
                          value={this.state.MOD_DT}
                          onChange={
                            (e) => {this.setState({ MOD_DT: e.target.value });
                                    console.log(`${this.state.MOD_DT}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>ACCESS_KEY</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='ACCESS_KEY'
                          value={this.state.ACCESS_KEY}
                          onChange={
                            (e) => {this.setState({ ACCESS_KEY: e.target.value });
                                    console.log(`${this.state.ACCESS_KEY}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>SECRET_KEY</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='SECRET_KEY'
                          value={this.state.SECRET_KEY}
                          onChange={
                            (e) => {this.setState({ SECRET_KEY: e.target.value });
                                    console.log(`${this.state.SECRET_KEY}`)
                                    }
                                  }
                          ></input>
                      </div>

                      <div className="inputdata">
                        <label>TOKEN</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='TOKEN'
                          value={this.state.TOKEN}
                          onChange={
                            (e) => {this.setState({ TOKEN: e.target.value });
                                    console.log(`${this.state.TOKEN}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <span>
  
                      </span>
                    
                    </div>
                    <div className="Actions">
                      <button 
                        className="button"
                        onClick = {()=>{
                          //this.exportdata();
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
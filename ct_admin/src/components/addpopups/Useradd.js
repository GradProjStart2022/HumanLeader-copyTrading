// src/components/addpopups/Useradd.js

import React from 'react';
import Popup from 'reactjs-popup';

import '../../styles/modal.css'


class Useradd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PUBLIC_ID : '',
      PUBLIC_ST : '',
      REG_DT : '1999-12-31T23:59:59',
      MOD_DT : '2000-12-31T23:59:59',
      ACCESS_KEY : '',
      SECRET_KEY : '',
      TOKEN : ''
    }
  }

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
                        <label>PUBLIC_SEQ</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          value={'AutoGenerate'}
                          readOnly
                        ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>PUBLIC_ID</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='PUBLIC_ID'
                          value={this.state.PUBLIC_ID}
                          onChange={
                            (e) => {this.setState({ PUBLIC_ID: e.target.value });
                                    console.log(`${this.state.PUBLIC_ID}`)
                                    }
                                  }
                          ></input>
                      </div>
  
                      <div className="inputdata">
                        <label>PUBLIC_ST</label>
                        <input 
                          className="inputtext" 
                          type='text'
                          placeholder='PUBLIC_ST'
                          value={this.state.PUBLIC_ST}
                          onChange={
                            (e) => {this.setState({ PUBLIC_ST: e.target.value });
                                    console.log(`${this.state.PUBLIC_ST}`)
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
                          this.exportdata();
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
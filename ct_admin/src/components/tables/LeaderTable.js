// src/components/tables/LeaderTable.js


import React from "react";
import LeaderPopup from "../popups/Leaderpopup";
import TradePopup from "../popups/Leader-TradePopup"

class DisplayTable extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            list: null
        }

        this.callAPI = this.callAPI.bind(this);
    }

    componentDidMount() {
        this.callAPI();
    }

    callAPI(){
        fetch("http://124.50.247.56:3000/leader/all")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                list: data
            });
        })
        .catch(error => console.error(error));
    }

/**
 * 
 *      "LEADER_SEQ": 1,
        "LEADER_UID": "testleader1",
        "LEADER_NAME": "testleader1",
        "LEADER_IMAGE": null,
        "LEADER_CAPACITY": null,
        "LEADER_PRICE": "0",
        "LEADER_AMOUNT": "0",
        "EXCHANGE_TYPE": "ET01",
        "TRADER_ST": "RS01",
        "ACCESS_KEY",
        "SECRET_KEY"

 */
    render(){
        if (!this.state.list) {
            return <div>Loading...</div>;
        }

        let tb_data = this.state.list.map((item)=>{
            console.log("yeah");
            return (
                <tr key={item.LEADER_SEQ}>
                        <td>{item.LEADER_SEQ}</td>
                        <td>{item.LEADER_UID}</td>
                        <td>{item.LEADER_NAME}</td>
                        <td>{item.LEADER_CAPACITY}</td>
                        <td>{item.LEADER_PRICE}</td>
                        <td>{item.LEADER_AMOUNT}</td>
                        <td>{(item.EXCHANGE_TYPE == "ET01") ? "업비트" : null}</td>
                        <td>{ (item.TRADER_ST == "RS01") ? "거래중" : 
                                (item.TRADER_ST == "RS02") ? "대기중" : "삭제"
                            }</td>
                        
                        <td><LeaderPopup item={item} /></td>
                        <td><TradePopup item={item} /></td>

                </tr>
            )
        })

        return (
            <div style={{ height: "100%", overflowY: "scroll" }}>
                <table className="table table-striped">
                    <tbody>
                        <tr
                            style={{
                                fontSize: '14px',
                                fontWeight : 'bolder'
                            }}
                        >
                            <td>LEADER_SEQ</td>
                            <td>LEADER_UID</td>
                            <td>LEADER_NAME</td>
                            <td>LEADER_CAPACITY</td>
                            <td>LEADER_PRICE</td>
                            <td>LEADER_AMOUNT</td>
                            <td>EXCHANGE_TYPE</td>
                            <td>TRADER_ST</td>
                            
                            
                            <td></td>
                            <td></td>
                            
                        </tr>
                        {tb_data}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DisplayTable;

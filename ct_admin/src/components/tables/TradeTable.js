// src/components/tables/TradeTable.js


import React from "react";
import TradePopup from "../popups/Tradepopup";

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
/**
        "HISTORY_SEQ": 97,
        "FOLLOWING_SEQ": 157,
        "TRADE_TYPE": "TT01",
        "TRADE_ST": "TS01",
        "TRADE_NUM": "1012",
        "TRADE_SYMBOL": "test_sym",
        "TRADE_MARKET": "test_mk",
        "TRADE_PRICE": "99",
        "TRADE_VOLUME": 10,
        "REG_DT": "2023-04-24T13:54:58.000Z"
 */
    callAPI(){
        fetch("http://124.50.247.56:3000/trade/all")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                list: data
            });
            console.log('aa');
            
        })
        .catch(error => console.error(error));
    }

    render(){
        if (!this.state.list) {
            return <div>Loading...</div>;
        }

        let tb_data = this.state.list.map((item)=>{
            console.log("yeah");
            return (
                <tr key={item.HISTORY_SEQ}>
                        <td>{item.HISTORY_SEQ}</td>
                        <td>{item.FOLLOWING_SEQ}</td>
                        <td>{item.TRADE_TYPE}</td>
                        <td>{item.TRADE_ST}</td>
                        <td>{item.TRADE_NUM}</td>
                        <td>{item.TRADE_SYMBOL}</td>
                        <td>{item.TRADE_MARKET}</td>
                        <td>{item.TRADE_PRICE}</td>
                        <td>{item.TRADE_VOLUME}</td>
                        
                        <td><TradePopup item={item}  /></td>
                </tr>
            )
        })

        return (
            <div style={{ height: "450px", overflowY: "scroll" }}>
                <table className="table table-striped">
                    <tbody>
                        <tr
                            style={{
                                fontSize: '14px',
                                fontWeight : 'bolder'
                            }}
                        >
                            <td>HISTORY_SEQ</td>
                            <td>FOLLOWING_SEQ</td>
                            <td>TRADE_TYPE</td>
                            <td>TRADE_ST</td>
                            <td>TRADE_NUM</td>
                            <td>TRADE_SYMBOL</td>
                            <td>TRADE_MARKET</td>
                            <td>TRADE_PRICE</td>
                            <td>TRADE_VOLUME</td>
                            
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

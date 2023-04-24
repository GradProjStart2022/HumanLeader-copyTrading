import React from "react";

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
        "FOLLOWING_SEQ": 158,
        "PUBLIC_SEQ": 217,
        "LEADER_SEQ": 1,
        "PURCHASE_TOKEN": 
        "FOLLOWING_TYPE": "FT01",
        "COPY_TRADE_TYPE": "CT02",
        "FIXED_AMOUNT": null,
        "FIXED_RATIO": 100,
        "STOP_RATIO": null,
        "TAKE_RATIO": null,
        "IS_AUTO_TRADING_YN": "Y",
        "SUB_START_DT": "2022-07-28T15:00:00.000Z",
        "SUB_END_DT": "2022-08-27T15:00:00.000Z",
        "FOLLOWING_ST": "FS01",
        "REG_DT": "2022-07-29T09:36:36.000Z",
        "MOD_DT": "2022-07-29T09:36:36.000Z"
 */
    callAPI(){
        fetch("http://124.50.247.56:3000/sub/all")
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
                <tr key={item.FOLLOWING_SEQ}>
                        <td>{item.FOLLOWING_SEQ}</td>
                        <td>{item.PUBLIC_SEQ}</td>
                        <td>{item.LEADER_SEQ}</td>
                        <td>{item.PURCHASE_TOKEN}</td>
                        <td>{item.FOLLOWING_TYPE}</td>
                        <td>{item.COPY_TRADE_TYPE}</td>
                        <td>{item.FIXED_AMOUNT}</td>
                        <td>{item.FIXED_RATIO}</td>
                        <td>{item.STOP_RATIO}</td>
                        <td>{item.IS_AUTO_TRADING_YN}</td>
                        <td>{item.SUB_START_DT}</td>
                        <td>{item.SUB_END_DT}</td>
                        <td>{item.FOLLOWING_ST}</td>
                        <td>{item.REG_DT}</td>
                        <td>{item.MOD_DT}</td>

                        
                        
                        <td><button>delete</button></td>
                </tr>
            )
        })

        return (
            <div>
                <table className="table table-striped">
                    <tbody>
                        <tr
                            style={{
                                fontSize: '14px',
                                fontWeight : 'bolder'
                            }}
                        >
                            <td>FOLLOWING_SEQ</td>
                            <td>PUBLIC_SEQ</td>
                            <td>LEADER_SEQ</td>
                            <td>PURCHASE_TOKEN</td>
                            <td>FOLLOWING_TYPE</td>
                            <td>COPY_TRADE_TYPE</td>
                            <td>FIXED_AMOUNT</td>
                            <td>FIXED_RATIO</td>
                            <td>STOP_RATIO</td>
                            <td>IS_AUTO_TRADING_YN</td>
                            <td>SUB_START_DT</td>
                            <td>SUB_END_DT</td>
                            <td>FOLLOWING_ST</td>
                            <td>REG_DT</td>
                            <td>MOD_DT</td>
                            
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

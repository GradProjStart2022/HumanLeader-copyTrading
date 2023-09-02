// src/components/tables/UserTable.js

import React from "react";
import UserPopup from "../popups/Userpopup";
import UserDelete from "../DelPopups/userdel";


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
        "PUBLIC_SEQ": 216,
        "PUBLIC_ID": "2365716535",
        "PUBLIC_ST": "OS01",
        "REG_DT": "2022-07-29T14:47:14.000Z",
        "MOD_DT": "2022-07-29T14:47:14.000Z",
        "ACCESS_KEY": "xg6edJAFAGurmqN02ptnAfUlFF3f7OIfnrASxnLT",
        "SECRET_KEY": "wozStKAE3J4onjqEjSsnCDVWQo2YBkpGUr2Iha1t"
 */
    callAPI(){
        fetch("http://124.50.247.56:3000/user/all")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                list: data
            });
        })
        .catch(error => console.error(error));
    }

    render(){
        if (!this.state.list) {
            return <div>Loading...</div>;
        }

        let tb_data = this.state.list.map((item)=>{
            return (
                <tr key={item.PUBLIC_SEQ}>
                        <td>{item.PUBLIC_SEQ}</td>
                        <td>{item.PUBLIC_ID}</td>
                        <td>{ (item.PUBLIC_ST === "OS01") ? "정상" : "삭제" }</td>
                        <td>{item.REG_DT}</td>
                        <td>{item.MOD_DT}</td>
                        <td><UserPopup item={item} /></td>
                        <td><UserDelete item={item} /></td>
                </tr>
            )
        })

        return (
            <div style={{ height: '100%', overflowY: "scroll" }}>
                <table className="table table-striped">
                    <tbody>
                        <tr
                            style={{
                                fontSize: '14px',
                                fontWeight : 'bolder'
                            }}
                        >
                            <td>PUBLIC_SEQ</td>
                            <td>PUBLIC_ID</td>
                            <td>PUBLIC_ST</td>
                            <td>REG_DT</td>
                            <td>MOD_DT</td>
                            
                            
                            <td>Edit</td>
                            <td>Del</td>
                            
                        </tr>
                        {tb_data}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DisplayTable;

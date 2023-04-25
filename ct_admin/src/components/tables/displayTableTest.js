// src/components/tables/displayTableTest.js

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

    callAPI(){

        fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
            this.setState({
                list: data.products
            });
        })
        .catch(error => console.error(error));
    }

    render(){
        if (!this.state.list) {
            return <div>Loading...</div>;

        }

        let tb_data = this.state.list.map((item)=>{
            console.log("yeah")
            return (
                <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.rating}</td>
                        <td>{item.stock}</td>
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
                                fontSize: '20px',
                                fontWeight : 'bolder'
                            }}
                        >
                            <td>title</td>
                            <td>price</td>
                            <td>rating</td>
                            <td>stock</td>
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

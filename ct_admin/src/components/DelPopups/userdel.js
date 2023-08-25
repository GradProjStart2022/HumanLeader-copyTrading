// src/components/popups/Userpopup.js

import React, { useState } from 'react';
import '../../styles/modal.css'


const UserDelete = (props) => {

    return (
        <button onClick={()=>{
            console.log(JSON.stringify(props.item))
            const api_data = {
                PUBLIC_SEQ : props.item.PUBLIC_SEQ
            }
            fetch('http://124.50.247.56:3000/user/info', {
                method : 'DELETE',
                headers : {
                'Content-Type': 'application/json'
                },
                body : JSON.stringify(api_data)
            })
            .then((response) => response)
            .then((data) => {
                console.log('success to delete user data', data);
            })
            .catch((err) => {
                console.log('유저 삭제 api오류');
                console.error(err)
            })
            
        }}>
            Del
        </button>
    )
}

export default UserDelete
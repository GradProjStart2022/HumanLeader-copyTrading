import React from 'react';
import '../../styles/modal.css'


const UserDelete = (props) => {

    return (
        <button onClick={()=>{
            console.log(JSON.stringify(props.item))
            

            let isch = window.confirm(`정말로 SEQ : ${props.item.PUBLIC_SEQ} 아이디를 삭제하시겠습니까?`);

            if (isch) {
                console.log(props.item.PUBLIC_SEQ,'아이디 삭제 요청 보냄')
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
            }
            else {
                
            }

            
            
        }}>
            Del
        </button>
    )
}

export default UserDelete
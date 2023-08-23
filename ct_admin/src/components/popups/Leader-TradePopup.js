import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';

import '../../styles/modal.css';
const TradePopup = (props) => {
  const [tradeHistory, setTradeHistory] = useState([]);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        const response = await axios.post('http://124.50.247.56:3000/leader/history', {
          seq: props.item.LEADER_SEQ,
        });
        setTradeHistory(response.data);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchTradeHistory();
  }, [props.item.LEADER_SEQ]);

  return (
    <Popup 
      trigger={<button>Trade Recode</button>} 
      modal
      nested
      style={{ borderRadius: '5px' }}
      contentStyle={{ background: '#fff', borderRadius: '5px' }}
      overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    >
      {close => (
        <div className="Modal_t"
        >
          <button className='close' onClick={() => close()}>
            &times;
          </button>
          <div className="header">Trade Recode</div>
          <div className="contents"
              
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>거래 종류</th>
                  <th>거래 가격</th>
                  <th>거래 수량</th>
                  <th>거래 일시</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade, index) => (
                  <tr key={index}>
                    <td>{ (trade.TRADE_TYPE == "TT01") ? "매수":
                                (trade.TRADE_TYPE == "TT02") ? "매도": 
                                    (trade.TRADE_TYPE == "TT99") ? "시세": null
                        }</td>
                    <td>{trade.TRADE_PRICE}</td>
                    <td>{trade.TRADE_VOLUME}</td>
                    <td>{new Date(trade.REG_DT).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="Actions">
            <button className="button" onClick={() => close()}>
              닫기
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default TradePopup;

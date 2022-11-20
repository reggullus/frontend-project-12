import React from 'react';
import axios from 'axios';

const Chat = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  const aut = async () => {
    try {
      const res = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${userId}` } });
      console.log(res)
    } catch (e) {
        console.log(e)
    }
  };
  aut();

  return (
    <div>Chat</div>
  );
};
export default Chat;

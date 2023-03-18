import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('ws://localhost:3501');

function ClickHandler() {
  const [data, setData] = useState('');
  const [chatData,setMessage] = useState([]);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });
    socket.on('message', (message) => {
      console.log('Otrzymana wiadomość: ', message);
      setMessage(prevChatData => [...prevChatData, message]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }, []);

  const handleClick = () => {
    socket.emit('message', data);
    setData('');
  };

  return (
    <div>
       {chatData.map((item,index)=>{
        return(
        <li key={index}>
        {item}
      </li>
      )
 }) }
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      <button onClick={handleClick}>Wyślij</button>
     

   </div> 
  );
}

function Body() {
  return (
    <>
      <div id='container' className="bg-light border">
          <ClickHandler />
      </div>
    </>
  );
}
// comment zeby pushnac folder
export default Body;

import React from 'react'
import Message from './Messages'
import SendMessage from './SendMessages'
import { useNavigate } from 'react-router-dom';


export const Chat = ({socket,username, room}) => {

  const navigate = useNavigate();

    React.useEffect(()=>{
        console.log(socket)
        if(socket.connected !== true)
        {
            alert('Please redirect')
        }
    },[socket])

    const leaveRoom = () => {
      const __createdtime__ = Date.now();
      socket.emit('leave_room', { username, room, __createdtime__ });
      navigate('/', { replace: true });
    };
  return (
    <>
    
<div class="app-container">
  <div class="app-left">
    <div class="app-left-header">
      <div class="app-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <defs/>
          <path class="path-1" fill="#3eb798" d="M448 193.108h-32v80c0 44.176-35.824 80-80 80H192v32c0 35.344 28.656 64 64 64h96l69.76 58.08c6.784 5.648 16.88 4.736 22.528-2.048A16.035 16.035 0 00448 494.868v-45.76c35.344 0 64-28.656 64-64v-128c0-35.344-28.656-64-64-64z" opacity=".4"/>
          <path class="path-2" fill="#3eb798" d="M320 1.108H64c-35.344 0-64 28.656-64 64v192c0 35.344 28.656 64 64 64v61.28c0 8.832 7.168 16 16 16a16 16 0 0010.4-3.84l85.6-73.44h144c35.344 0 64-28.656 64-64v-192c0-35.344-28.656-64-64-64zm-201.44 182.56a22.555 22.555 0 01-4.8 4 35.515 35.515 0 01-5.44 3.04 42.555 42.555 0 01-6.08 1.76 28.204 28.204 0 01-6.24.64c-17.68 0-32-14.32-32-32-.336-17.664 13.712-32.272 31.376-32.608 2.304-.048 4.608.16 6.864.608a42.555 42.555 0 016.08 1.76c1.936.8 3.76 1.808 5.44 3.04a27.78 27.78 0 014.8 3.84 32.028 32.028 0 019.44 23.36 31.935 31.935 0 01-9.44 22.56zm96 0a31.935 31.935 0 01-22.56 9.44c-2.08.24-4.16.24-6.24 0a42.555 42.555 0 01-6.08-1.76 35.515 35.515 0 01-5.44-3.04 29.053 29.053 0 01-4.96-4 32.006 32.006 0 01-9.28-23.2 27.13 27.13 0 010-6.24 42.555 42.555 0 011.76-6.08c.8-1.936 1.808-3.76 3.04-5.44a37.305 37.305 0 013.84-4.96 37.305 37.305 0 014.96-3.84 25.881 25.881 0 015.44-3.04 42.017 42.017 0 016.72-2.4c17.328-3.456 34.176 7.808 37.632 25.136.448 2.256.656 4.56.608 6.864 0 8.448-3.328 16.56-9.28 22.56h-.16zm96 0a22.555 22.555 0 01-4.8 4 35.515 35.515 0 01-5.44 3.04 42.555 42.555 0 01-6.08 1.76 28.204 28.204 0 01-6.24.64c-17.68 0-32-14.32-32-32-.336-17.664 13.712-32.272 31.376-32.608 2.304-.048 4.608.16 6.864.608a42.555 42.555 0 016.08 1.76c1.936.8 3.76 1.808 5.44 3.04a27.78 27.78 0 014.8 3.84 32.028 32.028 0 019.44 23.36 31.935 31.935 0 01-9.44 22.56z"/>
        </svg>
      </div>
      <h1>MERN Realtime Chat</h1>
    </div>
    <div class="app-profile-box">
        <h4 style={{color:"#fff"}}>Chat Room : {room.toUpperCase()}</h4>
        <h6 style={{color:"#fff"}}>User : <strong>{username.toUpperCase()}</strong></h6>
    </div>
 
  </div>
  <div class="app-main">
      <Message socket={socket}/>
      <SendMessage socket={socket} username={username} room={room}/>
  </div>
  <div class="app-right">
   
    
    <div class="app-right-bottom">
      
    </div>
  </div>
  <div class="app-right-bottom">
    <button className='btn btn-danger' onClick={leaveRoom}>Leave Chat <i className='fa fa-sign-out'></i></button>
  </div>
</div>
</>
  )
}

import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Chat } from './component/Chat';
import { io } from 'socket.io-client';



function App() {

  const [socket,setSocket] = useState(null);
  const [username,setUserName] = useState('');
  const [room,setRoom] = useState('');

  useEffect(()=>{
    const newSocket = io('http://localhost:4000')
    setSocket(newSocket)
    return ()=> newSocket.off()
  },[])

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={
          <Home
          username={username}
          setUserName={setUserName}
          room={room}
          setRoom={setRoom}
          socket={socket}
        />
          
          } />

          <Route
            path='/chat'
            element={<Chat username={username} room={room} socket={socket}/>}
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

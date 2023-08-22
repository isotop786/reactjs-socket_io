// import styles from './styles.module.css'
import { useState, useEffect, useRef } from 'react'

const Message = ({socket})=>{
    const [messagesReceived, setMessagesReceived] = useState([]);
    const messagesColumnRef = useRef(null);
    const [roomUsers, setRoomUsers] = useState([]);


    useEffect(()=>{
        socket.on('receive_message', data =>{
            console.log(data);
            setMessagesReceived((state)=>[
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,

                }
            ]);
        });

        socket.on('chatroom_users', (data) => {
            console.log(data);
            setRoomUsers(data);
          });
      
          return () => socket.off('chatroom_users');

        // return ()=> socket.off('receive')
        // return ()=> socket.disconnect();
    },[socket])


    useEffect(()=>{
        socket.on('last_100_messages',(last100Message)=>{
            last100Message = JSON.parse(last100Message)

            last100Message = sortMessagesByDate(last100Message);
            setMessagesReceived((state) => [...last100Message, ...state]);
        })

        return ()=> socket.off('last_100_messages')
    },[socket])

      // Add this
  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  // Add this
  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }



    function formatDateFromTimestamp(timestamp)
    {
        const data = new Date(timestamp);
        return  data.toLocaleString();
    }

    return (
        <div class="chat-wrapper" style={{height:"80vh",overflow:'auto'}}ref={messagesColumnRef}>
             <div class="message-wrapper">
                <div class="message-box-wrapper">
                <div class="message-box">
                    <h5>Welcome to MERN Realtime Chat App</h5>
                The MERN Real-Time Chat App is a cutting-edge communication platform that leverages the power of modern web technologies to provide seamless and instant messaging experiences. Built on the robust MERN stack, this application combines MongoDB for data storage, Express.js for backend development, React for the user interface, and Node.js for real-time capabilities
                </div>
                </div>
            </div>
            {
                messagesReceived.map((msg,i)=>(
                        <div class="message-wrapper" key={i}>
                        <div class="message-box-wrapper">
                            <div >
                            <div class="message-box" style={{display:"flex",flexDirection:"column"}}>
                            <div style={{color:"#fff",fontSize:"1.20rem",marginBottom:"7px"}}>
                                {msg.username}
                            </div>
                                {msg.message}
                            </div>
                            </div>
                        
                        <span> {formatDateFromTimestamp(msg.__createdtime__)}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Message;
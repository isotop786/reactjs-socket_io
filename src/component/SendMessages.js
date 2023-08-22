// import styles from './styles.module.css'
import React, {useState} from 'react'

const SendMessage = ({socket,username, room})=>{
    const [message,setMessage] = useState('');

    const sendMessages = ()=>{
        if(message !== ''){
            const __createdtime__ = Date.now();
            console.log(message)
            socket.emit('send-message',{username,room,message,__createdtime__})
            setMessage('');
        }
    };

    return(
        // <div className={styles.sendMessageContainer}>
        //     <input
        //         className={styles.messageInput}
        //         placeholder='Message...'
        //         onChange={e=> setMessage(e.target.value)}
        //         value={message}
        //     />

        //     <button className='btn btn-primary' onClick={sendMessages}>Send Message</button>
        // </div>

        <div class="chat-input-wrapper">

        <div class="input-wrapper">
        <input type="text" 
            className="chat-input"
            placeholder='Message...'
            onChange={e=> setMessage(e.target.value)}
            value={message}
            onKeyDown={(e)=>{
                if(e.key ==='Enter')
                {
                    sendMessages()
                }
            }}
        />
        <button class="emoji-btn" onClick={sendMessages}>
            Send
        </button>
        </div>
        <button class="chat-send-btn" onClick={sendMessages}>Send</button>
        </div>
    )

}

export default SendMessage;
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUserName, room, setRoom, socket })=>{

    const navigate = useNavigate();

    const joinRoom = ()=>{
        if(room !=='' && username!=='')
        {
            socket.emit('join_room',{username, room});
        }

        navigate('/chat',{replace: true})
    }

    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1> <i className='fa fa-comments'></i>{` ChatRooms`}</h1>
                <input className={styles.input} placeholder='Username...'
                    onChange={e=> setUserName(e.target.value)}
                />

                <select className={styles.input}
                    onChange={e=> setRoom(e.target.value)}
                >
                    <option>-- Select Room --</option>
                    <option value='news'>News</option>
                    <option value='politics'>Politics</option>
                    <option value='family'>Family</option>
                    <option value='science'>Science</option>
                    <option value='business'>Business</option>
                    <option value='it'>Information Technology</option>
                    <option value='education'>Education</option>
                    <option value='entertainment'>Entertainment</option>
                </select>

                <button className='btn btn-dark btn-lg'
                    onClick={joinRoom}
                >Join Room</button>
            </div>
        </div>
    )
}

export default Home;
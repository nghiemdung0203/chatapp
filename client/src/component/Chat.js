import React, {useEffect, useState} from 'react'
import { useParams} from 'react-router'
import socket from '../socket/sockett';
import {Link} from 'react-router-dom';
import "./Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CachedIcon from '@mui/icons-material/Cached';
import MessageIcon from '@mui/icons-material/Message';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ScrollToBottom from 'react-scroll-to-bottom';


const Chat = () => {
    const [message, setMessage] = useState('');
    const { userName, Room } = useParams();
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                userName: userName,
                message: message,
                Room: Room,
                Time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit('sendMessage', messageData);
            setMessageList((list) => [...list, messageData]);
            setMessage('');
        }
        
    };
    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessageList((list) => [...list, data]);
        });
    },[socket])

    return (
        <div className='container'>
            <div className="conr row no-gutters">
                <div className='col-md-4 border-right'>
                    <div className='setting-stray'>
                        <img className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img"/>
                        <span className = "setting-stray--right">
                            <CachedIcon className = "setting-stray-icon"/>
                            <MessageIcon className = "setting-stray-icon"/>
                            <MenuIcon className = "setting-stray-icon"/>
                        </span>
                    </div>
                    <div className = "search-box">
                        <div className = "input-wrapper">
                            <SearchIcon className = "search-icon"/>
                            <input type = "text" placeholder='search' className = "input-search"/>
                        </div>
                    </div>
                    <div className = "friend-drawer friend-drawer--onhover">
                            <img className = "profile-image" src = "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt = "profile-img" />
                            <div className='text'>
                                <h6>Robo Cop</h6>
                                <p className='message text-muted'>tesfjsadklas;faf</p>
                            </div>
                            <span className='time text-muted small'>
                                13:00
                            </span>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className="setting-stray">
                            <img className = "profile-image2" src = "https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt = "profile-img" />
                            <span className='setting-stray--right2'>
                                <Link to = "/"><CloseIcon className = "setting-stray-icon"/></Link>
                            </span>
                    </div>
                    <div className='chat-body'>
                        <ScrollToBottom className="message-container">
                                {messageList.map((messageContent) => {
                                    return (
                                    <div
                                        className="message"
                                        id={userName === messageContent.userName ? "you" : "other"}
                                    >
                                        <div>
                                        <div className="message-content">
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{messageContent.Time}</p>
                                            <p id="author">{messageContent.userName}</p>
                                        </div>
                                        </div>
                                    </div>
                                    );
                                })}
                        </ScrollToBottom>
                    </div>
                    <div className="chat-footer">
                            <input type = "text" placeholder='Text' onChange={(e) => {setMessage(e.target.value)}} onKeyPress = {(event) => {
                                event.key === "Enter" && sendMessage();
                            }}/>
                            <button onClick={sendMessage}><SendIcon/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
import io from 'socket.io-client';
import React, {useEffect, useState} from 'react';
import ChatBox from './ChatBox';
import SignIn from './SignIn';

export default () =>{
    const [socket] = useState(() => io(':8000'));
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [approved, setApproved] = useState(false);

    useEffect(() =>{
        socket.on('post-chat', (data) =>{
            console.log(data)

            setMessages((prevMsgState) => [...prevMsgState, data]);
        });
        return () =>socket.removeAllListeners();
    }, [socket]);

    const logInUser = (uname) =>{
        if(uname){
            setApproved(true);
            setUsername(uname);
        }
    };

    const sendMessage = (message) =>{
        socket.emit('chat', {username, content: message});
    };

    return(
        <div>
            <h1>
                
            </h1>
            {
                !approved ? (
                    <SignIn submit={logInUser} />
                ) : (
                    <ChatBox username={username} submit={sendMessage} messages={messages} />
                )
            }
        </div>
    );

}
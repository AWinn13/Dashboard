import axios from "axios";
import React, {useState} from 'react';
import { Button, TextField } from "@mui/material";

const ChatGPT = () =>{

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([])
    const [response, setResponse] = useState('');

    
    

    const handleChat = e =>{
        e.preventDefault();
        const newMessage = {role:'user', content: `${message}`}
        const newMessageList = [...messageList, newMessage ]
        setMessageList(newMessageList)
        axios.post('http://localhost:8000', newMessageList)
        .then(res =>{
            console.log(res.data);
            const resString = res.data.completion.content
            const newResponse = {role:'assistant', content:`${resString}`}
            setResponse(resString);
            setMessageList([...messageList, newResponse])
            setMessage('')
        })
        
        .catch(err => console.error(err));
        
    };

    return(
        <div>
            <form onSubmit={handleChat} style={{ display:'flex',alignItems:'center', justifyContent:'space-evenly'}}>
                <TextField type="text" label='Ask a Question'value={message} onChange={ e => setMessage(e.target.value)}/>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
                
                <div>{message}</div>
                <div>{response}</div>
                
            

        </div>
    );
}

export default ChatGPT;
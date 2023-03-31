import React, { useState } from 'react';

const ChatBox = ({ username, submit, messages }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('here is the message', message);
        submit(message);
        setMessage('');
    };
    return (
        <fieldset>
            <legend>{username} is now chatting:</legend>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Type Your Message Here"
                        aria-label="message"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <button>
                        Enter Chat
                    </button>
                </div>
            </form>

            <div>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        
                    >
                        <p>{msg.username} :</p>
                        <p>{msg.content}</p>
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default ChatBox;
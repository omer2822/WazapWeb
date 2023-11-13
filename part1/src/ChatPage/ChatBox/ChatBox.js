import React from 'react';
import { useRef } from 'react'

function ChatBox({addMessage}) {

    const chatBox = useRef(null);

    const send = function () {
        //const now = new Date();
        //const date = now.toLocaleDateString(); // e.g. "5/9/2023"
        //const time = now.toLocaleTimeString(); // e.g. "2:30:00 PM"
        //const dateTime = `${date} ${time}`; // e.g. "5/9/2023 2:30:00 PM"
        var messageText = chatBox.current.value;
        chatBox.current.value = "";
        if (messageText !== "") {
            addMessage(messageText);
        }
    }


    return (

        <div className="chat-box-tray">
            <div className="input-wrapper">
                <input ref={chatBox} type="text" placeholder="Write your message!"></input>
                <i onClick={send} className="bi-arrow-right-circle-fill"></i>
            </div>

        </div>


    );

}

export default ChatBox
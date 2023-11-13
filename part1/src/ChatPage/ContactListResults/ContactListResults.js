import React from 'react';
import ContactItem from "../ContactItem/ContactItem";

function ContactListResults({ chats, setCurrentChat }) {

    var chatList = [];
    if (chats.length > 0) {
        chatList = chats.map((chat, key) => {
            return <ContactItem chat={chat} key={key} setCurrentChat={setCurrentChat} />
        });
    } 

    return (
        <>
            <div className='friends-list'>
                {chatList}
            </div>
        </>
    );
}

export default ContactListResults;
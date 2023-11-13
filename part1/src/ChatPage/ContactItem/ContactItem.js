import React from 'react';
//import conversations from '../MessageItem/conversations';

function ContactItem({ chat, setCurrentChat }) {

    const OnClick = function () {
        setCurrentChat(chat);
    }

    if (!chat.lastMessage) {
        chat.lastMessage = "Welcome to WebChat!"
    }

    return (
        <>
            <div onClick={OnClick} className="friend-drawer friend-drawer--onhover">
                <img className="profile-image" src={chat.user.profilePic}></img>
                <div className="text">
                    <h6>{chat.user.displayName}</h6>
                    <p className="text-muted">{chat.lastMessage.content}</p>
                </div>
                <span className="time text-muted small">{chat.lastMessage.created}</span>
            </div>

            <hr />
        </>

    );

}
export default ContactItem
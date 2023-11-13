import React from 'react';
import LogOutBtn from "./LogOutBtn";
//import contacts from "./ContactItem/contacts";
import UserDetails from "./UserDetails";
import { useState, useEffect, useRef } from 'react'
import Search from "./Search/Search";
import ContactListResults from "./ContactListResults/ContactListResults";
import ContactDetails from "./ContactDetails";
import ChatBox from "./ChatBox/ChatBox";
//import conversations from "./MessageItem/conversations";
import SentMessageItem from "./MessageItem/SentMessageItem";
import ReceivedMessageItem from "./MessageItem/ReceivedMessageItem"
import AddContact from "./AddContact";
import io from 'socket.io-client';


function ChatPage({ token, username, handleLogout, defaultChats, defaultDetails }) {

    const [messages, setMessages] = useState("");

    const [messagesList, setMessagesList] = useState("");

    const [input, setInput] = useState("");

    const [user, setUser] = useState("");

    const [chats, setChats] = useState("");

    const socket = io.connect("http://localhost:5000");


    useEffect(() => {
        if (defaultChats.length > 0) {
            setChats(defaultChats);
        }
    }, []);

    const [chatsList, setChatsList] = useState("");

    useEffect(() => {
        if (defaultChats.length > 0) {
            setChatsList(defaultChats);
        }
    }, []);

    const [currentChat, setCurrentChat] = useState("");

    useEffect(() => {
        if (defaultChats.length > 0) {
            setCurrentChat(defaultChats[0]);
        }
    }, []);

    const [currentChatDetails, setCurrentChatDetails] = useState("");

    useEffect(() => {
        if (defaultDetails != null) {
            setCurrentChatDetails(defaultDetails);
        }
    }, []);

    // get current user from server once
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("http://localhost:5000/api/Users/" + username, {
                    "method": "get",
                    "headers": {
                        "authorization": "Bearer " + token
                    }
                })
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        }
        fetchUser();
    }, [])

    async function fetchChats() {
        try {
            const res = await fetch("http://localhost:5000/api/Chats", {
                "method": "get",
                "headers": {
                    "authorization": "Bearer " + token
                }
            })
            const data = await res.json();
            setChats(data);
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    // get all chats of user from the server
    useEffect(() => {
        if (chats.length > 0) {
            fetchChats();
        }
    }, []);

    async function fetchCurrentChatDetails(chat) {
        try {
            const res = await fetch("http://localhost:5000/api/Chats/" + chat.id, {
                "method": "get",
                "headers": {
                    "authorization": "Bearer " + token
                }
            })
            const data = await res.json();
            setCurrentChatDetails(data);
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    // get current chat from server
    useEffect(() => {
        if (currentChat.length > 0 || currentChat.length == undefined) {
            fetchCurrentChatDetails(currentChat);
        }
    }, [chats, currentChat]);

    // add new message
    async function addMessage(content) {
        try {
            const data = {
                "msg": content
            }
            const res = await fetch("http://localhost:5000/api/Chats/" + currentChat.id + "/Messages", {
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                "body": JSON.stringify(data)
            })
            await fetchChats();
            socket.emit('sentMessage', { sender: username, chatId: currentChat.id });
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    // add new chat
    async function addChat(newUsername) {
        const data = {
            username: newUsername,
        }
        try {
            const res = await fetch('http://localhost:5000/api/Chats', {
                "method": "post",
                "headers": {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                },
                "body": JSON.stringify(data)
            })
            await fetchChats();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    // get current user messages
    async function fetchMessages(chat) {
        try {
            const res = await fetch("http://localhost:5000/api/Chats/" + chat.id + "/Messages", {
                "method": "get",
                "headers": {
                    "authorization": "Bearer " + token
                }
            })
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    useEffect(() => {
        if (currentChat.length > 0 || currentChat.length == undefined) {
            const messages = fetchMessages(currentChat);
        }
    }, [currentChatDetails]);

    useEffect(() => {
        if (messages.length > 0) {
            const temp = messages.reverse().map((message, key) => {
                if (message.sender.username == username) {
                    return <SentMessageItem message={message} key={key} />
                }
                return <ReceivedMessageItem message={message} key={key} />
            });
            setMessagesList(temp);
        } else {
            setMessagesList([]);
        }

    }, [messages]);

    async function doSearch() {
        if (chats != null && chats.length > 0) {
            setChatsList(chats.filter((chat) => chat.user.displayName.toLowerCase().includes(input.toLowerCase())));
        }
    }

    useEffect(() => {
        doSearch(input);
    }, [input, chats]);

    useEffect(() => {

        socket.on('receivedMessage', function (data) {
            if (data.receiver.username === username) {
                alert(data.sender.displayName + " sent you a message");
                fetchChats();
            }
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('receivedMessage');
        };

    }, [socket]);




    return (
        <>
            <div className="container-xxl">
                <div className="row g-0 h-100">

                    {/*<!-- left section, conversation list -->*/}
                    <div className="col-md-4">

                        <UserDetails user={user} />

                        <Search setInput={setInput} />

                        <ContactListResults chats={chatsList} setCurrentChat={setCurrentChat} />

                    </div>

                    {/*<!-- right section, the chat -->*/}
                    <div className="col-md-8">

                        <div className="settings-tray">

                            <ContactDetails contact={currentChat} />

                            <LogOutBtn handleLogout={handleLogout} />

                        </div>

                        <div className="messages-list">

                            {messagesList}

                        </div>

                        <ChatBox addMessage={addMessage} />

                    </div>

                </div>

                <AddContact addChat={addChat} />

            </div>

        </>
    );
}



export default ChatPage;
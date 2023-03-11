import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const Chat = () => {
    const [previousMessages, setPreviousMessages] = useState([]);
    const [message, setMessage] = useState("");
    
    const senderId = sessionStorage.getItem("isUser");
    const params = useParams();
    const receiverId = params.id;

    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);
    latestChat.current = chat;

    useEffect(() => {
        axios.get(`https://localhost:7160/chat/getMessages/${receiverId}`, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setPreviousMessages(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [receiverId]);

    const handleMessageChange = (event) => {
        event.preventDefault(); 
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
            const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7160/chatHub")
            .configureLogging(LogLevel.Information)
            .build();
        
        await connection.start();
    
        if (message.trim() !== "") {
            await connection.send("SendMessage", senderId, receiverId, message)
                .then(() => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);
                    setChat(updatedChat);
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
          setMessage("");
        }
    };
    
    return (
        <div>
            <ul>
            {previousMessages.map((message) => (
                <li key={message.id}>{message.message}</li>
            ))}
            </ul>
            <div>
                {chat.map((message) => (
                    <div key={message}>{message}</div>
                ))}
            </div>
            <form >
                <input type="text" value={message} onChange={(e) => handleMessageChange(e)} />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Send</button>
            </form>
        </div>
    );

};

export default Chat;
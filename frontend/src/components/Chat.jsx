import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useParams } from "react-router-dom";
import axios from "axios";

const Chat = () => {
    const [previousMessages, setPreviousMessages] = useState([]);
    const [message, setMessage] = useState("");

    const params = useParams();
    const receiverId = params.id;

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
    const joinChat = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7160/chatHub")
            .configureLogging(LogLevel.Information)
            .build();

        // connection.on("ReceiveMessage", (senderId, receiverId, message) => {
        //     console.log(`Message received: Sender ID = ${senderId}, Receiver ID = ${receiverId}, Message = ${message}`);
        // });

        await connection.start();
        const senderId = "9ef82813-bd9c-4165-9915-5a72a00ce71b"; // replace with the ID of the user sending the message
        const receiverId = "8b01a376-796a-4f2d-8d6f-994307d43db0"; // replace with the ID of the user you want to send a message to
        const message = "Hello, world!";
        connection.invoke("SendMessage", senderId, receiverId, message)
            .then(() => {
                console.log(message);
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    };

    return (
        <div>
            <button onClick={joinChat}>Join Chat</button>
        </div>
    );

};

export default Chat;
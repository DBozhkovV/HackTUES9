import React from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Chat = () => {

    const joinChat = async () => {
        const connection = new HubConnectionBuilder()
        .withUrl("https://127.0.0.1:3000/chat")
        .configureLogging(LogLevel.Information)
        .build();

        connection.on("ReceiveMessage", (senderId, receiverId, message) => {
            console.log(`Message received: Sender ID = ${senderId}, Receiver ID = ${receiverId}, Message = ${message}`);
        });

        await connection.start();

        // Call the SendMessage method to simulate a chat message
        connection.invoke("SendMessage", "sender1", "receiver1", "Hello, world!")
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <button onClick={joinChat}>Join Chat</button>
        </div>
    );

};

export default Chat;
import React from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Chat = () => {

    const joinChat = async () => {
        const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7160/chatHub")
        .configureLogging(LogLevel.Information)
        .build();

        connection.on("ReceiveMessage", (senderId, receiverId, message) => {
            console.log(`Message received: Sender ID = ${senderId}, Receiver ID = ${receiverId}, Message = ${message}`);
        });

        await connection.start();
        const senderId = "005393b4-b0b2-4aa6-a631-11a5f37e2c78"; // replace with the ID of the user sending the message
        const receiverId = "9631eb8e-da6f-48c2-9018-736676a4b677"; // replace with the ID of the user you want to send a message to
        const message = "Hello, world!";
        connection.invoke("SendMessage", senderId, receiverId, message)
            .then(() => {
                console.log("Message sent.");
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
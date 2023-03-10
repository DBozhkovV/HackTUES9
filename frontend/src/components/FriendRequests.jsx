import React, { useState, useEffect } from "react";
import axios from "axios";

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const getFriendRequests = async () => {
            await axios.get(`https://localhost:7160/friendship/friendRequests`, { withCredentials: true })
                .then(response => {
                    setFriendRequests(response.data);
                })
                .catch(error => {
                    console.error(error);
                })
        }
        getFriendRequests();
    }, []);

    return (
        <div>
            <h1>Friend Requests</h1>
            {friendRequests.map((friendRequest) => (
                <div>
                    <h1>{friendRequest.username}</h1>
                    <button>Accept</button>
                    <button>Decline</button>
                </div>
            ))}
        </div>
    );
};

export default FriendRequests;
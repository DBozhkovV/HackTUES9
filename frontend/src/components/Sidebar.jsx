import React, { useState, useEffect } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import SendFriendRequest from './SendFriendRequest';

const Sidebar = () => {
  const [friends, setFriends] = useState([]);
  const [showFriendRequest, setShowFriendRequest] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
        await axios.get(`https://localhost:7160/friendship/friendRequests`, { withCredentials: true })
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    getFriends();
}, []);

  return (
    <div style={{ position: "sticky", top: "50px", height: "94.2vh"}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Friends
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>  
            <NavLink className="activeClicked" onClick={() => setShowFriendRequest(true)}>
              <SendFriendRequest show={showFriendRequest} onHide={() => setShowFriendRequest(false)} />
              <CDBSidebarMenuItem icon="columns">Send friend request</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/requests" className="activeClicked">
              <CDBSidebarMenuItem icon="columns">See your friend requests</CDBSidebarMenuItem>
            </NavLink>
            <hr/>
            {friends.map((friend) => (
              <NavLink to="/" className="activeClicked">
                  <CDBSidebarMenuItem icon="columns">{friend.username}</CDBSidebarMenuItem>
              </NavLink>
            ))}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
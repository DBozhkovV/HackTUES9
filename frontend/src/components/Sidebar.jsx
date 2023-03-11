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
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [friends, setFriends] = useState([]);
  const [showFriendRequest, setShowFriendRequest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect");
    const getFriends = async () => {
        await axios.get(`https://localhost:7160/friendship/friends`, { withCredentials: true })
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
      <CDBSidebar textColor="#333" backgroundColor="#fff">
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
            {friends.map((friend, index) => (
              <NavLink to={`/chat/${friend.friendId}`} key={index} className="activeClicked" >
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
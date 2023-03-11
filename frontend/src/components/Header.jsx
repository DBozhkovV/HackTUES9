import React, { useState, useEffect, useRef } from 'react';
import { Button, Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import SelectWalletModal from './ConnectModal';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import { useWeb3Context } from '../hooks/useWeb3Context';
import md5 from 'md5';
import Logout from './Logout';

function Header() {
  const { connector, provider, account, isActive, balance, contract, setBalanceUpdate } = useWeb3Context();
  const navigate = useNavigate();
  const isUser = sessionStorage.getItem('isUser');
  const [showLogout, setShowLogout] = useState(false);

  function truncate(str, n) {
    return str.length > n
      ? str.substr(0, n - 1) + '...' + str.substr(str.length - 4, str.length - 1)
      : str;
  }

  useEffect(() => {
    connector.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly');
    });
  }, [connector]);


  return (
    <Navbar
      bg="dark"
      expand="xl"
      className="header"
      sticky='top'
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/">2loops marketplace</Navbar.Brand>
        <Navbar.Toggle aria-controls="navBar" />
        <Navbar.Offcanvas id="navBar" aria-labelledby="navBar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="navBar">2loops marketplace</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="align-items-center justify-content-between">
            <Nav className="d-flex align-items-center">
              <Button variant="outline-primary" className="mx-2" onClick={() => navigate("/posts")}>
                Posts
              </Button>
              <Button variant="outline-primary" className="mx-2" onClick={() => navigate("/chat")}>
                Chat
              </Button>
              <Button className="mx-2" variant="outline-primary" onClick={() => navigate("/marketplace")}>
                Marketplace
              </Button>
            </Nav>
            
            {isUser ? (
              <Navbar.Collapse className="justify-content-end">
                <Button className="mx-2" variant="primary" onClick={() => setShowLogout(true)}>
                  Logout
                </Button>
                <Logout show={showLogout} onHide={() => setShowLogout(false)} />
              </Navbar.Collapse>
            ) : (
              <Navbar.Collapse className="justify-content-end">
                <Button className="mx-2" variant="outline-primary" onClick={() => navigate("/login ")}>
                  Login
                </Button>
                <Button className="mx-2" variant="outline-primary" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Navbar.Collapse>
            )}
            {isActive ? (
              <div className="d-flex align-items-center justify-content-end">
                <div className="d-flex">
                  <div className="me-2">
                    <Deposit />
                  </div>
                  <div className="me-1">
                    <Withdraw />
                  </div>
                </div>
                <span className="mx-3">|</span>
                <img
                  className="img-profile me-3"
                  src={`https://www.gravatar.com/avatar/${md5(account)}/?d=identicon`}
                  alt=""
                />
                <span>{truncate(account, 6)}</span>
                <span className="mx-3">|</span>
                <p>
                  <span className="fw-bold">Balance: </span>
                  <span>{balance} S2L</span>
                </p>
              </div>
            ) : (
              null
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
import React, { useState, useEffect, useRef } from 'react';
import { Button, Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

import SelectWalletModal from './ConnectModal';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

import { useWeb3Context } from '../hooks/useWeb3Context';


function Header() {
  const { connector, provider, account, isActive, balance, contract, setBalanceUpdate } = useWeb3Context();
  const navRef = useRef(null);
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

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        navRef.current.style.top = "0";
      } else {
        navRef.current.style.top = "-100px";
      }
      prevScrollpos = currentScrollPos;
    }
  }, []);

  return (
    <Navbar
      bg="light"
      expand="xl"
      className="header"
      sticky='top'
      ref={navRef}
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
              <Link className="mx-2" to="posts">
                Posts
              </Link>
              <Link className="mx-2" to="chat">
                Chat
              </Link>
              <Link className="mx-2" to="marketplace">
                Marketplace
              </Link>
            </Nav>
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
                <span>{truncate(account, 6)}</span>
                <span className="mx-3">|</span>
                <p>
                  <span className="fw-bold">Balance: </span>
                  <span>{balance} S2L</span>
                </p>
              </div>
            ) : (
              <SelectWalletModal />
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
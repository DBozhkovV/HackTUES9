import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/_register.scss";
import { useWeb3Context } from '../hooks/useWeb3Context';
import SelectWalletModal from './ConnectModal';

const Register = () => {
  const {account } = useWeb3Context();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
  };

  return (
    <div className="register-frame">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <div className="wallet-button">
          <SelectWalletModal />
        </div>
        {account ? (
          <Button variant="primary" type="submit" onClick={(event) => handleSubmit(event)}>
            Register
          </Button>
          ) : null }
      </Form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/_register.scss";
import { useWeb3Context } from '../hooks/useWeb3Context';
import SelectWalletModal from './ConnectModal';
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const { account } = useWeb3Context();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("https://localhost:7160/auth/register", {
        walletId: account,
        username: username,
        email: email,
        password: password
    })
    .then(() => {
        navigate("/login");
    })
    .catch((error) => {
        console.log(error);
    });
  };

  return (
    <div className="register-frame">
      <Form className="form-frame" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <hr />
        {account ? (
          <Button variant="primary" type="submit" onClick={(event) => handleSubmit(event)}>
            Register
          </Button>
          ) : (
          <div className="wallet-button">
            <SelectWalletModal />
          </div>
          )
        }
      </Form>
    </div>
  );
};

export default Register;

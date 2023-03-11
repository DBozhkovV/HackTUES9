import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import "../styles/_login.scss";
import SelectWalletModal from './ConnectModal';
import { useWeb3Context } from '../hooks/useWeb3Context';

const Login = () => {
    const { account } = useWeb3Context();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("https://localhost:7160/auth/login", {
        email,
        password
    },{
        withCredentials: true
    })
    .then((response) => {
        sessionStorage.setItem("isUser", response.data);
        navigate("/");
    })
    .catch((error) => {
        console.log(error);
    });
  };

  return (
    <div className="login-frame">
      <Form onSubmit={handleSubmit} className="form-frame">
        <Form.Group>
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <br />
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
          <Button className="login-button" variant="primary" type="submit" onClick={(event) => handleSubmit(event)}>
            Login
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

export default Login;

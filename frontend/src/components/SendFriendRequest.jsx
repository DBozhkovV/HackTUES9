import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ModalBody, ModalTitle} from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SendFriendRequest = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    const handleSubmit = async (event) => { 
        event.preventDefault();
        await axios.post(`https://localhost:7160/friendship/send`, {
            username: username
        }, {
            withCredentials: true
        })
        .then(() => {
            navigate(0);
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <ModalTitle>
                    Friend Request
                </ModalTitle>
            </Modal.Header>
            <ModalBody>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </InputGroup>  
            </ModalBody>
            <Modal.Footer>
                <Button onClick={(event) => handleSubmit(event)} variant="outline-success">Send</Button>
                <Button onClick={() => props.onHide()} variant="outline-danger">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SendFriendRequest;
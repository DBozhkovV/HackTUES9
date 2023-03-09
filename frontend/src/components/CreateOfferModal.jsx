
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { BUY_TICKETS_EVENT_QUERY, SELL_TICKETS_QUERY } from '../utils/subgraphQueries';
import { useQuery } from '@apollo/client';
import { onAttemptToApprove } from "../utils/utils";
import { parseEther } from "ethers/lib/utils";
import { useWeb3Context } from "../hooks/useWeb3Context";

function CreateOfferModal() {
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState(0);
    const [itemName, setItemName] = useState("");
    const [validated, setValidated] = useState(false);
    const { account, contract, tokenContract } = useWeb3Context();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const validatePrice = (e) => {
        const value = Number(e.target.value);
        if (value < 0 && value > -100) {
            e.target.value = -Number(e.target.value);
        }
        else if (value < -100 || value > 100) {
            e.target.value = 100;
        }
        setPrice(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const priceInWei = parseEther(price.toString());
        const tx = await contract.createOffer(itemName, priceInWei);
        await tx.wait();
        handleClose();
    }

    return (
        <>
      <Button onClick={handleShow}>Create offer </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={onSubmit}
            noValidate
            validated={validated}
          >
            <Form.Group controlId="price">
              <Form.Label>Item name</Form.Label>
                <Form.Control input="text" value={itemName} onChange={(e) => setItemName(e.target.value) } />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
                <Form.Control 
                    type="number"
                    step="0.001"
                    placeholder="Item price"
                    onChange={validatePrice}
                    value={price}
                    required
                    min="0.001"
                max="100"
                />
                <Form.Control.Feedback type="invalid">
                    Minimum price is 0.001 Tik.
                </Form.Control.Feedback>
            </Form.Group>
          <div className="mt-4">
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </div>
          </Form>
          </Modal.Body>
      </Modal>
        </>
    );
}

export default CreateOfferModal;
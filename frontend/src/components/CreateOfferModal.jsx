
import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { onAttemptToApprove, resizeImage } from "../utils/utils";
import { W3LINK_URL } from '../constants/constants';
import { parseEther } from "ethers/lib/utils";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { uploadImmutableData } from '../utils/web3.storageEndpoints';

function CreateOfferModal() {
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState(0);
    const [itemName, setItemName] = useState("");
    const [itemImage, setItemImage] = useState(null);
    const [senderName, setSenderName] = useState("");
    const [senderPhone, setSenderPhone] = useState("");
    const [senderCity, setSenderCity] = useState("");
    const [senderPostalCode, setSenderPostalCode] = useState("");
    const [senderStreet, setSenderStreet] = useState("");
    const [senderStreetNumber, setSenderStreetNumber] = useState("");
    const [validated, setValidated] = useState(false);
    const { account, contract, tokenContract } = useWeb3Context();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setImage = (e) => {
        if (e.target.files[0].size > 1024 * 1024 * 10) {
            e.preventDefault();
            alert("File size cannot be larger than 10MB");
            const items = new DataTransfer();
            e.target.files = items.files;
        }
        if(!e.target.files[0].type.match('image.*')) {
            e.preventDefault();
            alert("Only images are allowed");
            e.target.files = new DataTransfer().files;
        }
        resizeImage(e.target.files[0]).then((resizedImage) => {
            setItemImage(resizedImage);
        });
    }

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
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        }
        else {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            const imageCid = await uploadImmutableData([itemImage]);
            const priceInWei = parseEther(price.toString());
            await contract.createOffer(
                priceInWei,
                itemName,
                encodeURI(`${W3LINK_URL}/${imageCid}/${itemImage.name}`),
                encodeURI(`${W3LINK_URL}/${imageCid}`),
            );
            handleClose();
        }
    }

    return (
    <>
      <Button onClick={handleShow}>Create listing</Button>
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
                <Form.Control input="text" value={itemName} placeholder="Item name" onChange={(e) => setItemName(e.target.value) } />
            </Form.Group>
            <Row>            
                <Form.Group as={Col} controlId="ticketImage">
                    <Form.Label>Item image</Form.Label>
                    <Form.Control
                        type="file" 
                        accept=".jpg, .png, .jpeg"
                        onChange={setImage}
                        required 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide an image.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="price" className="mb-3">
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
            </Row>
                <Form.Text className="text-muted">
                    Delivery is only supported in Bulgaria
                </Form.Text>
                <Form.Group controlId="senderName">
                    <Form.Label>Sender name</Form.Label>
                    <Form.Control type="text" required placeholder="Sender name" value={senderName} onChange={(e) => setSenderName(e.target.value ) }/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a sender name
                    </Form.Control.Feedback>
                </Form.Group>
                    <Form.Group controlId="senderPhone">
                    <Form.Label>Sender phone</Form.Label>
                            <Form.Control type="text" required placeholder="Sender phone number" value={senderPhone} onChange={(e) => setSenderPhone(e.target.value ) } />
                        <Form.Control.Feedback type="invalid">
                            Please provide a sender phone number
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                <Row>        
                    <Form.Group as={Col}  controlId="senderCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" required placeholder="Sender city" value={senderCity} onChange={(e) => setSenderCity(e.target.value ) }/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a city
                        </Form.Control.Feedback>
                    </Form.Group>    
                    <Form.Group as={Col} controlId="senderPostalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" required placeholder="Sender postal code" value={senderPostalCode} onChange={(e) => setSenderPostalCode(e.target.value ) }/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a postal code
                        </Form.Control.Feedback>
                    </Form.Group>  
                </Row>
                <Row>
                    <Form.Group controlId="senderStreep" as={Col}>
                        <Form.Label>Street name</Form.Label>
                        <Form.Control type="text" required placeholder="Sender street name" value={senderStreet} onChange={(e) => setSenderStreet(e.target.value ) }/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a street name
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="senderStreetNumber" as={Col}>
                        <Form.Label>Sender street number</Form.Label>
                        <Form.Control type="text" required placeholder="Sender street number" value={senderStreetNumber} onChange={(e) => setSenderStreetNumber(e.target.value ) }/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a street number
                        </Form.Control.Feedback>
                    </Form.Group> 
                </Row>
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

import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { resizeImage } from "../utils/utils";
import { W3LINK_URL, MARKETPLACE_ADDRESS } from '../constants/constants';
import MARKETPLACE_ABI from '../constants/abis/Marketplace.json';
import { ethers } from 'ethers';
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
    const { account, contract, tokenContract, biconomy } = useWeb3Context();
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
            const metadata = {
                name: itemName,
                description: `Price: ${price} S2L`,
                image: `${W3LINK_URL}/${imageCid}/${itemImage.name}`,
                properties: {
                    price: price,
                    senderName: senderName,
                    senderPhone: senderPhone,
                }
            }
            const metadataCid = await uploadImmutableData([new File([JSON.stringify(metadata)], `${itemName.trim()}_metadata.json`)]);
            const priceInWei = parseEther(price.toString());
            const provider = await biconomy.provider;
            console.log("provider", provider);
            const contractInstance = new ethers.Contract(
              MARKETPLACE_ADDRESS,
              MARKETPLACE_ABI.abi,
              biconomy.ethersProvider
            );
            let { data } = await contractInstance.populateTransaction.createOffer(
                priceInWei,
                itemName,
                encodeURI(`${W3LINK_URL}/${imageCid}/${itemImage.name}`),
                encodeURI(`${W3LINK_URL}/${metadataCid}/${itemName.trim()}_metadata.json`),
            );
            let txParams = {
              data: data,
              to: MARKETPLACE_ADDRESS,
              from: account,
              signatureType: "PERSONAL_SIGN",
              gasLimit: 5000000,
            };
            const tx = await provider.send("eth_sendTransaction", [txParams]);
            //call bakcend to save credentials
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
            <Form.Group controlId="price" className='me-3'>
                <Form.Control input="text" value={itemName} placeholder="Item name" onChange={(e) => setItemName(e.target.value) } />
            </Form.Group>
            <Row className='my-3'>            
                <Form.Group as={Col} controlId="ticketImage">
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
                <Form.Group as={Col} controlId="price">
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
                    <Form.Control type="text" required placeholder="Sender name" value={senderName} onChange={(e) => setSenderName(e.target.value ) }/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a sender name
                    </Form.Control.Feedback>
                </Form.Group>
                    <Form.Group controlId="senderPhone" className='my-3'>
                            <Form.Control type="text" required placeholder="Sender phone number" value={senderPhone} onChange={(e) => setSenderPhone(e.target.value ) } />
                        <Form.Control.Feedback type="invalid">
                            Please provide a sender phone number
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                <Row className='my-3'>        
                    <Form.Group as={Col}  controlId="senderCity">
                        <Form.Control type="text" required placeholder="Sender city" value={senderCity} onChange={(e) => setSenderCity(e.target.value ) }/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a city
                        </Form.Control.Feedback>
                    </Form.Group>    
                    <Form.Group as={Col} controlId="senderPostalCode">
                        <Form.Control type="text" required placeholder="Sender postal code" value={senderPostalCode} onChange={(e) => setSenderPostalCode(e.target.value ) }/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a postal code
                        </Form.Control.Feedback>
                    </Form.Group>  
                </Row>
                <Row>
                    <Form.Group controlId="senderStreet" as={Col}>
                        <Form.Control type="text" required placeholder="Sender street name" value={senderStreet} onChange={(e) => setSenderStreet(e.target.value ) }/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a street name
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="senderStreetNumber" as={Col}>
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
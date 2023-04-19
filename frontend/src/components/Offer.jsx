import React, { useState } from "react";
import { Button, Image, Form, Row, Col } from "react-bootstrap";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import { MARKETPLACE_ADDRESS } from "../constants/constants";
import MARKETPLACE_ABI from "../constants/abis/Marketplace.json";
import { onAttemptToApprove } from "../utils/utils";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { Modal } from "react-bootstrap";
import axios from "axios";
function Offer({ offer }) {
    const [showAcceptOfferModal, setShowAcceptOfferModal] = useState(false);
    const showModal = () => setShowAcceptOfferModal(true);
    const hideModal = () => setShowAcceptOfferModal(false);
    const [senderName, setSenderName] = useState("");
    const [senderPhone, setSenderPhone] = useState("");
    const [senderCity, setSenderCity] = useState("");
    const [senderPostalCode, setSenderPostalCode] = useState("");
    const [senderStreet, setSenderStreet] = useState("");
    const [senderStreetNumber, setSenderStreetNumber] = useState("");
    const [senderWeight, setSenderWeight] = useState();
    const [validated, setValidated] = useState(false);
    const { account, contract, tokenContract, setBalanceUpdate, biconomy } =
        useWeb3Context();
    async function cancelOffer() {
        const provider = await biconomy.provider;
        console.log("provider", provider);
        const contractInstance = new ethers.Contract(
            MARKETPLACE_ADDRESS,
            MARKETPLACE_ABI.abi,
            biconomy.ethersProvider
        );
        let { data } = await contractInstance.populateTransaction.cancelOffer(
            offer.id
        );
        let txParams = {
            data: data,
            to: MARKETPLACE_ADDRESS,
            from: account,
            signatureType: "PERSONAL_SIGN",
            gasLimit: 1000000,
        };
        const tx = await provider.send("eth_sendTransaction", [txParams]);
    }

    const onSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        } else {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            const permit = await onAttemptToApprove(
                contract,
                tokenContract,
                account,
                ethers.utils.formatEther(offer.price.toString()),
                +new Date() + 1000 * 60 * 5
            );
            // call backend then call this
            axios
                .post("https://localhost:7160/CreateTovaritelnica", {
                    street: senderStreet,
                    weight: senderWeight,
                    cityName: senderCity,
                    postCode: senderPostalCode,
                    userName: senderName,
                    shipmentId: "asdas",
                    countryCode: "BGN",
                    phoneNumber: senderPhone,
                    streetNumber: senderStreetNumber,
                    shipmentDescription: "alabala",
                })
                .then((res) => console.log(res))
                .catch((err) => console.error(err));

            const provider = await biconomy.provider;
            const contractInstance = new ethers.Contract(
                MARKETPLACE_ADDRESS,
                MARKETPLACE_ABI.abi,
                biconomy.ethersProvider
            );
            let { data } = await contractInstance.populateTransaction.buyOffer(
                offer.id,
                permit.deadline,
                permit.v,
                permit.r,
                permit.s
            );
            let txParams = {
                data: data,
                to: MARKETPLACE_ADDRESS,
                from: account,
                signatureType: "PERSONAL_SIGN",
                gasLimit: 1000000,
            };
            console.log("txParams", txParams);
            console.log(provider);
            const tx = await provider.send("eth_sendTransaction", [txParams]);
            setBalanceUpdate(true);
            hideModal();
        }
    };
    return (
        <div className="m-3">
            {offer?.event?.startTime < +new Date() ? (
                <div className="d-flex justify-content-center">
                    <p className="text-danger">Expired</p>
                </div>
            ) : null}
            <Image src={offer.itemImage} fluid rounded />
            <p className="desc-text d-flex justify-content-between mt-4">
                <span>Item: {offer.itemName}</span>
                <span>Price: {formatEther(offer.price)}</span>
            </p>
            {account === undefined ? null : (
                <div className="d-flex justify-content-center mt-4">
                    {offer.seller.address === account.toLowerCase() ? (
                        <Button onClick={cancelOffer} variant="danger">
                            Cancel listing
                        </Button>
                    ) : (
                        <Button onClick={showModal}>Buy item</Button>
                    )}
                </div>
            )}
            <Modal show={showAcceptOfferModal} onHide={hideModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Accept offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit} noValidate validated={validated}>
                        <Form.Text className="text-muted">
                            Delivery is only supported in Bulgaria
                        </Form.Text>
                        <Form.Group controlId="receiverName" className="my-3">
                            <Form.Control
                                type="text"
                                required
                                placeholder="Receiver name"
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a receiver name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="receiverPhone" className="my-3">
                            <Form.Control
                                type="text"
                                required
                                placeholder="Receiver phone number"
                                value={senderPhone}
                                onChange={(e) => setSenderPhone(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a receiver phone number
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Row className="my-3">
                            <Form.Group as={Col} controlId="receiverCity">
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Receiver city"
                                    value={senderCity}
                                    onChange={(e) =>
                                        setSenderCity(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a city
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="receiverPostalCode">
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Receiver postal code"
                                    value={senderPostalCode}
                                    onChange={(e) =>
                                        setSenderPostalCode(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a postal code
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="receiverStreet" as={Col}>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Receiver street name"
                                    value={senderStreet}
                                    onChange={(e) =>
                                        setSenderStreet(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a street name
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                controlId="receiverStreetNumber"
                                as={Col}
                            >
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Receiver street number"
                                    value={senderStreetNumber}
                                    onChange={(e) =>
                                        setSenderStreetNumber(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a street number
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                controlId="receiverStreetNumber"
                                as={Col}
                            >
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Receiver weight"
                                    value={senderWeight}
                                    onChange={(e) =>
                                        setSenderWeight(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide weight
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
        </div>
    );
}

export default Offer;

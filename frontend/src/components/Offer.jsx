import React, { useEffect, useState } from 'react';
import { Button, Image, Form, Row, Col } from 'react-bootstrap';
import { formatEther } from 'ethers/lib/utils';
import { useQuery } from '@apollo/client';
import { onAttemptToApprove } from '../utils/utils';
import { useWeb3Context } from '../hooks/useWeb3Context';
import { Modal } from 'react-bootstrap';
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
  const [validated, setValidated] = useState(false);
  const { account, contract, tokenContract, setBalanceUpdate } = useWeb3Context();
    console.log(offer);
  async function cancelOffer() {
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
          const priceInWei = ethers.utils.parseEther(offer.price);
          const permit = await onAttemptToApprove(
            contract.address,
            tokenContract,
            account,
            priceInWei,
            + new Date() + 1000 * 60 * 5
          );
          // call backend then call this
          const tx = await contract.buyOffer(
            offer.id,
            permit.deadline,
            permit.v,
            permit.r,
            permit.s,
            
          );
          tx.wait().then(() => {
            setBalanceUpdate(true);
            handleClose();
          });
        }
    }
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
          {(offer.seller.address === account.toLowerCase()) ? (
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
          <Form
            onSubmit={onSubmit}
            noValidate
            validated={validated}
          >
          <Form.Text className="text-muted">
              Delivery is only supported in Bulgaria
          </Form.Text>
          <Form.Group controlId="receiverName" className='my-3'>
              <Form.Control type="text" required placeholder="Receiver name" value={senderName} onChange={(e) => setSenderName(e.target.value ) }/>
              <Form.Control.Feedback type="invalid">
                  Please provide a receiver name
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="receiverPhone" className='my-3'>
                  <Form.Control type="text" required placeholder="Receiver phone number" value={senderPhone} onChange={(e) => setSenderPhone(e.target.value ) } />
              <Form.Control.Feedback type="invalid">
                  Please provide a receiver phone number
              </Form.Control.Feedback>
          </Form.Group>
          <Row className='my-3'>        
            <Form.Group as={Col}  controlId="receiverCity">
              <Form.Control type="text" required placeholder="Receiver city" value={senderCity} onChange={(e) => setSenderCity(e.target.value ) }/>
              <Form.Control.Feedback type="invalid">
                  Please provide a city
              </Form.Control.Feedback>
            </Form.Group>    
            <Form.Group as={Col} controlId="receiverPostalCode">
              <Form.Control type="text" required placeholder="Receiver postal code" value={senderPostalCode} onChange={(e) => setSenderPostalCode(e.target.value ) }/>
              <Form.Control.Feedback type="invalid">
                  Please provide a postal code
              </Form.Control.Feedback>
            </Form.Group>  
          </Row>
          <Row>
            <Form.Group controlId="receiverStreet" as={Col}>
              <Form.Control type="text" required placeholder="Receiver street name" value={senderStreet} onChange={(e) => setSenderStreet(e.target.value ) }/>
              <Form.Control.Feedback type="invalid">
                  Please provide a street name
              </Form.Control.Feedback>
            </Form.Group> 
            <Form.Group controlId="receiverStreetNumber" as={Col}>
                <Form.Control type="text" required placeholder="Receiver street number" value={senderStreetNumber} onChange={(e) => setSenderStreetNumber(e.target.value ) }/>
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
    </div>
  );
}

export default Offer;
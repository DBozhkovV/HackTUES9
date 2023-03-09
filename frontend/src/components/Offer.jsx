import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { formatEther } from 'ethers/lib/utils';
import { useQuery } from '@apollo/client';
import { onAttemptToApprove } from '../utils/utils';
import { useWeb3Context } from '../hooks/useWeb3Context';
import { Modal } from 'react-bootstrap';
function Offer({ offer }) {
    const [showAcceptOfferModal, setShowAcceptOfferModal] = useState(false);
    const showModal = () => setShowAcceptOfferModal(true);
    const hideModal = () => setShowAcceptOfferModal(false);
  const { account, contract, tokenContract, setBalanceUpdate } = useWeb3Context();
    console.log(offer);
  async function cancelOffer() {
  }

  async function acceptOffer() {
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
          <Modal show={showAcceptOfferModal} centered onHide={hideModal} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                  <Modal.Title>Buy Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>Are you sure you want to accept this offer?</p>
                  <p>Item: {offer.itemName}</p>   
                  <p>Price: {formatEther(offer.price)}</p>
              </Modal.Body>
              
          </Modal>
    </div>
  );
}

export default Offer;
import { ethers } from 'ethers';
import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { MARKETPLACE_ADDRESS } from '../constants/constants';
import MARKETPLACE_ABI from '../constants/abis/Marketplace.json';
import { useWeb3Context } from '../hooks/useWeb3Context';
function Withdraw() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { contract, balance, setBalanceUpdate, biconomy, account } = useWeb3Context();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setWithdrawAmount(0);
  };
  const handleShowSuccess = () => setShowSuccess(true);
  const validatewithdrawAmount = e => {
    const value = Number(e.target.value);
    if (value < 0 && value > -100) {
      e.target.value = -Number(e.target.value);
    } else if (value < -100 || value > 100) {
      e.target.value = 100;
    }
    setWithdrawAmount(e.target.value);
  };

  const handleSubmit = async e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      setValidated(true);
      const amount = ethers.utils.parseEther(withdrawAmount);
      const provider = await biconomy.provider;
      console.log("provider", provider);
      const contractInstance = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        MARKETPLACE_ABI.abi,
        biconomy.ethersProvider
      );
      let { data } = await contractInstance.populateTransaction.withdraw(
          amount
      );
      let txParams = {
        data: data,
        to: MARKETPLACE_ADDRESS,
        from: account,
        signatureType: "PERSONAL_SIGN",
        gasLimit: 1000000,
      };
      const tx = await provider.send("eth_sendTransaction", [txParams]);    
      handleClose();
      setValidated(false);
      handleShowSuccess();
      setBalanceUpdate(true);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Withdraw
      </Button>
      <Modal show={show} onHide={handleClose} centered keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mt-b alert alert-info">
            Balance after withdraw : {Number(balance) - Number(withdrawAmount)} TIK (ETH:TIK - 1:1)
          </p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="withdrawAmount">
              <Form.Label>Withdraw amount (in TIK)</Form.Label>
              <Form.Control
                type="number"
                step="0.001"
                placeholder="Withdraw amount"
                onChange={validatewithdrawAmount}
                value={withdrawAmount}
                required
                min="0.001"
                max={balance === undefined ? 0 : balance}
              />
              <Form.Control.Feedback type="invalid">
                Minimum withdraw is 0.001 Tik.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button className="mt-3" variant="primary" type="submit">
                Withdraw
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showSuccess} onHide={handleCloseSuccess} centered keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sucessfull withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <p>You have successfully withdrawn {withdrawAmount} TIK.</p>
            <Button variant="primary" onClick={handleCloseSuccess}>
              Continue
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Withdraw;
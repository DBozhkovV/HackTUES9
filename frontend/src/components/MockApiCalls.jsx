import React, { useEffect, useState } from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import { useWeb3Context } from "../hooks/useWeb3Context";
import { ACCEPTED_OFFERS_QUERY } from '../utils/subgraphQueries';
import { useQuery } from '@apollo/client';
import InfiniteScroll from '@alexcambose/react-infinite-scroll';
function UserOffersModal() {
    const [show, setShow] = useState(false);
    const [offers, setOffers] = useState([]);
    const { account, contract } = useWeb3Context();
    const [hasMoreOffers, setHasMoreOffers] = useState(true);
    const { data, loading, fetchMore: fetchMore, error } = useQuery(ACCEPTED_OFFERS_QUERY, {
        variables: {
            first: 20,
            skip: 0,
        }
    });
  useEffect(() => {
      if (!loading) {
          console.log(error);
      setOffers(data.offers);
    }
  }, [data, loading, account]);


  const loadMoreOffers = () => {
    fetchMore({
      variables: {
        skip: offers.length,
      }
    }).then((res) => {
      setOffers([...offers, ...res.data.offers]);
      if (res.data.offers.length < 20) {
        setHasMoreOffers(false);
      }
    });
    };
    
    const callSuccessHandler = (id) => {
        contract.completeSuccessfullOffer(id);
    }
    const callErrorHandler = () => {
        contract.completeFailedOffer(id);
    }
    
    
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
                backdrop="static"
                keyboard={false}
                dialogClassName="offers-modal-w"
                contentClassName="offers-modal-w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Mock econt api calls</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InfiniteScroll
                    hasMore={hasMoreOffers} loadMore={loadMoreOffers} initialLoad={false} noMore={false}
                    >
                    <div className='d-flex justify-content-center flex-wrap mt-5'>
                        {
                        offers?.map((off, index) => {
                            if (index % 4 === 0) {
                            return (
                                <div key={index} className='row w-75 d-flex justify-content-start'>
                                {
                                    offers.slice(index, index + 4).map((offer) =>
                                        <div key={offer.id} className='w-25 col-3 d-flex flex-wrap text-wrap ticket-card'>
                                            <div className='d-flex flex-column justify-content-center align-items-center align-content-center'>
                                                <p>{offer.itemName}</p>
                                                <p>sold: {offer.isSold}</p>
                                                <p>delivered: {offer.isCompleted}</p>
                                                <Button onClick={() => callSuccessHandler(offer.id)} className='my-2'>Successful delivery</Button>
                                                <Button onClick={() => callErrorHandler(offer.id)}>Unsuccessful delivery</Button>
                                            </div>
                                    </div>
                                    )
                                }
                                </div>
                            )
                            }
                            return null;
                        })
                        }
                    </div>
                    </InfiniteScroll>
                </Modal.Body>
              </Modal>
              <Button variant="primary" onClick={() => setShow(true)}>Mock API</Button>
        </>
    );
}

export default UserOffersModal;
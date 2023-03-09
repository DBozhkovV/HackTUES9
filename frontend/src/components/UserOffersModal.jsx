import React, { useEffect, useState } from 'react';
import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import { useWeb3Context } from "../hooks/useWeb3Context";
import { USER_OFFERS_QUERY } from '../utils/subgraphQueries';
import { useQuery } from '@apollo/client';
import InfiniteScroll from '@alexcambose/react-infinite-scroll';
import Offer from './Offer';
function UserOffersModal() {
    const [show, setShow] = useState(false);
    const { account } = useWeb3Context();
    const [offers, setOffers] = useState([]);
    const [hasMoreOffers, setHasMoreOffers] = useState(true);
    const { data, loading, fetchMore: fetchMore, error } = useQuery(USER_OFFERS_QUERY, {
        variables: {
            first: 20,
            skip: 0,
            user: account?.toLowerCase()
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
                    <Modal.Title>My listings</Modal.Title>
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
                                        <Offer key={offer.id} offer={offer} />
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
              <Button variant="primary" onClick={() => setShow(true)}>Your listings</Button>
        </>
    );
}

export default UserOffersModal;
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import CreateOfferModal from '../components/CreateOfferModal';
import { useQuery } from '@apollo/client';
import { OFFERS_QUERY } from '../utils/subgraphQueries';
import Offer from '../components/Offer';
import Loader from '../components/Loader';
import UserOffersModal from '../components/UserOffersModal';
import InfiniteScroll from '@alexcambose/react-infinite-scroll';
import { useWeb3Context } from '../hooks/useWeb3Context';
import { ethers } from 'ethers';

function Marketplace() {
  const [offers, setOffers] = useState([]);
  const [hasMoreOffers, setHasMoreOffers] = useState(true);
  const { account } = useWeb3Context();
  const {
    data,
    loading,
    fetchMore: fetchMore,
    error,
  } = useQuery(OFFERS_QUERY, {
    variables: {
      skip: 0,
      first: 20,
      user:
        account === undefined
          ? String(ethers.constants.AddressZero)
          : String(account?.toLowerCase()),
    },
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
      },
    }).then(res => {
      setOffers([...offers, ...res.data.offers]);
      if (res.data.offers.length < 20) {
        setHasMoreOffers(false);
      }
    });
  };
  if (loading) return <Loader />;
    
  return (
    <div className="container">
      <div className="my-5">
        <h2>Marketplace</h2>
        {account !== undefined ? (
          <div className="d-flex mt-5">
            <div className="me-3">
              <CreateOfferModal />
            </div>
            <UserOffersModal />
          </div>
        ) : null}
      </div>
      <div className="mt-5">

              <InfiniteScroll
                hasMore={hasMoreOffers}
                loadMore={loadMoreOffers}
                initialLoad={false}
                noMore={false}
              >
                <div className="row mt-5">
                  {offers?.map((offer, index) => (
                    <div key={index} className="col-md-3">
                      <div className="ticket-card">
                        <Offer key={offer.id} offer={offer} />
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
      </div>
    </div>
  );
}

export default Marketplace;
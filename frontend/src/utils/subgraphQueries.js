import { gql } from '@apollo/client';

export const OFFERS_QUERY = gql`
    query getOffers($first: Int, $skip: Int, $user: String!) {
        offers(first: $first, skip: $skip, where: { seller_ : { id_not: $user}, isSold: false, isCancelled: false }) {
            id
            seller {
                id,
                address    
            }
            price
            nft{
                tokenURI
            }
            itemImage
            itemName
        }
    }
`;

export const USER_OFFERS_QUERY = gql`
    query userOffers($user: String!) {
        offers(
            where : { 
                seller_: { id: $user},
                isSold: false,
                isCancelled: false
            } 
        ) {
            id
            price
            itemName
            itemImage
            nft{
                tokenId
                tokenURI
            }
            seller {
                id
                address
            }
        }
    }
`;	

export const ACCEPTED_OFFERS_QUERY = gql`
    query acceptedOffers {
        offers{
            id
            price
            itemName
            itemImage
            nft{
                tokenId
                tokenURI
            }
            seller {
                id
                address
            }
        }
    }
`;
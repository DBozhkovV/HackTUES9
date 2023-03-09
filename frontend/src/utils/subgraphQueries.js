import { gql } from '@apollo/client';

export const OFFERS_QUERY = gql`
    query getOffers($first: Int, $skip: Int, $user: String!) {
        offers(first: $first, skip: $skip, where: { seller_ : { id_not: $user}}) {
            id
            seller {
                id,
                address    
            }
            price
            tokenURI
            itemImage
            itemName
        }
    }
`;

export const USER_OFFERS_QUERY = gql`
    query userOffers($user: String!) {
        offers(
            where : { 
                seller_: { id: $user}
            } 
        ) {
            id
            price
            itemName
            itemImage
            tokenId
            tokenURI
            seller {
                id
                address
            }
        }
    }
`;	
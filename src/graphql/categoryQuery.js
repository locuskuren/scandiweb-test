import { gql } from 'graphql-request';

export const categoryQuery = gql`
  query getCategory($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

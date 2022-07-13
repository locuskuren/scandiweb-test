import { gql } from 'graphql-request';

export const currenciesQuery = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

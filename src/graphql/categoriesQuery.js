import { gql } from 'graphql-request';

export const categoriesQuery = gql`
  {
    categories {
      name
    }
  }
`;

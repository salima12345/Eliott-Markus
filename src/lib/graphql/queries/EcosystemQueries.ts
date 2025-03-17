import { gql } from '@apollo/client';

export const GET_ECOSYSTEM_DATA = gql`
  query GetEcosystemData {
    options {
      ecosystem {
        consultantsEtExperts
        continents
        references
        quotes {
          fullName
          quote
          image {
            node {
              sourceUrl
            }
          }
        }
      }
      footer {
        instagram
        linkedin
        twitter
      }
    }
  }
`;
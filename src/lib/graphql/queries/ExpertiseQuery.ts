import { gql } from '@apollo/client';


export const GET_ALL_EXPERTISE_SLUGS = gql`
  query GetAllExpertiseSlugs {
    expertises {
      nodes {
        slug
      }
    }
  }
`;
export const GET_EXPERTISES = gql`
  query GetExpertises {
    expertises {
      nodes {
      id
        singleExpertises {
          subtitle
          team {
              nodes {
                id
              }
            
          }
          services {
            service
          }
        }
        slug
        title
        uri
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        expertiseId
      }
    }
  }
`;

export const GET_EXPERTISE_BY_SLUG = gql`
  query GetExpertiseBySlug($slug: String!) {
    expertises(where: { name: $slug }) {
      nodes {
        singleExpertises {
          subtitle
         team {
  nodes {
    id
  }
}
          services {
            service
          }
        }
        slug
        title
        uri
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        expertiseId
      }
    }
  }
`;

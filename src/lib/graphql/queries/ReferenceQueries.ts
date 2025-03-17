import { gql } from '@apollo/client';

export const GET_REFERENCES = gql`
  query GetReferences {
    references(first: 200) {
      nodes {
      date
        uri
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
        singleReferences {
          expertises {
            nodes {
              id
            }
          }
          gallery {
            description
            image {
              node {
                sourceUrl
              }
            }
            video {
              node {
                sourceUrl
              }
            }
          }
          linkCompanyWebsite
        }
        content
      }
    }
  }
`;

export const GET_REFERENCE_BY_SLUG = gql`
  query GetReferenceBySlug($id: ID!) {
    reference(id: $id, idType: SLUG) {
    date
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
      singleReferences {
        companyName
        linkCompanyWebsite
        gallery {
          description
          image {
            node {
              sourceUrl
            }
          }
          video {
            node {
              sourceUrl
            }
          }
        }
        expertises {
          nodes {
            id
          }
        }
      }
    }
  }
`;

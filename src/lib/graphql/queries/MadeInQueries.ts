import { gql } from '@apollo/client';

export const GET_ALL_MADE_IN = gql`
  query GetAllMadeIn {
    allMadeInEM {
      nodes {
        title
        slug
        madeInEmFields {
          services {
            service
          }
          subtitle
        }
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        id
      }
    }
  }
`;

export const GET_MADE_IN_BY_SLUG = gql`
  query GetMadeInBySlug($slug: String!) {
    madeInEMBy(slug: $slug) {
      title
      slug
      madeInEmFields {
        services {
          service
        }
        subtitle
      }
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      id
    }
  }
`;
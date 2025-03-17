import { gql } from '@apollo/client';

export const GET_PAGE_BY_TITLE = gql`
  query GetPageByTitle($title: String!) {
    pages(where: { title: $title }) {
      nodes {
        content
        title
      }
    }
  }
`;
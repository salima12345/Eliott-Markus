import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        id
        name
        wilo {
          nodes {
            id
          }
        }
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles  {
    allWilo (first:200) {
      nodes {
       content
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        singleBlog {
          resume
          auteur
          dateDePublication
          articlesSemilaires {
          nodes {
            id
          }
        }
        }
        categories {
          nodes {
            name
            id
          }
        }
      }
    }
  }
`;
export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug {
    allWilo {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        singleBlog {
          resume
          auteur
          dateDePublication
          articlesSemilaires {
          nodes {
            id
          }
        }
        }
        content
        categories {
          nodes {
            name
            id
          }
        }
      }
    }
  }
`;
export const GET_ARTICLES_BY_IDS = gql`
  query GetArticlesByIds($ids: [ID!]!) {
    allWilo(where: { in: $ids }, first: 200) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        singleBlog {
          resume
          auteur
          dateDePublication
        }
        content
        categories {
          nodes {
            name
            id
          }
        }
      }
    }
  }
`;
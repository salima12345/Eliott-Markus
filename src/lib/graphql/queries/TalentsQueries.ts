import { gql } from '@apollo/client';

export const GET_TALENTS = gql`
  query GetTalents {
    talents(first: 200) {
      nodes {
        id
        talentId
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        singleTalent {
          hasBio
          linkedin
          mail
          quote
          twitter
          status
        }
      }
    }
  }
`;

export const GET_TALENTS_BY_IDS = gql`
  query GetTalentsByIds($ids: [ID!]) {
      talents(where: { in: $ids }, first: 200)  {
      nodes {
        id
        talentId
        slug
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        singleTalent {
          hasBio
          linkedin
          mail
          quote
          twitter
          status
        }
      }
    }
  }
`;
export const GET_TALENTS_PAGE = gql`
  query GetTalentsPage {
    pages {
      nodes {
        template {
          ... on Template_Talents {
            templateName
            talentsPage {
              description
              jobsEm {
                city
                date
                title
                type
              }
              subtitle
              subtitleEmJobs
              title
              titleEmJobs
            }
          }
        }
      }
    }
  }
`;
export const GET_TALENT_BY_SLUG = gql`
  query GetTalentBySlug($slug: String!) {
    talents(where: { name: $slug }) {
      nodes {
        id
        talentId
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        singleTalent {
          hasBio
          linkedin
          mail
          quote
          twitter
          status
        }
      }
    }
  }
`;
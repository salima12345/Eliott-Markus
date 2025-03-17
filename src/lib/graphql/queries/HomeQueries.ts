import { gql } from '@apollo/client';

export const HOME_PAGE_QUERY = gql`
  query HomePageQuery {
    pages {
      nodes {
        template {
          ... on Template_Home {
            templateName
            home {
              descriptionAbout
              descriptionHero
              titleEmValues
              titleHero
              titleRealisations
              emValueImage {
                node {
                  sourceUrl
                }
              }
              motsCles {
                title
              }
            }
          }
        }
      }
    }
    options {
      ecosystem {
        consultantsEtExperts
        continents
        references
      }
         footer {
      desks {
        adresse
        gglMap
        mail
        tel
        title
      }
      facebook
      instagram
      linkedin
      twitter
    }
    }
  }
`;
import React from 'react';
import { GET_PAGE_BY_TITLE } from '@/lib/graphql/queries/PagesQueries';
import client from '@/lib/apollo-client';
import PageClient from '@/components/PageClient';
export default async function ConditionsGenerales() {
  const { data } = await client.query({
    query: GET_PAGE_BY_TITLE,
    variables: { title: 'Conditions générales' },
  });

  const page = data?.pages?.nodes?.[0];

  if (!page) {
    return <p>Page not found</p>;
  }

  return (
    <PageClient
      title={page.title}
      content={page.content}
    />
  );
}
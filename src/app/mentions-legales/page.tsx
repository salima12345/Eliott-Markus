import React from 'react';
import { GET_PAGE_BY_TITLE } from '@/lib/graphql/queries/PagesQueries';
import client from '@/lib/apollo-client';
import PageClient from '@/components/PageClient';
import Header from '@/components/layout/header';

export default async function MentionsLegales() {
  const { data } = await client.query({
    query: GET_PAGE_BY_TITLE,
    variables: { title: 'Mentions légales' },
  });

  const page = data?.pages?.nodes?.[0];

  if (!page) {
    return <p>Page not found</p>;
  }

  return (
    <>
    <Header/>
    <PageClient
      title={page.title}
      content={page.content}
    />
    </>
  );
}
'use client';

import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/layout/footer/Accordian';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';

interface AddressItem {
  text: string;
}

interface AddressSection {
  title: string;
  items: AddressItem[];
}

interface Desk {
  title: string;
  adresse: string;
  tel: string;
  mail: string;
}

const renderAddressItem = (item: AddressItem, index: number) => (
  <div
    key={index}
    className="group relative flex items-center cursor-pointer transition-colors duration-500"
  >
    <p>{item.text}</p>
  </div>
);

export default function Address() {
  const { data, loading, error } = useQuery(HOME_PAGE_QUERY);

  const desks: Desk[] = data?.options?.footer?.desks || [];

  const addressSections: AddressSection[] = desks.map((desk: Desk) => ({
    title: desk.title,
    items: [
      { text: desk.adresse },
      { text: desk.tel },
      { text: desk.mail },
    ],
  }));

  if (loading) return <p></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Accordion className="w-full" defaultExpandedItem={addressSections[0]?.title}>
      {addressSections.map((section) => (
        <AccordionItem key={section.title} value={section.title}>
          <AccordionTrigger>
            {section.title}
          </AccordionTrigger>
          <AccordionContent isExpanded={section.title === addressSections[0]?.title}>
            <div className="flex flex-col space-y-1">
              {section.items.map((item, itemIndex) =>
                renderAddressItem(item, itemIndex)
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
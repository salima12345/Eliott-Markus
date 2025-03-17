'use client';

import Link from 'next/link';
import Address from './Address';
import Newsletter from './Newsletter';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';

export default function Info() {
  // Récupérer les données de la query HOME_PAGE_QUERY
  const { data, loading, error } = useQuery(HOME_PAGE_QUERY);

  // Extraire les données du footer
  const footerData = data?.options?.footer || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-8 border-t border-[#454545]">
      <div className="flex flex-col lg:flex-row lg:flex-wrap items-start justify-between gap-8">
        <div className="flex flex-col gap-2 w-full lg:w-auto">
          <Link href="/" className="font-semibold">
            Agence
          </Link>
          <Link href="/References" className="font-semibold">
          Références <span className="text-[#E0643A] text-[20px]">*</span>
          </Link>
          <Link href="/Team" className="font-semibold">
          Équipe

          </Link>
          <Link href="/Wilo" className="font-semibold">
            Wilo Insights
          </Link>
        </div>
        <div className="flex-shrink-0 w-full lg:w-auto">
          <Address />
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-auto">
          <p className="font-semibold">Suivez-nous</p>
          <div className="flex items-center">
            <div className="flex flex-col gap-2 pr-16">
              <Link href={footerData.linkedin || '/'} rel="preload">LinkedIn</Link>
              <Link href={footerData.twitter || '/'} rel="preload">Twitter</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={footerData.facebook || '/'}>Facebook</Link>
              <Link href={footerData.instagram || '/'}>Instagram</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-auto">
          <p className="font-semibold">Newsletter</p>
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
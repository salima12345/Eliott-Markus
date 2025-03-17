"use client";

import React, { useState, useEffect,useRef } from 'react';
import { useQuery } from '@apollo/client';
import CaseStudy from '@/components/CaseStudy';
import Footer from '@/components/layout/footer';
import { GET_EXPERTISES } from '@/lib/graphql/queries/ExpertiseQuery';
import { GET_REFERENCES } from '@/lib/graphql/queries/ReferenceQueries';

type FeaturedImage = {
  node: {
    sourceUrl: string;
  };
};

type ExpertiseNode = {
  id: string;
  title: string;
  expertiseId: string;
};

type ReferenceNode = {
  uri: string;
  title: string;
  slug: string;
  featuredImage?: FeaturedImage;
  content?: string;
  singleReferences: {
    expertises: {
      nodes: ExpertiseNode[];
    };
    gallery: {
      description: string;
      image: {
        node: {
          sourceUrl: string;
        };
      };
      video: {
        node: {
          sourceUrl: string;
        };
      };
    }[];
    linkCompanyWebsite: string;
  };
};

type Expertise = {
  id: string;
  title: string;
  expertiseId: string;
  slug: string;
  uri: string;
  content: string;
  featuredImage?: FeaturedImage;
};

type GetReferencesQueryResponse = {
  references: {
    nodes: ReferenceNode[];
  };
};

type GetExpertisesQueryResponse = {
  expertises: {
    nodes: Expertise[];
  };
};

type ColorMap = {
  [key: string]: { class: string; label: string };
};

const COLOR_MAP: ColorMap = {
  '67': { class: 'bg-[#274424] text-white', label: 'Strategy' },
  '75': { class: 'bg-[#f2bd41] text-[#e0643a]', label: 'Media' },
  '74': { class: 'bg-[#ecc6c7] text-[#1d4520]', label: 'Design' },
  '77': { class: 'bg-[#2c5dcd] text-[#a6d4f9]', label: 'Tech/Web' },
  '73': { class: 'bg-[#e0643a] text-white', label: 'Edition/Content' },
  '76': { class: 'bg-[#afd3f5] text-[#125ed4]', label: 'Social Media/SEO' },
  '78': { class: 'bg-[#f1efe6] text-black', label: 'Outsourcing' },
};

const DEFAULT_COLOR = 'bg-[#6B7280] text-white'; 

function References() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  // Fetch data from WordPress using GraphQL queries
  const { data: referencesData, loading: referencesLoading } = useQuery<GetReferencesQueryResponse>(GET_REFERENCES);
  const { data: expertisesData, loading: expertisesLoading } = useQuery<GetExpertisesQueryResponse>(GET_EXPERTISES);

  const references = referencesData?.references?.nodes || [];
  const expertises = expertisesData?.expertises?.nodes || [];

  // Debug expertiseId values
  console.log(expertises.map((e) => ({ id: e.expertiseId, title: e.title })));

  // Dynamically generate categories from expertises
  const CATEGORIES = [
    { id: 'all', label: 'All', color: 'bg-white text-black' },
    ...expertises
      .map((expertise) => ({
        id: expertise.id,
        label: expertise.title,
        color: COLOR_MAP[expertise.expertiseId]?.class || DEFAULT_COLOR,
      }))
      .reverse(), 
  ];
  

  // Handle scroll to hide/show header
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update header visibility
      setHeaderHidden(currentScrollY > lastScrollY.current && currentScrollY > 150);
      
      // Update ref (no state change = no re-render)
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  // Filter studies based on search term and selected category
  const filteredStudies = references.filter((study) => {
    const expertiseIds = study.singleReferences?.expertises?.nodes?.map((e) => e.id) || [];
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (study.content && study.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || expertiseIds.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Loading state
  if (referencesLoading || expertisesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 "></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen container relative px-10 ">
        {/* Header with search and categories */}
        <div
  className={`hidden xl:flex items-center gap-4 mt-[30px] mb-[65px] bg-[#222222] rounded-[30px] px-[11px] h-[65px] transition-opacity duration-300  ${
    headerHidden ? 'sticky top-[30px] z-50' : 'sticky top-[110px] z-40'
  }`}
>
          {/* Search Input */}
          <div className="flex items-center justify-between bg-[#313131] h-[46px] w-[335px] rounded-[27px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-medium text-[14px] text-white placeholder-white pl-[18px]"
            />
            <div className="w-[35px] h-[35px] flex items-center justify-center bg-[#222222] rounded-full mr-[6px]">
              <svg
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1">
            <ul className="flex items-center gap-[15px]">
              {CATEGORIES.map((category) => (
                <li
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`font-medium text-[14px] px-[15px] rounded-[27px] cursor-pointer transition-all duration-500 flex items-center justify-center ${
                    selectedCategory === category.id
                      ? 'h-[52px] rounded-[9px] transform scale-105'
                      : 'h-[40px]'
                  } ${category.color}`}
                >
                  {category.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Case Studies Grid */}
        {filteredStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 relative z-[10]">
            {filteredStudies.map((study) => (
              <CaseStudy
                key={study.slug}
                imageUrl={study.featuredImage?.node?.sourceUrl || ''}
                title={study.title}
                description={study.content ? study.content.substring(0, 150) + '...' : ''}
                expertise={
                  study.singleReferences?.expertises?.nodes?.map((e) => ({
                    id: e.id,
                    name: expertises.find((exp) => exp.id === e.id)?.title || 'Uncategorized',
                  })) || []
                }
                slug={study.slug}
              />
            ))}
          </div>
        ) : (
          // Empty state only shown after data is loaded and no results are found
          !referencesLoading &&
          !expertisesLoading && (
            <div className="flex flex-col items-center justify-center py-32 px-4">
              <div className="bg-[#222222] rounded-full p-6 mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="21" y1="11" x2="13" y2="11" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground text-center max-w-[500px] mb-8">
                {searchTerm
                  ? `We couldn't find any results for "${searchTerm}"`
                  : `No projects found in the ${
                      selectedCategory === 'all' ? 'selected category' : CATEGORIES.find((c) => c.id === selectedCategory)?.label
                    }`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-[#222222] text-white rounded-full hover:bg-[#333333] transition-colors"
              >
                Clear filters
              </button>
            </div>
          )
        )}
      </div>
      <Footer />
    </>
  );
}

export default References;
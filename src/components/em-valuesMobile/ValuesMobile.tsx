'use client';

import React from 'react';
import AnimatedTitle from '../ui/TitleReveal';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';

const ValuesMobile = () => {
  // Récupérer les données de la requête GraphQL
  const { data, loading, error } = useQuery(HOME_PAGE_QUERY);

  // Extraire titleEmValues
  const titleEmValues = data?.pages?.nodes[0]?.template?.home?.titleEmValues || "";

  const images = [
    {
      id: "inclusion",
      src: "https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-values/inclusion-min.png",
      alt: "Inclusion",
      rotate: "-3deg"
    },
    {
      id: "values",
      src: "https://www.eliott-markus.com/wp-content/uploads/2023/05/marie.png",
      alt: "Values",
      rotate: "-1deg",
      isValueCard: true
    },
    {
      id: "intelligence",
      src: "https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-values/intelligence.png",
      alt: "Intelligence",
      rotate: "2deg"
    },
    {
      id: "creativite",
      src: "https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-values/creativite-min.png",
      alt: "Créativité",
      rotate: "-2deg"
    },
    {
      id: "authenticite",
      src: "https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-values/authenticite.png",
      alt: "Authenticité",
      rotate: "3deg"
    },
  ];

  // Gestion du chargement et des erreurs
  if (loading) return <div className="h-[500px] flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="h-[500px] flex items-center justify-center text-red-500">Erreur : {error.message}</div>;

  return (
    <section className="container mt-10 py-8 flex flex-col items-center">
      <div className="mb-8 text-center px-6">
        <AnimatedTitle 
          text={titleEmValues} 
          className="font-bold text-[30px] leading-tight"
        />
      </div>
      
      <div className="w-full overflow-x-auto scrollbar-hide pt-3">
        <div className="flex gap-4 px-4 pb-4" style={{ width: "max-content" }}>
          {images.map((image) => (
            <div
              key={image.id}
              className="relative flex-shrink-0"
              style={{
                transform: `rotate(${image.rotate})`,
                transition: 'transform 0.3s ease'
              }}
            >
              {image.isValueCard ? (
                <div className="w-[266px] h-[266px] rounded-[54px] overflow-hidden relative">
                  <Image
                    width={266}
                    height={266}
                    src={image.src}
                    alt={image.alt}
                    priority={true} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-white font-bold text-lg mb-2">
                      The people behind the values
                    </h2>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12.943 12.943"
                      >
                        <g transform="translate(278.711 -2126.905)">
                          <path
                            d="M10.5,20.615,20.615,10.5"
                            transform="translate(-287.796 2117.82)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            d="M10.5,10.5H20.615V20.615"
                            transform="translate(-287.796 2117.82)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <Image
                  width={306}
                  height={306}
                  src={image.src}
                  alt={image.alt}
                  priority={true} 
                  className="w-[306px] h-[306px] object-contain hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesMobile;
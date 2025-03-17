import React from 'react';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import { extractExcerpt } from '@/utils/extractExcerpt'; 

const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const hashSlug = (slug: string) => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash);
};

interface ArticleProps {
  title: string;
  slug: string;
  imageUrl?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  singleBlog: {
    resume: string;
    auteur: string;
    dateDePublication: string;
  };
  content: string; 
  categories: {
    nodes: {
      name: string;
    }[];
  };
  className?: string;
}

const Article = ({
  title,
  slug,
  featuredImage,
  singleBlog,
  content,
  categories,
  className,
}: ArticleProps) => {
  const truncatedTitle = title.length > 60 
    ? `${title.slice(0, 57)}...` 
    : title;

  // Générer un nombre aléatoire basé sur le slug
  const fallbackImageNumber = (hashSlug(slug) % 23) + 1;
  const fallbackImageUrl = `/images/wilo/wilo-${fallbackImageNumber}.png`;
  const imageUrl = featuredImage?.node?.sourceUrl || fallbackImageUrl;

  // Extraire un résumé du contenu
  const excerpt = extractExcerpt(content);

  return (
    <article className={cn("border-t border-t-[#d5d4ce] max-w-[600px] overflow-hidden cursor-pointer", className)}>
      <div className="pt-6">
        <div className="flex items-center justify-between text-sm mb-4">
          <time className="text-[14px] font-medium">
            {formatDate(new Date(singleBlog.dateDePublication))}
          </time>
          {categories.nodes.length > 0 && (
            <span className="px-3 py-1 bg-[#e6e5df] rounded-full text-[14px] font-medium">
              {categories.nodes[0].name}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-semibold mb-4 min-h-[4.5rem]">
          {truncatedTitle}
        </h2>
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <p className="text-[#646464] line-clamp-3 leading-[26px] text-[16px]">
          {excerpt} 
        </p>
      </div>
    </article>
  );
};

export default Article;
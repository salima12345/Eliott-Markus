"use client";
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/Button";
import AnimatedTitle from "@/components/ui/TitleReveal";
import { formatDate } from "@/utils/date";
import Article from "@/components/Article";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Share from "@/components/Share";
import parse from 'html-react-parser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';

const hashSlug = (slug: string) => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash);
};

interface Article {
  slug: string;
  title: string;
  author: string;
  publishDate: string;
  imageUrl?: string;
  content: { title?: string; body: string }[];
  category: string;
  nextSlug?: string;
  previousSlug?: string;
}

interface ArticleNode {
  id: string;
  title: string;
  slug: string;
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
      id: string;
    }[];
  };
}

interface ArticlePageClientProps {
  article: Article;
  relatedArticles: ArticleNode[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ArticlePageClient: React.FC<ArticlePageClientProps> = ({ article, relatedArticles }) => {
  const fallbackImageNumber = (hashSlug(article.slug) % 23) + 1;
  const fallbackImageUrl = `/images/wilo/wilo-${fallbackImageNumber}.png`;
  const imageUrl = article.imageUrl || fallbackImageUrl;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.5 });
  const router = useRouter();

  // Handle next article navigation
  const handleNext = () => {
    if (article.nextSlug) {
      router.push(`/Wilo/${article.nextSlug}`);
    }
  };

  // Handle previous article navigation
  const handlePrevious = () => {
    if (article.previousSlug) {
      router.push(`/Wilo/${article.previousSlug}`);
    }
  };

  // Handle back to Wilo page navigation
  const handleBack = () => {
    router.push('/Wilo');
  };

  // Parse HTML content
  const parsedContent = React.useMemo(() => {
    return parse(article.content.map(section => section.body).join(''), {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'p') {
          const childrenAsString = domNode.children
            .map((child) => (child as unknown as Text).data || '')
            .join('');

          return (
            <div className="mb-4">
              {parse(childrenAsString)}
            </div>
          );
        }
        return domNode;
      }
    });
  }, [article.content]);

  return (
    <>
    <Header/>
      <div className="container mt-16 mx-auto flex flex-col xl:flex-row gap-8 xl:gap-24">
        <motion.div 
          className="max-h-[80px]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Button
            Icon={ArrowLeft}
            darkIconColor="#ffffff"
            altText="Back"
            isFixedSize={false}
            text="Back"
            onClick={handleBack} // Add onClick handler for back navigation
          />
        </motion.div>
        
        <div className="flex-1">
          <motion.div 
            className="flex flex-col gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="flex gap-4 justify-end mb-6"
              variants={fadeUp}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 py-4 rounded-full flex items-center justify-center bg-[#E6E5DF] hover:bg-[#D1D0CB] transition-all duration-300"
                onClick={handlePrevious}
              >
                <ArrowLeft className="w-5 h-5 group-hover:text-black transition-colors duration-300 text-[#646464]" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 py-4 rounded-full flex items-center justify-center bg-[#E6E5DF] hover:bg-[#D1D0CB] transition-all duration-300"
                onClick={handleNext}
              >
                <ArrowRight className="w-5 h-5 group-hover:text-black transition-colors duration-300 text-[#646464]" />
              </motion.button>
            </motion.div>

            <div className="xl:mr-[170px]">
              <AnimatedTitle 
                text={formatDate(new Date(article.publishDate))} 
                className="font-medium text-sm text-neutral-800"
              />
              
              <AnimatedTitle 
                text={article.author}
                className="font-semibold text-lg mt-5"
              />
    
              <h1 ref={titleRef} className="font-semibold text-2xl md:text-4xl mt-2 whitespace-normal break-words word-break-keep-all overflow-hidden">
                <motion.small
                  className="inline-block"
                  initial={{ transform: 'translateY(100%)' }}
                  animate={isInView ? { transform: 'translateY(0%)' } : { transform: 'translateY(100%)' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.33, 1, 0.68, 1], 
                  }}
                >
                  {article.title}
                </motion.small>
              </h1>

              <motion.div
                variants={scaleIn}
                className="mt-6  h-[126pd]"
              >
                <Image 
                  src={imageUrl} 
                  alt="article image"
                  width={792} 
                  height={162} 
                  style={{
                    width: '100%',
                    height: '162px',
                  }}
                  className="rounded-lg w-full h-auto md:h-[162px] object-cover"
                />
              </motion.div>

              <motion.div 
                variants={fadeUp}
                className="mt-8"
              >
                {article.content.map((section, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col gap-4"
                    variants={fadeUp}
                  >
                    {section.title && (
                      <h2 className="text-xl md:text-2xl font-bold pb-4">{section.title}</h2>
                    )}
                    <div className="text-base md:text-lg leading-relaxed font-medium text-neutral-800 mb-6">
                      {parsedContent}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <Share url={window.location.href} />

            {relatedArticles.length > 0 && (
              <motion.div 
                variants={fadeUp}
                className="mt-[75px]"
              >
                <h2 className="text-2xl md:text-[34px] font-semibold text-[#222] mb-8">More articles</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-[115px]">
                  {relatedArticles.map((relatedArticle: ArticleNode) => (
                    <Link key={relatedArticle.slug} href={`/Wilo/${relatedArticle.slug}`}>
                      <Article {...relatedArticle} />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePageClient;
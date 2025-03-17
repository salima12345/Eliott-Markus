"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Article from "@/components/Article";
import Footer from "@/components/layout/footer";
import { useQuery } from '@apollo/client';
import {  GET_ARTICLES } from '@/lib/graphql/queries/WilloQueries';
import { GET_CATEGORIES } from "@/lib/graphql/queries/WilloQueries";

interface Category {
  id: string;
  name: string;
  wilo: {
    nodes: {
      id: string;
    }[];
  };
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
const ArticleGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const { data: articlesData, loading: articlesLoading, error: articlesError } = useQuery<{ allWilo: { nodes: ArticleNode[] } }>(GET_ARTICLES);
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery<{ categories: { nodes: Category[] } }>(GET_CATEGORIES);

  if (articlesLoading || categoriesLoading) 
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#222]"></div>
      </div>
    );
  
  if (articlesError) return <p>Error: {articlesError.message}</p>;
  if (categoriesError) return <p>Error: {categoriesError.message}</p>;

  const articles = articlesData?.allWilo?.nodes || [];
  const categories = categoriesData?.categories?.nodes || [];

  // Sort articles by date (most recent first)
const sortedArticles = [...articles].sort((a, b) => {
  const dateA = new Date(a.singleBlog.dateDePublication).getTime();
  const dateB = new Date(b.singleBlog.dateDePublication).getTime();
  return dateB - dateA;
});

  const filteredArticles =
    activeCategory === "ALL"
      ? sortedArticles
      : sortedArticles.filter((article) =>
          article.categories.nodes.some((cat) => cat.name === activeCategory)
        );

  return (
    <>
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row gap-24">
          {/* Category Filters */}
          <div className="w-auto md:sticky md:top-28 self-start">
            <ul className="flex flex-row md:flex-col flex-wrap gap-3">
              <motion.li
                key="ALL"
                onClick={() => setActiveCategory("ALL")}
                className={`inline-block px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 h-10 text-center ${
                  activeCategory === "ALL"
                    ? "bg-[#222222] text-[#E6E5DF]"
                    : "bg-[#E6E5DF] hover:bg-[#E6E5DF]/80"
                }`}
                style={{
                  width: `max(${"ALL".length * 10}px, ${
                    "ALL".length * 8
                  }px + 32px)`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ALL
              </motion.li>
              {categories.map((category) => (
                <motion.li
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`inline-block px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 h-10 text-center ${
                    activeCategory === category.name
                      ? "bg-[#222222] text-[#E6E5DF]"
                      : "bg-[#E6E5DF] hover:bg-[#E6E5DF]/80"
                  }`}
                  style={{
                    width: `max(${category.name.length * 10}px, ${
                      category.name.length * 8
                    }px + 32px)`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.name}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Article Grid */}
          <div className="flex-grow">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {filteredArticles.map((article) => (
                  <Link rel="preload" key={article.slug} href={`/Wilo/${article.slug}`}>
                    <Article {...article} />
                  </Link>
                ))}
              </div>
            ) : (
              // Empty State
              <motion.div
                className="flex flex-col items-center justify-center h-[60vh] text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  No Articles Found
                </div>
                <p className="text-lg sm:text-xl text-gray-600 mb-8">
                  It looks like there are no articles in the{" "}
                  <span className="font-semibold text-[#222222]">
                    {activeCategory}
                  </span>{" "}
                  category. Try another category!
                </p>
                <motion.button
                  className="px-6 py-3 bg-[#222222] text-[#E6E5DF] rounded-full font-medium text-sm hover:bg-[#222222]/90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory("ALL")}
                >
                  View All Articles
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticleGrid;
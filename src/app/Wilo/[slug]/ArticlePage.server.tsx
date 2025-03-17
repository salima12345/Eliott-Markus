import ArticlePageClient from './ArticlePageClient';
import { GET_ARTICLE_BY_SLUG, GET_ARTICLES_BY_IDS, GET_ARTICLES } from '@/lib/graphql/queries/WilloQueries';
import client from '@/lib/apollo-client';

// Define the type for an article
interface Article {
  id: string;
  slug: string;
  title: string;
  singleBlog: {
    auteur: string;
    resume: string;
    dateDePublication: string;
    articlesSemilaires: {
      nodes: Array<{ id: string }>;
    };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  content: string;
  categories: {
    nodes: Array<{ name: string; id: string }>;
  };
}

// Define the type for the params
interface PageProps {
  params: Promise<{ slug: string }>;
}

const hashSlug = (slug: string) => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export default async function ArticlePageServer({ params }: PageProps) {
  const { slug } = await params;

  // Fetch all articles to get the list of slugs
  const { data: allArticlesData } = await client.query({
    query: GET_ARTICLES,
  });

  const allArticles: Article[] = allArticlesData?.allWilo?.nodes || [];
  const allSlugs = allArticles.map((article: Article) => article.slug);

  // Find the current index
  const currentIndex = allSlugs.indexOf(slug);

  // Determine next and previous slugs with cyclic behavior
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : allSlugs[0];
  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : allSlugs[allSlugs.length - 1];

  // Fetch the current article data
  const { data } = await client.query({
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug },
  });

  const article: Article = data.allWilo.nodes[0];

  if (!article) {
    return <div>Article not found</div>;
  }

  // Fetch related articles
  const relatedArticleIds = article.singleBlog.articlesSemilaires.nodes.map((node: { id: string }) => node.id);
  const { data: relatedArticlesData } = await client.query({
    query: GET_ARTICLES_BY_IDS,
    variables: { ids: relatedArticleIds },
  });

  const relatedArticles: Article[] = relatedArticlesData?.allWilo?.nodes || [];

  // Generate fallback image URL
  const fallbackImageNumber = (hashSlug(slug) % 23) + 1;
  const fallbackImageUrl = `/images/wilo/wilo-${fallbackImageNumber}.png`;

  // Format the article data
  const formattedArticle = {
    slug: article.slug,
    title: article.title,
    author: article.singleBlog.auteur,
    publishDate: article.singleBlog.dateDePublication,
    imageUrl: article.featuredImage?.node?.sourceUrl || fallbackImageUrl,
    content: article.content ? [{ body: article.content }] : [],
    category: article.categories.nodes[0]?.name || 'Uncategorized',
    nextSlug,
    previousSlug,
  };

  // Pass data to the client component
  return <ArticlePageClient article={formattedArticle} relatedArticles={relatedArticles} />;
}
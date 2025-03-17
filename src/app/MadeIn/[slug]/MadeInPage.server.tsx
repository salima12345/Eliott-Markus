import client from '@/lib/apollo-client';
import { GET_MADE_IN_BY_SLUG, GET_ALL_MADE_IN } from '@/lib/graphql/queries/MadeInQueries';
import MadeInPageClient from './MadeInPageClient';

interface Service {
  service: string;
}

interface MadeInFields {
  subtitle?: string;
  services?: Service[];
}

interface MadeInPost {
  title: string;
  slug: string;
  madeInEmFields?: MadeInFields;
  content?: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;

}

export async function generateStaticParams() {
  const { data } = await client.query({ query: GET_ALL_MADE_IN });
  return data.allMadeInEM.nodes.map((post: MadeInPost) => ({
    slug: post.slug,
  }));
}

export default async function MadeInPageServer({ params }: PageProps) {
  const { slug } = await params;

  try {
    // Fetch all MadeIn posts to get the list of slugs
    const { data: allMadeInData } = await client.query({
      query: GET_ALL_MADE_IN,
    });

    if (!allMadeInData?.allMadeInEM?.nodes?.length) {
      throw new Error('No MadeIn posts found');
    }

    const allMadeInPosts = allMadeInData.allMadeInEM.nodes;
    const allSlugs = allMadeInPosts.map((post: MadeInPost) => post.slug);

    // Find the current index
    const currentIndex = allSlugs.indexOf(slug);
    if (currentIndex === -1) {
      throw new Error(`MadeIn post with slug "${slug}" not found`);
    }

    // Determine next and previous slugs with cyclic behavior
    const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : allSlugs[0];
    const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : allSlugs[allSlugs.length - 1];

    // Fetch the current MadeIn post data
    const { data } = await client.query({
      query: GET_MADE_IN_BY_SLUG,
      variables: { slug },
    });

    const wpData = data.madeInEMBy as MadeInPost | undefined;

    if (!wpData) {
      return <p>Page not found</p>;
    }

    const pageContent = {
      subtitle: wpData.madeInEmFields?.subtitle || '',
      title: wpData.title,
      imageSrc: wpData.featuredImage?.node?.sourceUrl || '/images/default-madein.jpg',
      imageAlt: wpData.title,
      description: wpData.content ? [wpData.content] : [''],
      services: wpData.madeInEmFields?.services?.map((s: Service) => ({ title: s.service })) || [],
      nextSlug,
      previousSlug,
    };

    return <MadeInPageClient content={pageContent} />;
  } catch (error) {
    console.error('Error fetching MadeIn content:', error);
    return <p>Error loading page</p>;
  }
}
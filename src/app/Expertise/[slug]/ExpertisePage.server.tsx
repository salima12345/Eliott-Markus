import { GET_EXPERTISE_BY_SLUG, GET_ALL_EXPERTISE_SLUGS } from '@/lib/graphql/queries/ExpertiseQuery';
import { GET_TALENTS_BY_IDS } from '@/lib/graphql/queries/TalentsQueries';
import client from '@/lib/apollo-client';
import { PAGE_CONTENT } from '@/Data/expertiseData';
import { CASE_STUDIES } from '@/Data/CaseStudiesData';
import ExpertisePageClient from './ExpertisePageClient';

interface Talent {
  id: string;
  title: string;
  singleTalent?: {
    status?: string;
    hasBio?: boolean;
    linkedin?: string;
    mail?: string;
    quote?: string;
  };
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  slug: string;
}

interface Service {
  service: string;
}

interface SingleExpertises {
  team?: {
    nodes?: { id: string }[];
  };
  services?: Service[];
  subtitle?: string;
}

interface Expertise {
  expertiseId: number;
  title: string;
  singleExpertises?: SingleExpertises;
  content?: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
}

const EXPERTISE_COLOR_SCHEMES: { [key: number]: { heroTextColor: string; servicesBgColor: string; servicesTextColor: string } } = {
  67: { heroTextColor: '#1D4520', servicesBgColor: '#1D4520', servicesTextColor: '#FFFFFF' },
  74: { heroTextColor: '#1D4520', servicesBgColor: '#ECC6C7', servicesTextColor: '#1D4520' },
  75: { heroTextColor: '#E0643A', servicesBgColor: '#F2BD41', servicesTextColor: '#1D4520' },
  76: { heroTextColor: '#125ed4', servicesBgColor: '#A6D4F9', servicesTextColor: '#125ed4' },
  77: { heroTextColor: '#125ed4', servicesBgColor: '#125ed4', servicesTextColor: '#FFFFFF' },
  78: { heroTextColor: '#125ed4', servicesBgColor: '#E6E5DF', servicesTextColor: '#125ed4' },
  73: { heroTextColor: '#E0643A', servicesBgColor: '#E0643A', servicesTextColor: '#FFFFFF' }
};

const DEFAULT_COLOR_SCHEME = {
  heroTextColor: '#000000',
  servicesBgColor: '#E6E5DF',
  servicesTextColor: '#125ed4'
};

const getColorScheme = (expertiseId: number) => {
  return EXPERTISE_COLOR_SCHEMES[expertiseId] || DEFAULT_COLOR_SCHEME;
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExpertisePageServer({ params }: PageProps) {
  const { slug } = await params;

  try {
    // Fetch all expertise slugs
    const { data: allExpertiseData } = await client.query({
      query: GET_ALL_EXPERTISE_SLUGS,
    });

    const allExpertiseSlugs = allExpertiseData?.expertises?.nodes?.map((node: { slug: string }) => node.slug) || [];

    // Find the current index
    const currentIndex = allExpertiseSlugs.indexOf(slug);

    // Determine next and previous slugs with cyclic behavior
    const nextSlug = currentIndex < allExpertiseSlugs.length - 1 ? allExpertiseSlugs[currentIndex + 1] : allExpertiseSlugs[0];
    const previousSlug = currentIndex > 0 ? allExpertiseSlugs[currentIndex - 1] : allExpertiseSlugs[allExpertiseSlugs.length - 1];

    // Fetch the current expertise data
    const { data: expertiseData } = await client.query({
      query: GET_EXPERTISE_BY_SLUG,
      variables: { slug },
    });

    const wpExpertise = expertiseData?.expertises?.nodes?.[0] as Expertise | undefined;

    let pageContent;

    if (wpExpertise) {
      const colorScheme = getColorScheme(wpExpertise.expertiseId);
      pageContent = {
        title: wpExpertise.title,
        description: wpExpertise.singleExpertises?.subtitle || '',
        servicesDescription: wpExpertise.content || '',
        services: wpExpertise.singleExpertises?.services?.map((s: Service) => s.service) || [],
        ...colorScheme,
        imageSrc: wpExpertise.featuredImage?.node?.sourceUrl || '/images/default-expertise.jpg',
        nextSlug,
        previousSlug,
      };
    } else {
      pageContent = PAGE_CONTENT[slug];
    }

    if (!pageContent) {
      return <p>Page not found</p>;
    }

    const teamIds = wpExpertise?.singleExpertises?.team?.nodes?.map((node) => node.id) || [];
    const { data: talentsData } = await client.query<{ talents: { nodes: Talent[] } }>({
      query: GET_TALENTS_BY_IDS,
      variables: { ids: teamIds },
    });

    const members = talentsData?.talents?.nodes?.map((talent) => ({
      id: talent.id,
      name: talent.title,
      jobTitle: talent.singleTalent?.status || '',
      image: talent.featuredImage?.node?.sourceUrl || '/images/default-avatar.jpg',
      slug: talent.slug,
      hasBiography: talent.singleTalent?.hasBio || false,
      email: talent.singleTalent?.mail || '',
      linkedIn: talent.singleTalent?.linkedin || '',
      quote: talent.singleTalent?.quote || '',
    })) || [];

    const caseStudiesForSlug = CASE_STUDIES.filter((study) =>
      study.expertise.some((e) => e.name === slug)
    );

    return (
      <ExpertisePageClient
        pageContent={pageContent}
        members={members}
        caseStudiesForSlug={caseStudiesForSlug}
      />
    );
  } catch (error) {
    console.error('Error fetching expertise:', error);
    return <p>Error loading page</p>;
  }
}
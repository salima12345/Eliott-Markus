import client from '@/lib/apollo-client';
import { GET_REFERENCE_BY_SLUG, GET_REFERENCES } from '@/lib/graphql/queries/ReferenceQueries';
import { GET_EXPERTISES } from '@/lib/graphql/queries/ExpertiseQuery';
import ReferencePageClient from './CaseStudyPageClient';

interface Expertise {
  id: string;
  title: string;
}

interface GalleryItem {
  description: string;
  media: string;
  type: 'image' | 'video' | 'text';
}

interface Reference {
  slug: string;
  title: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  content?: string;
  singleReferences?: {
    companyName?: string;
    expertises?: {
      nodes?: Expertise[];
    };
    linkCompanyWebsite?: string | null | undefined;
    gallery?: GalleryItem[];
  };
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ReferencePageServer({ params }: PageProps) {
  const { slug } = await  params;

  try {
    const { data: referenceData } = await client.query({
      query: GET_REFERENCE_BY_SLUG,
      variables: { id: slug }
    });

    const reference = referenceData?.reference as Reference | undefined;
    if (!reference) return <div>Reference not found</div>;

    const { data: allReferencesData } = await client.query({ query: GET_REFERENCES });
    const allReferences = allReferencesData?.references?.nodes || [];

    const { data: expertisesData } = await client.query({ query: GET_EXPERTISES });
    const expertises = expertisesData?.expertises?.nodes || [];

    interface TransformedReference {
      slug: string;
      title: string;
      imageUrl: string;
      description: string;
      companyName: string;
      categories: { id: string; name: string }[];
      linkCompanyWebsite: string | undefined;
      gallery: { description: string; media: string; type: 'image' | 'video' | 'text' }[];
    }

    interface TransformedCategory {
      id: string;
      name: string;
    }

    interface TransformedGalleryItem {
      description: string;
      media: string;
      type: 'image' | 'video' | 'text';
    }

    const transformReference = (ref: Reference): TransformedReference => ({
      slug: ref.slug,
      title: ref.title,
      imageUrl: ref.featuredImage?.node?.sourceUrl || '/default-image.jpg',
      description: ref.content || '',
      companyName: ref.singleReferences?.companyName || '',
      categories: ref.singleReferences?.expertises?.nodes?.map((e: Expertise): TransformedCategory => ({
      id: e.id,
      name: expertises.find((exp: Expertise) => exp.id === e.id)?.title || 'Uncategorized',
      })) || [],
      linkCompanyWebsite: ref.singleReferences?.linkCompanyWebsite || undefined,
      gallery: ref.singleReferences?.gallery?.map((g: GalleryItem): TransformedGalleryItem => ({
      description: g.description,
      media: g.media,
      type: g.type
      })) || []
    });

    const currentReference = transformReference(reference);
    const relatedReferences = allReferences
      .filter((r: Reference) => r.slug !== slug)
      .slice(0, 3)
      .map(transformReference);

    return (
      <ReferencePageClient
        reference={currentReference}
        relatedReferences={relatedReferences}
        expertises={expertises}
      />
    );
  } catch (error) {
    console.error('Error fetching reference:', error);
    return <div>Error loading reference</div>;
  }
}
import { GET_TALENT_BY_SLUG } from '@/lib/graphql/queries/TalentsQueries';
import client from '@/lib/apollo-client';
import BioPageClient from './BioPageClient';



interface PageProps {
params: Promise<{ slug: string }>
}

export default async function BioPageServer({ params }: PageProps) {
  const { slug } = await params;

  try {
    // Fetch talent data using the imported query
    const { data } = await client.query({
      query: GET_TALENT_BY_SLUG,
      variables: { slug },
    });

    console.log('Talent Data:', data);

    const member = data.talents.nodes[0];

    if (!member) {
      return <div>Member not found</div>;
    }

    // Transform the member data
    const transformedMember = {
      id: member.id,
      talentId: member.talentId,
      title: member.title,
      content:member.content,
      featuredImage: member.featuredImage,
      singleTalent: member.singleTalent,
      name: member.title,
      jobTitle: member.singleTalent?.status || "",
      image: member.featuredImage?.node?.sourceUrl || "/images/default-avatar.jpg",
      hasBiography: member.singleTalent?.hasBio || false,
      slug: member.slug,
      quote: member.singleTalent?.quote || "",
      linkedin: member.singleTalent?.linkedin || "",
      mail: member.singleTalent?.mail || "",
      twitter: member.singleTalent?.twitter || "",
    };

    console.log('Transformed Member:', transformedMember);

    // Pass the data to the Client Component
    return <BioPageClient member={transformedMember} />;
  } catch (error) {
    console.error('Error fetching talent:', error);
    return <div>Error loading page</div>;
  }
}
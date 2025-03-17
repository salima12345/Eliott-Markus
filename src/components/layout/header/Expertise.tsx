import React, { useState } from "react";
import ExpandableSection from "./ExpandableSection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useQuery } from '@apollo/client';
import { GET_EXPERTISES } from "@/lib/graphql/queries/ExpertiseQuery";

interface ExpertiseItem {
  icon: string;
  text: string;
  path: string;
  expertiseId: number;
}

interface ExpertiseProps {
  defaultExpanded?: boolean;
  pushContent?: boolean;
  isHeader?: boolean;
  isExpanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
  isMenuOpen?: boolean;
}

interface ExpertiseNode {
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  title: string;
  slug: string;
  expertiseId: number;
}

export default function Expertise({
  defaultExpanded = false,
  pushContent = false,
  isHeader = false,
  isExpanded,
  setExpanded,
  isMenuOpen = false,
}: ExpertiseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  const { data, loading, error } = useQuery(GET_EXPERTISES);

  const expertises: ExpertiseItem[] = data?.expertises?.nodes?.map((expertise: ExpertiseNode) => ({
    icon: expertise.featuredImage?.node?.sourceUrl || "/images/expertises/icons/default.svg",
    text: expertise.title,
    path: `/Expertise/${expertise.slug}`,
    expertiseId: expertise.expertiseId
  })) || [];

  const renderExpertiseItem = (item: ExpertiseItem, index: number, totalItems: number) => {
    const isActive = pathname === item.path;

    const handleClick = async () => {
      if (isNavigating || pathname === item.path) return;

      setIsNavigating(true);

      if (setExpanded) {
        setExpanded(false);
      }

      await new Promise(resolve => setTimeout(resolve, 150));
      router.push(item.path);

      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    };

    return (
      <div
        key={index}
        className={`
          flex items-center gap-3 cursor-pointer px-5 
          transition-all duration-200 ease-in-out
          ${isNavigating ? 'opacity-50 pointer-events-none' : 'opacity-100'}
          ${index === totalItems - 1 ? "pb-4" : ""}
        `}
        onClick={handleClick}
      >
        <div className="relative w-5 h-5">
          <Image
            src={item.icon}
            alt={item.text}
            fill
            className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <p className={`font-medium transition-colors duration-200`}>
          {item.text}
        </p>
      </div>
    );
  };

  const hasData = !loading && !error && expertises.length > 0;
  const effectiveIsExpanded = hasData ? isExpanded : false;

  return (
    <ExpandableSection<ExpertiseItem>
      title="e&m expertise"
      items={expertises}
      renderItem={renderExpertiseItem}
      testId="expertise"
      defaultExpanded={defaultExpanded}
      pushContent={pushContent}
      isHeader={isHeader}
      isExpanded={effectiveIsExpanded}
      setExpanded={setExpanded}
      isMenuOpen={isMenuOpen}
    />
  );
}
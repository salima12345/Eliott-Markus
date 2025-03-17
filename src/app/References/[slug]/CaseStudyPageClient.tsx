'use client';
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/footer";
import Share from "@/components/Share";
import parse from 'html-react-parser';

interface GalleryItem {
  description: string;
  media: string;
  type: 'image' | 'video' | 'text';
}

interface Category {
  id: string;
  name: string;
}

interface Reference {
  slug: string;
  title: string;
  imageUrl: string;
  description: string;
  companyName: string;
  categories: Category[];
  linkCompanyWebsite?: string;
  gallery: GalleryItem[];
}

interface Expertise {
  id: string;
  name: string;
}

interface ReferencePageClientProps {
  reference: Reference;
  relatedReferences: Reference[];
  expertises: Expertise[];
}

const ReferencePageClient: React.FC<ReferencePageClientProps> = ({
  reference,
  relatedReferences,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [currentUrl, setCurrentUrl] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: hoverIndex !== null ? 1 : 0,
      transition: { duration: 0.3 },
    });
  }, [hoverIndex, controls]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pb-20"
      >
        <div className="max-w-6xl mx-auto mt-6 md:mt-16 container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <ul className="flex items-center gap-2 font-medium text-sm md:text-base">
              <li>
                <Link href="/References">References</Link>
              </li>
              <li className="arrow">→</li>
              <li className="truncate">
                {reference.linkCompanyWebsite ? (
                  <a
                    href={reference.linkCompanyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {reference.companyName}
                  </a>
                ) : (
                  reference.companyName
                )}
              </li>
            </ul>
          </div>

          {/* Reference Header */}
          <div className="mt-4 md:mt-6">
            <div className="header-singleReference">
              <motion.h1
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {reference.title}
              </motion.h1>

              <div className="mt-4 md:mt-6">
                <ul className="flex flex-wrap gap-2">
                  {reference.categories.map((category, index) => (
                    <li key={index}>
                      <span
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium bg-[#E6E5DF]`}
                      >
                        {category.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Featured Image */}
            <motion.div
              className="relative mt-6 md:mt-8 h-64 sm:h-80 lg:h-[623px] rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Image
                src={reference.imageUrl}
                alt={reference.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority
              />
            </motion.div>

            {/* Description */}
            <motion.div
              className="mt-8 md:mt-12 px-0 md:px-8 prose max-w-none"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {parse(reference.description)}
            </motion.div>

            {/* Gallery */}
            <div className="gallery-singleReference mt-8 md:mt-12">
              {reference.gallery.map((item, index) => (
                <div key={index} className="gallery-item mb-12">
                  {item.description && (
                    <div className="prose max-w-none mb-6">
                      {parse(item.description)}
                    </div>
                  )}

                  {item.type === 'image' && item.media && (
                    <div className="relative w-full h-96 rounded-lg overflow-hidden">
                      <Image
                        src={item.media}
                        alt={item.description || 'Gallery image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      />
                    </div>
                  )}

                  {item.type === 'video' && item.media && (
                    <div className="video-container aspect-video rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-full object-cover"
                      >
                        <source src={item.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Share Component */}
            {currentUrl && <Share url={currentUrl} />}
          </div>
        </div>

        {/* See More Section */}
        <div className="max-w-6xl container mt-12 md:mt-20">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">See More</h2>
          <div className="flex flex-col">
            {relatedReferences.map((ref, index) => (
              <Link
                href={`/references-clients/${ref.slug}`}
                key={ref.slug}
                className={`relative py-6 md:py-10 border-b-[0.5px] ${
                  index === 0 ? "border-y-[0.5px]" : "border-b-[0.5px]"
                } border-grayDark hover:border-black cursor-pointer group`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <h4 className="text-lg sm:text-xl md:text-[21px] xl:text-[26px] text-grayDark font-semibold opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {ref.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* Hover Image Container */}
        <motion.div
          className="fixed w-[385px] h-[280px] pointer-events-none z-30 overflow-hidden hidden lg:block"
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            transform: "translate(-20%, -65%)",
          }}
          initial={{ opacity: 0 }}
          animate={controls}
        >
          {hoverIndex !== null && relatedReferences[hoverIndex]?.imageUrl && (
            <Image
              src={relatedReferences[hoverIndex].imageUrl}
              alt={relatedReferences[hoverIndex].title}
              width={385}
              height={280}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </motion.section>
      <Footer />
    </>
  );
};

export default ReferencePageClient;
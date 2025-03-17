"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedTitle from "@/components/ui/TitleReveal";
import Footer from "@/components/layout/footer";

interface Member {
  id: string;
  talentId: string;
  slug: string;
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  singleTalent: {
    hasBio: boolean;
    linkedin: string;
    mail: string;
    quote: string;
    twitter: string;
    status: string;
  };
}

interface BioPageClientProps {
  member: Member;
}

const BioPageClient: React.FC<BioPageClientProps> = ({ member }) => {
  const router = useRouter();

  const handleTalentClick = () => {
    router.push("/Team");
  };

  // Add spacing between paragraphs by inserting <br /><br /> after each </p>
  const formattedContent = member.content.replace(/<\/p>/g, "</p><br />");

  return (
    <>
      <div className="flex flex-col my-16">
        <div className="w-full max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col xl:flex-row justify-end gap-16">
            <div className="xl:sticky top-44 h-max">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 mb-10">
                <span
                  onClick={handleTalentClick}
                  className="text-[14px] font-medium cursor-pointer"
                >
                  Talent
                </span>
                <Image
                  src="/images/icons/arrowRight.svg"
                  alt="Arrow Right"
                  width={19}
                  height={19}
                  loading="lazy"
                  className="transition-all duration-300"
                  style={{
                    width: '19px',
                    height: '19px',
                  }}
                />
                <span className="text-[14px] font-medium">{member.title}</span>
              </div>

              {/* Left side content */}
              <div className="flex flex-col xl:flex-row justify-between xl:ml-16 mt-10 xl:w-[750px] ">
                <div className="flex flex-col mt-8 w-full xl:max-w-[390px] mr-5">
                  <AnimatedTitle
                    text={member.title}
                    className="font-semibold text-[28px] xl:text-[36px] leading-[38px] text-[#222] mb-3"
                  />
                  <AnimatedTitle
                    text={member.singleTalent.status}
                    className="font-semibold text-[20px] xl:text-[26px] text-[#222]"
                  />
                  <div className="flex items-center gap-5 mt-5">
                    {/* LinkedIn Icon */}
                    {member.singleTalent.linkedin && (
                      <a
                        href={member.singleTalent.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="https://www.eliott-markus.com/wp-content/themes/em-wp/images/bio-icons/linkedin.svg"
                          alt="LinkedIn"
                          width={17}
                          height={17}
                          className="transition-all duration-300"
                          style={{
                            width: '17px',
                            height: '17px',
                          }}
                          loading="lazy"
                        />
                      </a>
                    )}

                    {/* Email Icon */}
                    {member.singleTalent.mail && (
                      <a href={`mailto:${member.singleTalent.mail}`}>
                        <Image
                          src="https://www.eliott-markus.com/wp-content/themes/em-wp/images/bio-icons/mail.svg"
                          alt="Email"
                          width={17}
                          height={17}
                          className="transition-all duration-300"
                          style={{
                            width: '17px',
                            height: '17px',
                          }}
                          loading="lazy"
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Member Image */}
                <div className="mt-8 w-full xl:w-[400px] h-[513px] overflow-hidden rounded-[10px]">
                  <Image
                    src={member.featuredImage.node.sourceUrl || "/placeholder.svg"}
                    alt="member image"
                    width={348}
                    height={513}
                    className="w-full h-full object-cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right side content */}
            <div className="flex flex-col w-full xl:w-[399px] gap-5 mt-10 xl:mt-24">
              <div className="flex flex-col">
                <h3 className="font-semibold text-[20px] xl:text-[26px] leading-[38px] text-[#222]">
                  « {member.singleTalent.quote} »
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {member.content && (
                  <div
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BioPageClient;
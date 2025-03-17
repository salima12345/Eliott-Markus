"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

interface TeamMember {
  id: string;
  image?: string;
  name: string;
  jobTitle: string;
  hasBiography: boolean;
  slug: string;
}

const TeamReveal: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  const router = useRouter();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const membersWithImages = useMemo(
    () => members.filter((member) => member.image),
    [members]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (hoverIndex !== null) {
      const imageIndex = membersWithImages.findIndex(
        (member) => members.indexOf(member) === hoverIndex
      );
      if (imageIndex !== -1) {
        controls.start({
          y: -280 * imageIndex,
          transition: {
            duration: 0.2,
            ease: [0.19, 1, 0.22, 1],
          },
        });
      }
    }
  }, [hoverIndex, controls, members, membersWithImages]);

  const handleMemberClick = (member: TeamMember) => {
    if (member.hasBiography) {
      router.push(`/Bio/${member.slug}`);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="fixed w-[250px] h-[280px] pointer-events-none z-30 overflow-hidden rounded-[10px] shadow-2xl"
        style={{
          top: cursorPos.y,
          left: cursorPos.x,
          transform: "translate(-20%, -65%)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: hoverIndex !== null && members[hoverIndex]?.image ? 1 : 0,
          transition: {
            duration: 0.2,
            ease: [0.19, 1, 0.22, 1],
          },
        }}
      >
        <motion.div className="w-full flex flex-col" animate={controls}>
          {membersWithImages.map((member, index) => (
            <div key={index} className="w-full h-[280px] rounded-[10px] overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transform transition-transform duration-500 ease-out hover:scale-105 [image-rendering:crisp-edges]"
                style={{
                  backgroundImage: `url(${member.image})`,
                }}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="w-full max-w-[1200px]">
        <div className="flex flex-col border-t-[0.5px] border-border">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`relative py-7 border-b-[0.5px] border-border cursor-pointer group ${
                index === 0 ? "pt-10" : ""
              }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => handleMemberClick(member)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
                <div className="flex items-center">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-yellow-400 mr-2 opacity-0 scale-0 hidden md:block"
                    animate={{
                      opacity: hoverIndex === index ? 1 : 0,
                      scale: hoverIndex === index ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  />
                  <motion.h3
                    className="text-base sm:text-lg md:text-xl md:text-[23px] font-semibold"
                    animate={{
                      x: hoverIndex === index ? 10 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.1,
                    }}
                  >
                    {member.name}
                  </motion.h3>
                </div>
                <motion.p
                  className="text-base sm:text-lg md:text-xl md:text-[23px]"
                  animate={{
                    x: hoverIndex === index ? 10 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.1,
                  }}
                >
                  {member.jobTitle}
                </motion.p>
                {member.hasBiography && (
                  <motion.span
                    className="md:ml-4 px-3 py-1 bg-yellow-400 text-black text-sm rounded-full w-[90px]"
                    animate={{
                      x: hoverIndex === index ? 10 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.1,
                    }}
                  >
                    Biography
                  </motion.span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamReveal;
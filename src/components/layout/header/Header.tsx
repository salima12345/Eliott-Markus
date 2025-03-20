"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/lib/themes";
import LanguageSelector from "./LanguageSelectorDesktop";
import LanguageSelectorMobile from "./LanguagesSelectorMobile";
import Expertise from "./Expertise";
import MadeIn from "./MadeIn";
import EcosystemDropMenu from "./EcosystemDropMenu";
import EcosystemModal from "./EcosystemModal/EcosystemModal";
import Button from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpertiseExpanded, setIsExpertiseExpanded] = useState(false);
  const [isMadeInExpanded, setIsMadeInExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [expertiseDataLoaded, setExpertiseDataLoaded] = useState(false);
  const [madeInDataLoaded, setMadeInDataLoaded] = useState(false);

  // Précharge les routes critiques au montage
  useEffect(() => {
    router.prefetch("/Expertise/[slug]");
    router.prefetch("/MadeIn/[slug]");
  }, [router]);

  // Reset menu state when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsModalOpen(false);
    setIsExpertiseExpanded(false);
    setIsMadeInExpanded(false);
    document.body.classList.remove("menu-open");
  }, [pathname]);

  // Synchronize expansion when both datasets are loaded
  useEffect(() => {
    if (expertiseDataLoaded && madeInDataLoaded && pathname === "/" && window.scrollY === 0) {
      // Ajouter un délai de 500ms avant l'expansion
      const delay = 500; // Délai en millisecondes
      const timeoutId = setTimeout(() => {
        setIsExpertiseExpanded(true);
        setIsMadeInExpanded(true);
      }, delay);

      // Nettoyer le timeout si le composant est démonté
      return () => clearTimeout(timeoutId);
    }
  }, [expertiseDataLoaded, madeInDataLoaded, pathname]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (isMenuOpen) {
      setHeaderVisible(true);
      return;
    }

    if (currentScrollY > 150) {
      setHeaderVisible(currentScrollY < lastScrollY);
    } else {
      setHeaderVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [isMenuOpen, lastScrollY]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleBurgerClick = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    setHeaderVisible(true); // Always show header when menu is toggled
    document.body.classList.toggle("menu-open", newMenuState);

    // When opening menu, expand sections
    if (newMenuState) {
      setIsExpertiseExpanded(true);
      setIsMadeInExpanded(true);
    } else {
      // When closing, reset to previous states
      setIsExpertiseExpanded(false);
      setIsMadeInExpanded(false);
    }
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
    setIsExpertiseExpanded(false);
    setIsMadeInExpanded(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <section className="[@media(min-width:1190px)]:sticky [@media(min-width:1190px)]:top-0 z-50 container">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center 3xl:-mr-[124px]">
              {(headerVisible || isMenuOpen) && (
                <>
                  <Link href="/" className="flex-shrink-0">
                    <Image
                      src={
                        theme === "dark"
                          ? "/images/logo.svg"
                          : "/images/darkLogo.svg"
                      }
                      alt="logo"
                      width={120}
                      height={50}
                      className="w-[120px] h-[50px]"
                    />
                  </Link>
                  <div className="hidden [@media(min-width:1190px)]:flex items-center gap-5 ml-[44px] 2xl:ml-[88px]">
                    <Expertise
                      isHeader={true}
                      isExpanded={isExpertiseExpanded}
                      setExpanded={setIsExpertiseExpanded}
                      defaultExpanded={false}
                      isMenuOpen={isMenuOpen}
                      onDataLoaded={() => setExpertiseDataLoaded(true)}
                    />
                    <MadeIn
                      isHeader={true}
                      isExpanded={isMadeInExpanded}
                      setExpanded={setIsMadeInExpanded}
                      defaultExpanded={false}
                      isMenuOpen={isMenuOpen}
                      onDataLoaded={() => setMadeInDataLoaded(true)}
                    />
                    <EcosystemDropMenu
                      isOpen={isMenuOpen}
                      onClose={handleCloseMenu}
                      onOpenModal={handleOpenModal}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 absolute right-0 [@media(min-width:1190px)]:relative 3xl:-mr-[100px]">
              <div className="[@media(min-width:1190px)]:hidden">
                <LanguageSelectorMobile />
              </div>
              <div className="flex items-center flex-col items-end">
                <div className="flex items-center gap-2 [@media(min-width:1190px)]:pb-2 [@media(min-width:1190px)]:pt-4">
                  <motion.div
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      Icon={isMenuOpen ? X : Menu}
                      lightIconColor="#333333"
                      darkIconColor="#ffffff"
                      altText="Menu"
                      onClick={handleBurgerClick}
                    />
                  </motion.div>
                </div>
                <div className="hidden [@media(min-width:1190px)]:block">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="sticky inset-0 z-40 bg-background [@media(min-width:1190px)]:hidden mx-auto mt-[130px]"
          >
            <EcosystemDropMenu
              isOpen={true}
              onClose={handleCloseMenu}
              onOpenModal={handleOpenModal}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isModalOpen && <EcosystemModal onClose={handleCloseModal} />}
    </>
  );
}
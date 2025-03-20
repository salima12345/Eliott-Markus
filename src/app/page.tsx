"use client"
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';
import { GET_EXPERTISES } from '@/lib/graphql/queries/ExpertiseQuery';
import { GET_ALL_MADE_IN } from '@/lib/graphql/queries/MadeInQueries';
import { GET_REFERENCES } from '@/lib/graphql/queries/ReferenceQueries';
import Header from '@/components/layout/header';

// Lazy load components
const Hero = lazy(() => import('@/components/hero/Hero'));
const About = lazy(() => import('@/components/about/About'));
const Values = lazy(() => import('@/components/em-values/Values'));
const ValuesMobile = lazy(() => import('@/components/em-valuesMobile/ValuesMobile'));
const Realization = lazy(() => import('@/components/realization/Realization'));
const Clients = lazy(() => import('@/components/clients/Clients'));
const Footer = lazy(() => import('@/components/layout/footer'));

const CustomLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E0643A]"></div>
  </div>
);

function App() {
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  
  // Fetch all necessary global queries
  const { loading: homeLoading } = useQuery(HOME_PAGE_QUERY);
  const { loading: expertisesLoading } = useQuery(GET_EXPERTISES);
  const { loading: madeInLoading } = useQuery(GET_ALL_MADE_IN);
  const { loading: referencesLoading } = useQuery(GET_REFERENCES);

  useEffect(() => {
    if (!homeLoading && !expertisesLoading && !madeInLoading && !referencesLoading) {
      setAllDataLoaded(true);
    }
  }, [homeLoading, expertisesLoading, madeInLoading, referencesLoading]);

  if (!allDataLoaded) return <CustomLoader />;

  return (
    <Suspense fallback={<CustomLoader />}>
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}

        className="overflow-hidden">
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}

        viewport={{ once: true }}>
        <About />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}

        className="hidden xl:block">
        <Values />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}

        className="xl:hidden">
        <ValuesMobile />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

        viewport={{ once: true }}>
        <Realization />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}

        viewport={{ once: true }}>
        <Clients />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}

        viewport={{ once: true }}>
        <Footer />
      </motion.div>
    </Suspense>
  );
}

export default App;
"use client";

import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, ApolloProvider } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';
import { GET_EXPERTISES_MENU } from '@/lib/graphql/queries/ExpertiseQuery';
import { GET_ALL_MADE_IN_MENU } from '@/lib/graphql/queries/MadeInQueries';
import { GET_REFERENCES_HOME } from '@/lib/graphql/queries/ReferenceQueries';
import Header from '@/components/layout/header';
import client from '@/lib/apollo-client';

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

function AppContent() {
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  
  // Fetch all necessary global queries with optimized options
  const { loading: homeLoading } = useQuery(HOME_PAGE_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  
  const { loading: expertisesLoading } = useQuery(GET_EXPERTISES_MENU, {
    fetchPolicy: 'cache-and-network',
  });
  
  const { loading: madeInLoading } = useQuery(GET_ALL_MADE_IN_MENU, {
    fetchPolicy: 'cache-and-network',
  });
  
  const { loading: referencesLoading} = useQuery(GET_REFERENCES_HOME, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!homeLoading && !expertisesLoading && !madeInLoading && !referencesLoading) {
      setAllDataLoaded(true);
    }
  }, [homeLoading, expertisesLoading, madeInLoading, referencesLoading]);

  // Start pre-loading components when data starts loading
  useEffect(() => {
    if (homeLoading || expertisesLoading || madeInLoading || referencesLoading) {
      const preloadComponents = async () => {
        const components = [Hero, About, Values, ValuesMobile, Realization, Clients, Footer];
        await Promise.all(components.map(component => component({})));
      };
      preloadComponents();
    }
  }, []);

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

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}

export default App;
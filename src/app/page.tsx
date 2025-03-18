"use client"
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load components
const Hero = lazy(() => import('@/components/hero/Hero'));
const About = lazy(() => import('@/components/about/About'));
const Values = lazy(() => import('@/components/em-values/Values'));
const ValuesMobile = lazy(() => import('@/components/em-valuesMobile/ValuesMobile'));
const Realization = lazy(() => import('@/components/realization/Realization'));
const Clients = lazy(() => import('@/components/clients/Clients'));
const Footer = lazy(() => import('@/components/layout/footer'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden"
      >
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <About />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="hidden xl:block"
      >
        <Values />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="xl:hidden"
      >
        <ValuesMobile />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Realization />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Clients />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>
    </Suspense>
  );
}

export default App;
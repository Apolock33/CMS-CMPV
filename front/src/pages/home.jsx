import React from "react";
import { motion } from "motion/react";

const HomeCarousel = React.lazy(() => import("../components/sections/home/homeCarousel"));
const HomeNews = React.lazy(() => import("../components/sections/home/homeNews"));
const HomeEvents = React.lazy(() => import("../components/sections/home/homeEvents"));
const Rents = React.lazy(() => import("../components/sections/home/rents"));

const Home = () => {
  return (
    <>
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.5 }} id="carousel">
        <HomeCarousel />
      </motion.section>

      <section id="news" className="flex flex-column md:flex-row gap-4 px-6">
        <div className="w-full md:w-6">
          <HomeNews />
        </div>
        <div className="w-full md:w-6">
          <HomeEvents />
        </div>
      </section>

      <section id="rents" className="px-4">
        <Rents />
      </section>
    </>
  );
};

export default Home;

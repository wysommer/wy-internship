import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <div data-aos="fade">
          <Landing />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <LandingIntro />
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <HotCollections />
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <NewItems />
        </div>
        <div data-aos="fade-up" data-aos-delay="400">
          <TopSellers />
        </div>
        <div data-aos="fade-up" data-aos-delay="500">
          <BrowseByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;

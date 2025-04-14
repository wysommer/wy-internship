import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import Skeleton from "../components/skeleton/Skeleton";

const Explore = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
          data-aos="fade"
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section" data-aos="fade-up" data-aos-delay="100">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <div className="nft__item">
                        <div className="nft__item_wrap">
                          <Skeleton type="image" />
                        </div>
                        <div className="nft__item_info">
                          <Skeleton type="title" width="80%" />
                          <div className="nft__item_price">
                            <Skeleton type="text" width="100px" />
                          </div>
                          <div className="nft__item_action">
                            <Skeleton type="text" width="120px" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <ExploreItems />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;

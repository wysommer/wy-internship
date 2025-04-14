import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/skeleton/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNftData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );
        const data = await response.json();
        setNftData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        setLoading(false);
      }
    };

    fetchNftData();
  }, [id]);

  if (!nftData && !loading) {
    return <div className="text-center">NFT not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0" data-aos="fade">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right" data-aos-delay="100">
                {loading ? (
                  <Skeleton type="image" className="img-fluid img-rounded mb-sm-30 nft-image" />
                ) : (
                  <img
                    src={nftData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={nftData.title}
                  />
                )}
              </div>
              <div className="col-md-6" data-aos="fade-left" data-aos-delay="200">
                <div className="item_info">
                  {loading ? (
                    <>
                      <Skeleton type="title" width="80%" />
                      <div className="item_info_counts">
                        <Skeleton type="text" width="100px" />
                        <Skeleton type="text" width="100px" />
                      </div>
                      <Skeleton type="text" width="100%" />
                      <Skeleton type="text" width="100%" />
                      <Skeleton type="text" width="80%" />
                    </>
                  ) : (
                    <>
                      <h2>{nftData.title}</h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftData.likes}
                        </div>
                      </div>
                      <p>{nftData.description}</p>
                    </>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        {loading ? (
                          <>
                            <Skeleton type="avatar" width="50px" height="50px" />
                            <Skeleton type="text" width="100px" />
                          </>
                        ) : (
                          <>
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.ownerId}`}>
                                <img className="lazy" src={nftData.ownerImage} alt={nftData.ownerName} />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.ownerId}`}>{nftData.ownerName}</Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        {loading ? (
                          <>
                            <Skeleton type="avatar" width="50px" height="50px" />
                            <Skeleton type="text" width="100px" />
                          </>
                        ) : (
                          <>
                            <div className="author_list_pp">
                              <Link to={`/author/${nftData.ownerId}`}>
                                <img className="lazy" src={nftData.ownerImage} alt={nftData.ownerName} />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftData.ownerId}`}>{nftData.ownerName}</Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <Skeleton type="text" width="100px" />
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{nftData.price}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;

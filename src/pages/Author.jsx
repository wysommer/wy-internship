import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/skeleton/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localFollowers, setLocalFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        const data = await response.json();
        setAuthorData(data);
        setLocalFollowers(data.followers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setLocalFollowers(prev => prev - 1);
    } else {
      setLocalFollowers(prev => prev + 1);
    }
    setIsFollowing(prev => !prev);
  };

  if (!authorData && !loading) {
    return <div>Error loading author data</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
          data-aos="fade"
        ></section>

        <section aria-label="section" data-aos="fade-up" data-aos-delay="100">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton type="avatar" width="150px" height="150px" />
                      ) : (
                        <>
                          <img src={authorData.authorImage} alt={authorData.authorName} />
                          <i className="fa fa-check"></i>
                        </>
                      )}
                      <div className="profile_name">
                        {loading ? (
                          <>
                            <Skeleton type="title" width="200px" />
                            <Skeleton type="text" width="150px" />
                            <Skeleton type="text" width="250px" />
                          </>
                        ) : (
                          <h4>
                            {authorData.authorName}
                            <span className="profile_username">@{authorData.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authorData.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton type="text" width="100px" />
                      ) : (
                        <div className="profile_follower">{localFollowers} followers</div>
                      )}
                      {!loading && (
                        <button 
                          onClick={handleFollowToggle} 
                          className={`btn-main ${isFollowing ? 'btn-following' : ''}`}
                        >
                          {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;

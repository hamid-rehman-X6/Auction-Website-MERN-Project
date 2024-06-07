import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
  const navigation = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/get");
        setLatestProducts(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestProducts();
  }, []);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div className="main-home-page">
        <div className="homepage-container">
          <div className="home-page-title-section">
            <div className="h2-heading-home-title">
              <h2 className="h2-heading-home-title">
                Pakistan's most user-
                <br />
                friendly <span className="bidding-text"> eBidding</span> <br />
                platform
              </h2>
            </div>

            <div className="p-tag-home-page">
              <p> Bid With Confidence, Wins With BIDBUY.</p>
            </div>
          </div>

          <div>
            <img src="./HomePageLogo2.png" alt="img-2" className="img-2" />
          </div>
        </div>

        <div className="Button-text-div">
          <p className="new-here-home-page">New Here!</p>
          <button className="button" onClick={() => navigation("/signup")}>
            Register
          </button>
        </div>
      </div>

      <div className="auction-container">
        <h1>Leading Online Auction Platform</h1>
        <p>
          BIDBUY is the premier online platform for live and timed online
          auctions. Browse auction catalogs and bid real-time on exceptional
          fine products and antiques from the best auction houses and dealers.
          New auctions added daily.
        </p>
      </div>

      <section>
        <h3 className="section-h3">Featured Auction Items</h3>
        {loading ? (
          <div className="Product-Loading-div-class">Loading products...</div>
        ) : (
          <div className="product-grid-for-homepage">
            {latestProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div
                  className="images"
                  onClick={() => navigation(`/product-Details/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </div>

                <div className="product-title-info-section">
                  <h2 className="product-title-h2-class">{product.title}</h2>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Starting Price:</strong> {product.startingPrice}
                  </p>
                  <p>
                    <strong>Seller:</strong> {product.sellerName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="show-more-button">
          <button onClick={() => navigation("/product-Page")}>
            Show More Products...
          </button>
        </div>
      </section>

      <div className="Section-for-auction-doc-title">
        <h3>About Our Auction Platform</h3>
      </div>
      <section className="auction-documentation">
        <div className="doc-container">
          <div className="doc-image">
            <img
              src="./New-auctionImage.png"
              alt="Auction Documentation"
              className="img-doc"
            />
          </div>
          <div className={`doc-content ${showMore ? "expanded" : ""}`}>
            <div className="doc-content-text">
              <p>
                Our auction platform provides a seamless experience for both
                buyers and sellers. Join auctions effortlessly and start bidding
                on a variety of products. Here's how you can join:
                <br />
                <strong>How to Join an Auction:</strong> Register on our
                platform, browse available auctions, and start bidding.
                <br />
                <strong>How Auctions Work:</strong> Place your bid, and if
                you're the highest bidder when the auction ends, you win the
                item.
                <br />
                <strong>Payment Criteria:</strong> Payments are made securely
                through our platform. Various payment methods are accepted.
                <br />
                <strong>Benefits of Using Our Platform:</strong> Our platform
                offers a user-friendly interface, real-time updates, and a
                secure bidding process.
                <br />
                <strong>Security Measures:</strong> We ensure the security of
                your personal and payment information through advanced
                encryption methods.
                <br />
                {showMore && (
                  <>
                    <strong>Additional Information:</strong> Our platform offers
                    features like real-time bidding, auction notifications, and
                    customer support to ensure a smooth auction experience.
                    <br />
                    <strong>FAQs:</strong> Visit our FAQ section for more
                    details on how our auction system works and to troubleshoot
                    any issues you might encounter.
                    <br />
                    <strong>Terms and Conditions:</strong> Please review our
                    terms and conditions before participating in any auction.
                    <br />
                    <strong>Privacy Policy:</strong> We are committed to
                    protecting your privacy and ensuring your data is secure.
                  </>
                )}
              </p>
            </div>
            <button onClick={toggleReadMore}>
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

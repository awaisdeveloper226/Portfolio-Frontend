import Head from "next/head";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

export default function services() {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>

      <div className="servicespage">
        <div className="topservices">
          <div className="container">
            <h2>My Services</h2>
          </div>
        </div>

        <div className="centerservices" id="services">
          <div className="container">
            <div className="cservicesbox">
              <div className="csservice">
                <span>01</span>
                <div>
                  <h2>Web Development</h2>
                  <img src="/img/website_icon.svg" alt="Web Development Icon" />
                </div>
                <ul>
                  <li>Fast-loading, high-performance websites</li>
                  <li>Clean, scalable, and reusable code</li>
                  <li>Fully responsive design across all devices</li>
                  <li>Thorough testing for bug-free experiences</li>
                  <li>Ongoing maintenance and updates</li>
                </ul>
                <p>
                  I build modern, responsive websites that help your business
                  grow online. Whether you need a landing page or a full web
                  application, I ensure top-tier performance, clean code, and
                  ongoing support—so you can focus on your business while I
                  handle the tech.
                </p>
              </div>

              <div className="csservice">
                <span>02</span>
                <div>
                  <h2>App Development</h2>
                  <img src="/img/website_icon.svg" alt="App Development Icon" />
                </div>
                <ul>
                  <li>Cross-platform mobile apps (iOS & Android)</li>
                  <li>Fast performance with smooth UI</li>
                  <li>Custom features tailored to your business</li>
                  <li>Robust testing and quality assurance</li>
                  <li>Post-launch support and updates</li>
                </ul>
                <p>
                  I develop powerful, user-friendly mobile apps that bring your
                  ideas to life. From prototyping to deployment, I ensure your
                  app runs smoothly, looks great, and delivers real value to
                  your users—helping you stand out in a competitive market.
                </p>
              </div>

              <div className="csservice">
                <span>03</span>
                <div>
                  <h2>SEO Optimization</h2>
                  <img
                    src="/img/website_icon.svg"
                    alt="SEO Optimization Icon"
                  />
                </div>
                <ul>
                  <li>Website speed and structure optimization</li>
                  <li>On-page SEO and keyword targeting</li>
                  <li>Mobile-friendly improvements</li>
                  <li>Technical SEO audits</li>
                  <li>Rank tracking and ongoing updates</li>
                </ul>
                <p>
                  I help your website rank higher on Google and drive more
                  organic traffic through effective SEO strategies. With a focus
                  on technical SEO, content optimization, and user experience, I
                  ensure your website is search-engine and user-friendly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pricingplansec">
          <div className="container">
            <div className="pricingtitles text-center">
              <h3>
                <img src="/img/chevron_right.png" alt="" />
                PRICING PLANS
              </h3>
              <h2>Pricing My Work</h2>
            </div>

            <div className="pricingcards">
              {/* SILVER PLAN */}
              <div className="pricingcard">
                <h4>SILVER</h4>
                <p>
                  Ideal for individuals or startups launching their first
                  project
                </p>
                <h2>
                  $149.00 <span>One Time</span>
                </h2>
                <Link href="/contact">
                  <button>Get Started Now</button>
                </Link>
                <div>
                  <h5>Includes</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> 1-Page Static Website
                    </li>
                    <li>
                      <IoMdCheckmark /> Mobile Responsive Design
                    </li>
                    <li>
                      <IoMdCheckmark /> Basic SEO Setup
                    </li>
                    <li>
                      <IoMdCheckmark /> Delivery in 3 Days
                    </li>
                    <li>
                      <HiXMark /> No Admin Panel
                    </li>
                    <li>
                      <HiXMark /> No App Development
                    </li>
                    <li>
                      <HiXMark /> Ongoing Maintenance
                    </li>
                  </ul>
                </div>
              </div>

              {/* GOLD PLAN */}
              <div className="pricingcard">
                <h4>GOLD</h4>
                <p>
                  Perfect for small businesses looking for a complete web
                  presence
                </p>
                <h2>
                  $349.00 <span>One Time</span>
                </h2>
                <Link href="/contact">
                  <button>Get Started Now</button>
                </Link>
                <div>
                  <h5>Includes</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> Multi-page Website (Up to 5 pages)
                    </li>
                    <li>
                      <IoMdCheckmark /> Custom Admin Panel
                    </li>
                    <li>
                      <IoMdCheckmark /> Responsive & SEO Optimized
                    </li>
                    <li>
                      <IoMdCheckmark /> Basic Contact Form & Map
                    </li>
                    <li>
                      <IoMdCheckmark /> 1 Month Free Maintenance
                    </li>
                    <li>
                      <HiXMark /> No Mobile App
                    </li>
                    <li>
                      <HiXMark /> No Multi-language Support
                    </li>
                  </ul>
                </div>
              </div>

              {/* DIAMOND PLAN */}
              <div className="pricingcard">
                <h4>DIAMOND</h4>
                <p>
                  Best for brands needing full web + app presence with support
                </p>
                <h2>
                  $699.00 <span>One Time</span>
                </h2>
                <Link href="/contact">
                  <button>Get Started Now</button>
                </Link>
                <div>
                  <h5>Includes</h5>
                  <ul>
                    <li>
                      <IoMdCheckmark /> Full Website + Admin Dashboard
                    </li>
                    <li>
                      <IoMdCheckmark /> 1 Native Android App
                    </li>
                    <li>
                      <IoMdCheckmark /> SEO & Performance Optimization
                    </li>
                    <li>
                      <IoMdCheckmark /> Multi-language Support
                    </li>
                    <li>
                      <IoMdCheckmark /> 3 Months Free Maintenance
                    </li>
                    <li>
                      <IoMdCheckmark /> Priority Support
                    </li>
                    <li>
                      <IoMdCheckmark /> Delivery in 10-14 Days
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

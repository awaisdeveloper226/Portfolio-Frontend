import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaCalendarDays, FaGithub, FaInstagram } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GoArrowUpRight } from "react-icons/go";
import Spinner from "@/components/Spinner"; // Make sure the path is correct
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";

export default function Home() {
  const [activeIndex, setactiveIndex] = useState(0);

  const handleHover = (index) => {
    setactiveIndex(index);
  };

  const handleMouseOut = () => {
    setactiveIndex(0);
  };

  const services = [
    {
      title: "Web Development",
      description:
        "We build fast, secure, and scalable websites tailored to your business goals. Whether you need a stunning landing page or a powerful web app, our solutions are designed to convert visitors into customers and elevate your online presence.",
    },
    {
      title: "App Development",
      description:
        "Transform your idea into a sleek, high-performance mobile app. We develop custom iOS, Android, and cross-platform apps that offer seamless user experiences, robust performance, and long-term scalability for your business.",
    },
    {
      title: "SEO",
      description:
        "Drive targeted traffic and boost your search engine rankings with our expert SEO services. From on-page optimization to strategic keyword targeting, we help your business stand out, get found, and grow organically.",
    },
  ];

  const [loading, setloading] = useState(true);
  const [allwork, setallwork] = useState([]);
  const [alldata, setalldata] = useState([]);
  const [selectedcategory, setselectedcategory] = useState("All");
  const [filteredprojects, setfilteredprojects] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const projectres = await fetch("/api/projects");
        const projectData = await projectres.json();
        setalldata(projectData);

        const blogres = await fetch("/api/blogs");
        const blogData = await blogres.json();
        setallwork(blogData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (selectedcategory === "All") {
      setfilteredprojects(alldata.filter((pro) => pro.status === "published"));
    } else {
      setfilteredprojects(
        alldata.filter(
          (pro) =>
            pro.status === "published" &&
            pro.projectcategory.includes(selectedcategory)
        )
      );
    }
  }, [selectedcategory, alldata]);

  const handleCategoryChange = (category) => {
    setselectedcategory(category);
  };

  const formatDate = (date) => {
    if (!date || isNaN(date)) {
      return "";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <>
      <Head>
        <title>Awais - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              className="animate-stroke"
            ></text>
          </svg>
        </div>

        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title">I am Awais</span>
              <h1 className="hero_title">
                Web Developer + <br />{" "}
                <span className="typed-text">SEO Specialist</span>
              </h1>
              <div className="hero_img_box heroimgbox">
                <img src="/img/me.png" alt="" />
              </div>
              <div className="lead">
                I solve complex user experience problems with clear, reliable
                solutions that connect users to what they need.
              </div>
              <div className="hero_btn_box">
                <a
                  href="/img/Muhammad Awais Web Developer Resume.pdf"
                  className="download_cv"
                  download
                >
                  Download CV <BiDownload />
                </a>
                <ul className="hero_social">
                  <li>
                    <Link href="/">
                      {" "}
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://core-tech-solutions.vercel.app/"
                      target="_blank"
                    >
                      {" "}
                      <LiaBasketballBallSolid />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/in/muhammad-awais-773493230"
                      target="_blank"
                    >
                      {" "}
                      <GrLinkedinOption />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/awaisdeveloper226"
                      target="_blank"
                    >
                      {" "}
                      <FaGithub />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="heroimageright">
              <div className="hero_img_box">
                <img src="/img/me.png" alt="" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex sb">
            <div className="funfect_item">
              <h3>4+</h3>
              <h4>
                Years of <br />
                Expereince
              </h4>
            </div>
            <div className="funfect_item">
              <h3>10+</h3>
              <h4>
                Projects <br />
                Completed
              </h4>
            </div>
            <div className="funfect_item">
              <h3>15+</h3>
              <h4>
                Technologies <br />
                Mastered
              </h4>
            </div>
            <div className="funfect_item">
              <h3>10+</h3>
              <h4>
                Happy <br />
                Clients
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>My Quality Services</h2>
            <p>
              We put your ideas in the form of a unique web project that
              inspires you and your customers
            </p>
          </div>
          <div className="services">
            {services.map((service, index) => (
              <Link href="/services/#services" key={index}>
                <div
                  className={`services_item ${
                    activeIndex === index ? "sactive" : ""
                  }`}
                  key={index}
                  onMouseOver={() => handleHover(index)}
                  onMouseOut={handleMouseOut}
                >
                  <div className="left_s_box">
                    <span>0{index + 1}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <div className="right_s_box">
                    <p>{service.description}</p>
                  </div>
                  <GoArrowUpRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="projects">
          <div className="container">
            <div className="project_titles">
              <h2>My Recent Works</h2>
              <p>
                Explore a selection of projects that showcase our expertise in
                web development, mobile apps, and SEO. Each solution is crafted
                to deliver real results—optimized for performance, designed for
                impact, and built to solve real business challenges. Let our
                work speak for itself.
              </p>
            </div>
            <div className="project_buttons">
              <button
                className={selectedcategory === "All" ? "active" : ""}
                onClick={() => handleCategoryChange("All")}
              >
                All
              </button>
              <button
                className={
                  selectedcategory === "Website Development" ? "active" : ""
                }
                onClick={() => handleCategoryChange("Website Development")}
              >
                Website
              </button>
              <button
                className={
                  selectedcategory === "App Development" ? "active" : ""
                }
                onClick={() => handleCategoryChange("App Development")}
              >
                App
              </button>
              <button
                className={selectedcategory === "SEO" ? "active" : ""}
                onClick={() => handleCategoryChange("SEO")}
              >
                SEO
              </button>
            </div>
            <div className="projects_cards">
              {loading ? (
                <div className="flex flex-center wh_50">
                  <Spinner />
                </div>
              ) : filteredprojects.length === 0 ? (
                <h1>No Project Found</h1>
              ) : (
                filteredprojects.slice(0, 4).map((pro) => (
                  <Link
                    href={`/projects/${pro.slug}`}
                    className="procard"
                    key={pro._id}
                  >
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt="" />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy" id="clients">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className=" experience_title flex gap-1">
              <LuMedal />
              <h2>My Clients</h2>
            </div>
            <div className="exper_cards">
              <Link href="https://fifthgen.io" target="_blank">
                <div className="exper_card">
                  <span>2024 - Present</span>
                  <h3>FifthGen</h3>
                  <p>Full Stack Web Developer</p>
                </div>
              </Link>
              <Link href="https://www.scoutco.org" target="_blank">
                <div className="exper_card">
                  <span>2025 - Present</span>
                  <h3>Scout</h3>
                  <p>Full Stack Web Developer</p>
                </div>
              </Link>
              <Link href="https://www.polishedpersona.blog" target="_blank">
              <div className="exper_card">
                <span>2023 - 2024</span>
                <h3>Polished Persona</h3>
                <p>Wordpress Developer</p>
              </div>
              </Link>
              <div className="exper_card">
                <span>2024 - 2025</span>
                <h3>LEAD DEVELOPERS</h3>
                <p>SEO Specialist</p>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1">
              <PiGraduationCap />
              <h2>My Certificates</h2>
            </div>
            <div className="exper_cards">
              <Link
                href="/img/MERN Stack Web Development with Ultimate Authentication.jpg"
                target="_blank"
              >
                <div className="exper_card">
                  <span>2024</span>
                  <h3>
                    MERN Stack Web Development with Ultimate Authentication
                  </h3>
                </div>
              </Link>
              <Link
                href="/img/React, NodeJS, Express & MongoDB - The MERN Fullstack Guide.jpg"
                target="_blank"
              >
                <div className="exper_card">
                  <span>2024 </span>
                  <h3>
                    React, NodeJS, Express & MongoDB - The MERN Fullstack Guide
                  </h3>
                </div>
              </Link>
              <Link href="/img/App Development Certificate.png" target="_blank">
                <div className="exper_card">
                  <span>2024</span>
                  <h3>React Native: Mobile App Development (CLI) [2025]</h3>
                  <p>Udemy</p>
                </div>
              </Link>
              <Link href="/img/SEO Certificate.png" target="_blank">
                <div className="exper_card">
                  <span>2024</span>
                  <h3>
                    SEO Training Masterclass 2025: Beginner To Advanced SEO
                  </h3>
                  <p>Udemy</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title" id="skills">
            <h2>My Skills</h2>
            <p>
              I specialize in modern web technologies to build fast, secure, and
              scalable digital solutions. With hands-on expertise in full-stack
              development—including React, Node.js, Express, and MongoDB—I
              deliver robust applications tailored to your business needs. My
              skills are backed by real-world projects and a commitment to
              writing clean, efficient code.
            </p>
          </div>
          <div className="myskils_cards">
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="" />
                <h3>95%</h3>
              </div>
              <p className="text-center">React JS</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/express.jpeg" alt="" />
                <h3>91%</h3>
              </div>
              <p className="text-center">Express JS</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="" />
                <h3>96%</h3>
              </div>
              <p className="text-center">Mongo DB</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/nodejs.png" alt="" />
                <h3>93%</h3>
              </div>
              <p className="text-center">Node JS</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/nextjs.jpeg" alt="" />
                <h3>98%</h3>
              </div>
              <p className="text-center">Next JS</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.png" alt="" />
                <h3>90%</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>
              Stay updated with insights, tutorials, and industry trends from
              the world of web development, mobile apps, and digital strategy.
              These blogs share practical knowledge, expert tips, and real-world
              experiences to help you grow your business and stay ahead of the
              curve.
            </p>
          </div>

          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return (
                <Link
                  href={`/blogs/${blog.slug}`}
                  key={blog._id}
                  className="re_blog"
                >
                  <div className="re_blogimg">
                    <img
                      src={blog.images[0] || "/img/noimage.png"}
                      alt={blog.title}
                    />
                    
                  </div>
                  <div className="re_bloginfo">
                    <div className="re_topdate flex gap-1">
                      <div className="res_date">
                        <FaCalendarDays />
                        <span>{formatDate(new Date(blog.createdAt))}</span>
                      </div>
                    </div>
                    <h2>{blog.title}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

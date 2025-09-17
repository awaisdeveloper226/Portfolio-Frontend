import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useState,useEffect } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { GoArrowUpRight } from "react-icons/go";


export default function projects() {
  const { alldata, loading } = useFetchData("/api/projects");

  const publishedData = alldata.filter((ab) => ab.status === "published");

  const [selectedcategory, setselectedcategory] = useState("All");

  const handleCategoryChange = (category) => {
    setselectedcategory(category);
  };

  const [selectedCategory, setselectedCategory] = useState("All");

  const [filteredprojects, setfilteredprojects] = useState([]);

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

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="projectpage">
        <div className="projects">
          <div className="container">
            <div className="project_titles">
              <h2>My Recent Works</h2>
              <p>
                We put your ideas and your wishes int he form of a unique web
                project that inspires you and your customers
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
                className={
                  selectedcategory === "E-commerce Site" ? "active" : ""
                }
                onClick={() => handleCategoryChange("E-commerce Site")}
              >
                Digital
              </button>
              <button
                className={
                  selectedcategory === "Performance Evaluation" ? "active" : ""
                }
                onClick={() => handleCategoryChange("Performance Evaluation")}
              >
                Content
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
                filteredprojects.map((pro) => (
                  <Link href={`/projects/${pro.slug}`}className="procard" key={pro._id}>
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
      </div>
    </>
  );
}

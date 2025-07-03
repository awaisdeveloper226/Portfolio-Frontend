import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import Spinner from "@/components/Spinner";

export default function blogs() {
  const [currentpage, setcurrentpage] = useState(1);
  const [perpage] = useState(7);
  const [searchquery, setsearchquery] = useState("");

  const { alldata, loading } = useFetchData("/api/blogs");

  const paginate = (pageNumber) => {
    setcurrentpage(pageNumber);
  };

  const filteredblogs = Array.isArray(alldata)
    ? searchquery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchquery.toLowerCase())
        )
    : [];

  const indexoffirstblog = (currentpage - 1) * perpage;
  const indexoflastblog = currentpage * perpage;
  const currentblogs = filteredblogs.slice(indexoffirstblog, indexoflastblog);

  const publishedData = currentblogs.filter(
    (blog) => blog.status === "published"
  );

  const sliderpubdata = alldata.filter((blog) => blog.status === "published");

  const pagenumbers = [];
  for (let i = 1; i <= Math.ceil(filteredblogs.length / perpage); i++) {
    pagenumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  Welcome to <span>Awais Blogs</span>
                </h1>
                <p>
                  I write about web, mobile development and Javascript
                  frameworks. The best articles,links and news related to web
                  and mobile development
                </p>
                
              </div>
            </div>
            <div className="featured">
              <div className="container">
                <div className="border"></div>
                <div className="featuredposts">
                  <div className="fetitle flex">
                    <h3>Featured Posts :</h3>
                  </div>
                  <div className="feposts flex">
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={30}
                      freeMode={true}
                      modules={[FreeMode]}
                      className="mySwiper"
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {sliderpubdata.slice(0, 6).map((blog) => (
                            <SwiperSlide key={blog._id}>
                              <div className="fpost" key={blog._id}>
                                <Link href={`/blogs/${blog.slug}`}>
                                  <img src={blog.images[0]} alt="" />
                                </Link>
                                <div className="fpostinfo">
                                  <div className="tegs flex">
                                    {blog.blogcategory.map((cat) => {
                                      return (
                                        <Link
                                          href={`/blogs/category/${cat}`}
                                          className="ai"
                                        >
                                          <span></span>
                                          {cat}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                  <h2>
                                    <Link href={`/blogs/${blog.slug}`}>
                                      {blog.title}
                                    </Link>
                                  </h2>
                                  <div className="fpostby flex">
                                    <img src="/img/me.png" alt="" />

                                    <p>By Muhammad Awais</p>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </>
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    
        <section className="latestpostsec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Latest Articles :</h3>
              </div>
              <div className="latestposts">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {publishedData.map((blog) => {
                      return (
                        <div className="lpost" key={blog._id}>
                          <div className="lpostimg">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.title} />
                            </Link>
                            
                          </div>
                          <div className="lpostinfo">
                            <h3>
                              <Link href={`/blogs/${blog.slug}`}>
                                {blog.title}
                              </Link>
                            </h3>
                            <p>
                              {blog.description.length > 100
                                ? blog.description.slice(0, 100) + "..."
                                : blog.description}
                            </p>
                            <h4 className="flex">
                              <img src="/img/me.png" alt="" />{" "}
                              <span>By Muhammad Awais</span>
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

          
          </div>
        </section>
      </div>
    </>
  );
}

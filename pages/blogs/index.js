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
                <div className="subemail">
                  <form action="" className="flex">
                    <input type="text" placeholder="Search blogs here" />
                    <button>Search</button>
                  </form>
                </div>
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

        {/* Change the Category in url of each blog category   */}
        <section className="populartegssec">
          <div className="container">
            <div className="border"></div>
            <div className="populartegsdata">
              <div className="fetitle">
                <h3>Popular Tags</h3>
              </div>
              <div className="poputegs">
                <Link href="/blog/category/Next JS" className="ptag">
                  <img src="/img/nextjs.jpeg" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>
                      Next Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Next JS" className="ptag">
                  <img src="/img/nextjs.jpeg" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>
                      Next Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Next JS" className="ptag">
                  <img src="/img/nextjs.jpeg" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>
                      Next Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Next JS" className="ptag">
                  <img src="/img/nextjs.jpeg" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>
                      Next Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Next JS" className="ptag">
                  <img src="/img/nextjs.jpeg" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>
                      Next Js
                    </div>
                  </div>
                </Link>
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
                          <div className="lposting">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.title} />
                            </Link>
                            <div className="tegs">
                              {blog.blogcategory.map((cat) => {
                                return (
                                  <Link
                                    href={`/blogs/category/${cat}`}
                                    className="ai"
                                    key={cat}
                                  >
                                    <span></span>
                                    {cat}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          <div className="lpostinfo">
                            <h3>
                              <Link href={`/blogs/${blog.slug}`}>
                                {blog.title}
                              </Link>
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Quibusdam itaque fuga ipsam adipisci
                              quisquam aut, ad dignissimos, id in earum sed
                              magnam voluptatem corrupti odio sequi. Possimus
                              accusamus voluptas officiis.
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

            {publishedData.length === 0 ? (
              ""
            ) : (
              <div className="blogspaginationbtn flex flex-center mt-3">
                <button
                  onClick={() => paginate(currentpage - 1)}
                  disabled={currentpage === 1}
                >
                  Previous
                </button>

                {pagenumbers
                  .slice(
                    Math.max(currentpage - 3, 0),
                    Math.min(currentpage + 2, pagenumbers.length)
                  )
                  .map((num) => (
                    <button
                      key={num}
                      onClick={() => paginate(num)}
                      className={`${currentpage === num ? "active" : ""}`}
                    >
                      {num}
                    </button>
                  ))}

                <button
                  onClick={() => paginate(currentpage + 1)}
                  disabled={currentpage === pagenumbers.length}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  const [currentpage, setcurrentpage] = useState(1);
  const [perpage] = useState(7);
  const [searchquery, setsearchquery] = useState("");

  const { alldata, loading } = useFetchData(`/api/blogs?category=${category}`);

  const filteredblogs = alldata
  .filter((item) => item.blogcategory.includes(category))
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  const blogcategorydata = [...filteredblogs].reverse();

  const paginate = (pagenumber) => {
    setcurrentpage(pagenumber);
  };

  const allblog = alldata.length;

  const indexoffirstblog = (currentpage - 1) * perpage;
  const indexoflastblog = currentpage * perpage;
  const currentblogs = filteredblogs.slice(indexoffirstblog, indexoflastblog);

  const publishedData = currentblogs.filter(
    (blog) => blog.status === "published"
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perpage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blog category page</title>
      </Head>
      <div className="blogcategory">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  Category <span>{category}</span>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostssec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>{category} Articles</h3>
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

                {pageNumbers
                  .slice(
                    Math.max(currentpage - 3, 0),
                    Math.min(currentpage + 2, pageNumbers.length)
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
                  disabled={currentpage === pageNumbers.length}
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

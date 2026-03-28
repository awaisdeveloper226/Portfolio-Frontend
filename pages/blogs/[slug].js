import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";
import Spinner from "@/components/Spinner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { alldata } = useFetchData("/api/blogs");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageok, setMessageok] = useState("");
  const [blogdata, setBlogdata] = useState({ blog: {}, comments: [] });
  const [copied, setCopied] = useState(false);

  const [newcomment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpara: "",
    maincomment: true,
    parent: null,
    parentName: "",
  });

  const replyFormRef = useRef(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogdata({
            ...response.data,
            comments: response.data.comments || [],
          });
        } catch (err) {
          setError(err.message || "An error occurred while fetching data");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBlogData();
  }, [slug]);

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date))) {
      return "";
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true,
    }).format(new Date(date));
  };

  const handleCopyURL = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const updateChildrenComments = (comments, parentId, newcomment) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        return {
          ...comment,
          children: [...(comment.children || []), newcomment],
        };
      } else if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: updateChildrenComments(
            comment.children,
            parentId,
            newcomment
          ),
        };
      }
      return comment;
    });
  };

  const handlereply = (parentcommentId, parentname) => {
    setNewComment((prev) => ({
      ...prev,
      parent: parentcommentId,
      parentName: parentname,
      maincomment: false,
    }));
    replyFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRemoveReply = () => {
    setNewComment((prev) => ({
      ...prev,
      parent: null,
      parentName: "",
      maincomment: true,
    }));
  };

  const renderComments = (comments) => {
    if (!comments) return null;
    return comments.map((comment) => (
      <div className="blogcomment" key={comment._id}>
        <h3>
          {comment.name} <span>{formatDate(comment.createdAt)}</span>
        </h3>
        <h4>
          Topic: <span>{comment.title}</span>
        </h4>
      </div>
    ));
  };

  return (
    <>
      <Head>
        <title>{blogdata.blog.title || "Blog Post"}</title>
      </Head>

      <div>
        {blogdata && (
          <div className="blogslugpage">
            <div className="container">
              <div className="blogslugpagecont">
                <div className="leftsitedetails">
                  <div className="leftbloginfoimg">
                    <img
                      src={blogdata.blog.images?.[0] || "/img/noimage.png"}
                      alt={blogdata.blog.title || "Blog Image"}
                    />
                  </div>
                  <div className="slugbloginfopub">
                    <div className="flex gap-2">
                      <div className="adminslug">
                        <img src="/img/me.png" alt="Author" />
                        <span>By Awais</span>
                      </div>
                      <div className="adminslug">
                        <SlCalender />
                        <span>{formatDate(blogdata.blog.createdAt)}</span>
                      </div>
                    </div>
                    <div className="shareblogslug">
                      <div
                        title="Copy URL"
                        onClick={handleCopyURL}
                        style={{ cursor: "pointer" }}
                      >
                        <BsCopy />
                        <span>{copied ? "Copied!" : ""}</span>
                      </div>

                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          typeof window !== "undefined"
                            ? window.location.href
                            : ""
                        )}`}
                        target="_blank"
                      >
                        <RiFacebookFill />
                      </Link>

                      <Link
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          typeof window !== "undefined"
                            ? window.location.href
                            : ""
                        )}&text=Check%20this%20out!`}
                        target="_blank"
                      >
                        <FaTwitter />
                      </Link>

                      <Link
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          "Check this out: " +
                            (typeof window !== "undefined"
                              ? window.location.href
                              : "")
                        )}`}
                        target="_blank"
                      >
                        <RiWhatsappFill />
                      </Link>

                      <Link
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          typeof window !== "undefined"
                            ? window.location.href
                            : ""
                        )}`}
                        target="_blank"
                      >
                        <BiLogoLinkedin />
                      </Link>
                    </div>
                  </div>

                  <h1>{blogdata.blog.title}</h1>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div className="blogcontent">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {blogdata.blog.description}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                <div className="rightsitedetails">
                  <div className="rightslugcategory">
                    <h2>Categories</h2>
                    <ul>
                      <Link href="/blogs/category/Next Js">
                        <li>
                          Next Js{" "}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === "Next Js"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/Digital Marketing">
                        <li>
                          Digital Marketing{" "}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) =>
                                  ab.blogcategory[0] === "Digital Marketing"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/React Js">
                        <li>
                          React Js{" "}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === "React Js"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/Node Js">
                        <li>
                          Node Js{" "}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === "Node Js"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/Flutter">
                        <li>
                          Flutter{" "}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === "Flutter"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                      <Link href="/blogs/category/Database">
                        <li>
                          Database{" "}
                          <span>
                            (
                            {
                              alldata.filter(
                                (ab) => ab.blogcategory[0] === "Database"
                              ).length
                            }
                            )
                          </span>
                        </li>
                      </Link>
                    </ul>
                  </div>

                  <div className="rightrecentpost">
                    <h2>RECENT POSTS</h2>
                    {alldata.slice(0, 3).map((ab) => {
                      return (
                        <Link
                          key={ab._id}
                          href={`/blogs/${ab.slug}`}
                          className="rightrecentp"
                        >
                          <img src={ab.images[0]} alt="" />
                          <div>
                            <h3>{ab.title}</h3>
                            <h4 className="mt-1">
                              {ab.tags.map((cat) => {
                                return <span key={cat}>{cat}</span>;
                              })}
                            </h4>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;

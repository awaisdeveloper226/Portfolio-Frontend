import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function shopslug() {
  const router = useRouter();

  const { slug } = router.query;

  const { alldata, loading } = useFetchData(`/api/shops?slug=${slug}`);

  const [mainImage, setmainImage] = useState("");

  useEffect(() => {
    if (alldata && alldata.length > 0 && alldata[0]?.images[0]) {
      setmainImage(alldata[0]?.images[0]);
    }
  }, [alldata]);

  const handleImageClick = (image) => {
    setmainImage(image);
  };

  return (
    <>
      <Head>
        <title>Shop Page</title>
      </Head>

      <div className="shopslugpage">
        <div className="shopcontent">
          <div className="container">
            <div className="shopcontbox">
              <div className="leftshopimgbox">
                <div className="leftshopmainimg">
                  {loading ? <Spinner /> : <img src={mainImage} alt="image" />}
                </div>

                <div className="leftsimgboxlist">
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={30}
                    freeMode={true}
                    grabCursor={false}
                    modules={[FreeMode]}
                    className="mySwiper"
                  >
                    {alldata &&
                      alldata[0]?.images?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt="Thumbnail"
                            onClick={() => handleImageClick(image)}
                            className="cursor-pointer"
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
              <div className="rightshopcontbox">
                <h1>{alldata && alldata[0]?.title}</h1>
                <h3 className="rightshopprice">
                  Price: <span>{alldata && alldata[0]?.price}</span>
                </h3>
                <a
                  className="shopnowbtn"
                  target="_blank"
                  href={alldata && alldata[0]?.afilink}
                >
                  Shop Now
                </a>
                <div className="blogcontent">
                  <h2 className="bctitle">Product Details:</h2>

                  <ReactMarkDown>
                    {alldata && alldata[0]?.description}
                  </ReactMarkDown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Head from "next/head";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
export default function projectslug() {
  const router = useRouter();

  const { slug } = router.query;

  const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`);

  const createdAtDate =
    alldata && alldata[0]?.createdAt
      ? new Date(alldata && alldata[0]?.createdAt)
      : null;

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
        <title>{slug}</title>
      </Head>

      <div className="projectslug">
        <div className="projectslugimg">
          <div className="container">
            <div className="proslugimg">
              <img
                src={alldata && alldata[0]?.images[0]}
                alt={alldata && alldata[0]?.title}
              />
            </div>

            <div className="projectsluginfo">
              <div className="leftmainproinfo">
                <h1>{alldata && alldata[0]?.title}</h1>
                <p></p>
                <a
                  target="_blank"
                  href={
                    alldata && alldata[0]?.livepreview?.startsWith("http")
                      ? alldata[0].livepreview
                      : `https://${alldata[0]?.livepreview}`
                  }
                >
                  Live Preview
                </a>
              </div>
              <div className="rightmainproinfo">
                <div>
                  <h3>Category</h3>
                  <h2>{alldata && alldata[0]?.projectcategory?.[0]}</h2>
                </div>
                <div>
                  <h3>Client</h3>
                  <h2>{alldata && alldata[0]?.client}</h2>
                </div>
                <div>
                  <h3>Start Date</h3>
                  <h2>{formatDate(createdAtDate)}</h2>
                </div>
                <div>
                  <h3>Designer</h3>
                  <h2>Muhammad Awais</h2>
                </div>
              </div>
            </div>

            <div className="projectslugsliderimg">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className="mySwiper"
              >
                {alldata &&
                  alldata[0]?.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={alldata && alldata[0]?.title} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="projectslugdescription">
          <div className="container">
            <div className="psdescri">
              <h2>Project Description</h2>
              <div className="blogcontent">
                {alldata && alldata[0]?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

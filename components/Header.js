import Link from "next/link";
import { useRouter } from "next/router";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun, LuSunMoon } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function Header() {
  const [darkmode, setdarkmode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkmode") === "true";
    setdarkmode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkmode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkmode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
    }
  }, [darkmode]);

  const toggleDarkMode = () => {
    setdarkmode(!darkmode);
  };

  const router = useRouter();
  const [clicked, setclicked] = useState(false);
  const [activelink, setactivelink] = useState("/");

  const handlelinkClick = (link) => {
    setactivelink(link);
    setclicked(false); // If you use this elsewhere
    setmobile(false); // This hides the mobile menu
  };

  useEffect(() => {
    setactivelink(router.pathname);
  }, [router.pathname]);

  const [mobile, setmobile] = useState(false);

  const handleMobileOpen = () => {
    setmobile(!mobile);
  };

  const handleMobileClose = () => {
    setmobile(false);
  };

  const dropdownRef = useRef();

useEffect(() => {
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setmobile(false);
    }
  };

  if (mobile) {
    document.addEventListener("mousedown", handleOutsideClick);
  }

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, [mobile]);


  return (
    <>
      <header className="sticky top-0 w-full">
        <nav className="container flex flex-sb">
          <div className="logo flex gap-2">
            <Link href="/">
              <img src={`/img/${darkmode ? "white" : "logo"}.png`} alt="logo" />
            </Link>
            <h2>Muhammad Awais</h2>
          </div>

          <div className="navlist flex gap-2">
            <ul className="main-links flex gap-2">
              <li>
                <Link
                  href="/"
                  onClick={() => handlelinkClick("/")}
                  className={activelink === "/" ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  onClick={() => handlelinkClick("/blogs")}
                  className={activelink === "/blogs" ? "active" : ""}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={() => handlelinkClick("/services")}
                  className={activelink === "/services" ? "active" : ""}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  onClick={() => handlelinkClick("/projects")}
                  className={activelink === "/projects" ? "active" : ""}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  onClick={() => handlelinkClick("/shop")}
                  className={activelink === "/shop" ? "active" : ""}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => handlelinkClick("/contact")}
                  className={activelink === "/contact" ? "active" : ""}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="darkmodetoggle" onClick={toggleDarkMode}>
              {darkmode ? <IoMoonSharp /> : <LuSun />}
            </div>

            <button>
              <Link href="/contact">Hire Me!</Link>
            </button>

            <div className="mobiletogglesvg" onClick={handleMobileOpen}>
              <HiMiniBars3BottomRight />
            </div>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {mobile && (
          <div className="mobile-dropdown" ref={dropdownRef}>
            <div className="mobile-dropdown-header">
              <span className="close-icon" onClick={handleMobileClose}>
                ×
              </span>
            </div>
            <ul>
              <li>
                <Link href="/" onClick={() => handlelinkClick("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" onClick={() => handlelinkClick("/blogs")}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={() => handlelinkClick("/services")}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  onClick={() => handlelinkClick("/projects")}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/shop" onClick={() => handlelinkClick("/shop")}>
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => handlelinkClick("/contact")}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

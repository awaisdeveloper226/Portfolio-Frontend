import Link from "next/link";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { useState, useEffect } from "react";

export default function Footer() {
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

  return (
    <footer className="footer">
      <div className="footersec flex flex-center flex-col gap-2">
        <div className="logo">
          <img
            key={darkmode ? "footer-white" : "footer-default"}
            src={`/img/${darkmode ? "white" : "logo"}.png`}
            alt="logo"
          />
        </div>

        <div className="ul nav-links">
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link
              href="/img/Muhammad Awais Web Developer Resume.pdf"
              target="_blank"
            >
              Resume
            </Link>
          </li>
          <li>
            <Link href="/#skills">Skills</Link>
          </li>
          <li>
            <Link href="/#clients">Testimonials</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </div>

        <ul className="hero_social">
          <li>
            <Link href="/" target="_blank">
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link
              href="https://core-tech-solutions.vercel.app/"
              target="_blank"
            >
              <LiaBasketballBallSolid />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/muhammad-awais-773493230"
              target="_blank"
            >
              <GrLinkedinOption />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/awaisdeveloper226" target="_blank">
              <FaGithub />
            </Link>
          </li>
        </ul>

        <div className="copyrights">
          &copy; 2025 All Rights Reserved By <span>Muhammad Awais</span>
        </div>
      </div>
    </footer>
  );
}

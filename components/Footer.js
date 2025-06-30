import React from "react";
import Link from "next/link";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

const Footer = ({ darkmode }) => {
  return (
    <>
      <footer className="footer">
        <div className="footersec">
          <div className="footer-logo">
            <img
              key={darkmode ? "footer-white" : "footer-default"}
              src={`/img/${darkmode ? "white" : "logo"}.png`}
              alt="logo"
            />
          </div>

          <ul className="footer-links">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li>
              <Link href="/img/Muhammad Awais Web Developer Resume.pdf" target="_blank">
                Resume
              </Link>
            </li>
            <li><Link href="/#skills">Skills</Link></li>
            <li><Link href="/#clients">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          <ul className="footer-social">
            <li>
              <Link href="/" target="_blank">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link href="https://core-tech-solutions.vercel.app/" target="_blank">
                <LiaBasketballBallSolid />
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/muhammad-awais-773493230" target="_blank">
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

      <style jsx>{`
        .footer {
          padding: 2rem 1rem;
          background: #050709;
          width: 100%;
        }

        .dark .footer {
          background: #2a1454;
        }

        .footersec {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo img {
          width: 140px;
          height: auto;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: center;
        }

        .footer-links li a {
          font-weight: 600;
          text-decoration: none;
          color: #ffffff;
          transition: color 0.3s;
        }

        .footer-links li a:hover {
          color: #905ff1;
        }

        .footer-social {
          display: flex;
          gap: 1rem;
          justify-content: center;
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 1.5rem;
        }

        .footer-social li {
          transition: transform 0.3s ease;
        }

        .footer-social li:hover {
          transform: scale(1.1);
        }

        .footer-social a {
          color: white;
        }

        .copyrights {
          color: var(--main-site-color);
          text-align: center;
          font-size: 0.9rem;
        }

        .copyrights span {
          color: #905ff1;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .footer-logo img {
            width: 100px;
          }

          .footer-links {
            gap: 0.75rem;
            font-size: 0.9rem;
          }

          .footer-social {
            font-size: 1.3rem;
          }

          .copyrights {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;

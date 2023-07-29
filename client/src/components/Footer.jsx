import React from "react";
import "./footer.css";
import { AiFillInstagram, AiFillTwitterCircle , AiFillYoutube ,AiFillFacebook} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">MindSketch</div>
      <div className="links">
        <ul className="social-links">
          <li>
            <Link className="insta-icon">
              <AiFillInstagram size={30} />
            </Link>
          </li>
          <li>
            <Link className="fb-icon">
            <BsFacebook size={30} />
            </Link>
          </li>
          <li>
            <Link className="twitter-icon">
            <AiFillTwitterCircle size={30} />
            </Link>
          </li>
          <li>
            <Link className="yt-icon">
            <AiFillYoutube size={30} />
            </Link>
          </li>
        </ul>
      </div>
      <div className="donate">
        <Link className="donate-icon">
          <FaDonate size={30} />
          <span className="don">Donate</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;

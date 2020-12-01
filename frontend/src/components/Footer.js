import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer py-4">
      <div className="container-fluid">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p>
                <b>JABS</b> <span className="tag">v0.1 (alpha)</span>
              </p>
            </div>
            <div className="level-item">
              <Link to="/terms">Terms</Link>
            </div>
            <div className="level-item">
              <Link to="/privacy">Privacy Policy</Link>
            </div>
            <div className="level-item">
              <Link to="/refund">Refund Policy</Link>
            </div>
            <div className="level-item">
              <Link to="/disclaimer">Disclaimer</Link>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              Made with &hearts; by :{" "}
              <a
                href="https://github.com/soumitdas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Soumit Das</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import {FooterLinksList} from "./NewsBlock/FooterLinksList.jsx";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__body">
        <ul className="footer__links">
          <FooterLinksList />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
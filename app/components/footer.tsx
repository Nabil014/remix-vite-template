import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="mt-10 bg-transparent py-8 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="https://res.cloudinary.com/dug5cohaj/image/upload/v1714945513/qg0xzn0ocr0vz9nafhim.png"
            alt="Crypto Ghost Logo"
            className="mr-3 h-8"
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-4 md:mb-0 mr-20">
          <div className="flex space-x-4 text-center text-[#04E6E6]">
            <a href="/about" className="hover:underline font-bold">
              About
            </a>
            <span>/</span>
            <a href="/services" className="hover:underline font-bold">
              Service
            </a>
            <span>/</span>
            <a href="/blog" className="hover:underline font-bold">
              Blog
            </a>
          </div>
          <div className="mt-2 text-center text-sm text-[#04E6E6] font-bold">
            CryptoGhost © 2024. All rights reserved.
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-[#04E6E6] hover:underline">
            <FontAwesomeIcon icon={faGoogle} size="lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#04E6E6] hover:underline">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#04E6E6] hover:underline">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

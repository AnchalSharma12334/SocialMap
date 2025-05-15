import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from './Link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">SocialMap</span>
            </div>
            <p className="mt-4 text-gray-300">
              Find and book the perfect studio space for your creative needs in Delhi.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Studios</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/studios?type=podcast" className="text-gray-300 hover:text-white transition-colors">
                  Podcast Studios
                </Link>
              </li>
              <li>
                <Link to="/studios?type=dance" className="text-gray-300 hover:text-white transition-colors">
                  Dance Studios
                </Link>
              </li>
              <li>
                <Link to="/studios?type=photography" className="text-gray-300 hover:text-white transition-colors">
                  Photography Studios
                </Link>
              </li>
              <li>
                <Link to="/studios?type=video" className="text-gray-300 hover:text-white transition-colors">
                  Video Studios
                </Link>
              </li>
              <li>
                <Link to="/studios?type=music" className="text-gray-300 hover:text-white transition-colors">
                  Music Studios
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-300 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} SocialMap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
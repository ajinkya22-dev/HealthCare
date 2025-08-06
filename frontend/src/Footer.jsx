// Footer.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";


export default function Footer() {
  
  return (
    <div className="w-full bg-[#068e97] text-white pt-8 pb-6 px-4 md:px-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Left Side: Name and copyright */}
        <div className="flex-1 min-w-[220px] mb-10 md:mb-0">
          <div className="text-xl font-semibold mb-3">Healthcare</div>
          <div className="text-sm opacity-80">
            Copyright © 2025 Codecraft Crew<br />
            All Rights Reserved
          </div>
        </div>
        {/* Center Columns */}
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-semibold mb-3">Product</div>
            <ul className="space-y-1 opacity-90 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Case studies</li>
              <li>Reviews</li>
              <li>Updates</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-1 opacity-90 text-sm">
              <li>About</li>
              <li>Contact us</li>
              <li>Careers</li>
              <li>Culture</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Support</div>
            <ul className="space-y-1 opacity-90 text-sm">
              <li>Getting started</li>
              <li>Help center</li>
              <li>Server status</li>
              <li>Report a bug</li>
              <li>Chat support</li>
            </ul>
          </div>
          {/* Social Links */}
          <div>
            <div className="font-semibold mb-3">Follow us</div>
            <ul className="space-y-1 opacity-90 text-sm">
              <li className="flex items-center gap-2">
                <span className=" bg-opacity-10 rounded-full w-6 h-6 flex items-center justify-center">
                  {/*<i className="fab fa-facebook-f" />*/}
                   <FaFacebookF className="text-xl " />
                  
                </span>
                Facebook
              </li>
              <li className="flex items-center gap-2">
                <span className=" bg-opacity-10 rounded-full w-6 h-6 flex items-center justify-center">
                  <FaTwitter className="text-xl " />
                </span>
                Twitter
              </li>
              <li className="flex items-center gap-2">
                <span className=" bg-opacity-10 rounded-full w-6 h-6 flex items-center justify-center">
                  <FaInstagram className="text-xl " />
                </span>
                Instagram
              </li>
              <li className="flex items-center gap-2">
                <span className=" bg-opacity-10 rounded-full w-6 h-6 flex items-center justify-center">
                 <FaLinkedinIn className="text-xl " />
                </span>
                LinkedIn
              </li>
              <li className="flex items-center gap-2">
                <span className=" bg-opacity-10 rounded-full w-6 h-6 flex items-center justify-center">
                  <FaYoutube className="text-xl " />
                </span>
                YouTube
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const Footer = () => {
  // gets the current year dynamically
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-10 pb-6 border-t border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Top Section: Brand, Links, Social --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          
          {/* Left - Brand / Logo */}
          <div className="flex flex-col space-y-2 md:items-start items-center">
            <div className="text-3xl font-extrabold text-teal-400">
                ClockApp
            </div>
            <p className="text-sm text-gray-500">
                Your world, synchronized.
            </p>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex justify-center">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-lg font-medium">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-blue-400 transition duration-300 block text-center md:text-left"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/my-clock" 
                  className="hover:text-blue-400 transition duration-300 block text-center md:text-left"
                >
                  My Clocks
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="hover:text-blue-400 transition duration-300 block text-center md:text-left"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - (Utility Links) */}
          <div className="flex justify-center md:justify-end space-x-5 text-gray-400 text-2xl">
            {/* Example Social Icon */}
            
            <Link to="#" className="hover:text-teal-400 transition">
                <FontAwesomeIcon icon={faGithub} />
            </Link> 
            <Link to="#" className="hover:text-teal-400 transition">
                <FontAwesomeIcon icon={faLinkedin} />
            </Link> <Link to="#" className="hover:text-teal-400 transition">
                <FontAwesomeIcon icon={faTwitter} />
            </Link> 
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} ClockApp. All Rights Reserved. Designed & Developed By NazimUddin.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Link } from "react-router-dom";
import Logo from "../../../src/assets/logo/logo.jpg";

function Navbar() {
  return (
    <header className="px-5 md:w-[90%] mx-auto p-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center justify-center">
          <img className="w-12 h-12 " src={Logo} alt="" />
          <span className="ml-2 font-bold text-gray-800">BL Builders Ltd</span>
        </div>
      </Link>

      {/* Navigasi (tersembunyi di mobile) */}
      <nav className="hidden md:flex space-x-6 text-gray-600">
        <Link to="/" className="hover:text-orange-500 transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:text-orange-500 transition-colors">
          About us
        </Link>
        <Link to="/profile" className="hover:text-orange-500 transition-colors">
          Profile
        </Link>
        <Link to="/land" className="hover:text-orange-500 transition-colors">
          Land/Projects
        </Link>
        <Link
          to="/apartments"
          className="hover:text-orange-500 transition-colors"
        >
          Apartments
        </Link>
        <Link to="/contact" className="hover:text-orange-500 transition-colors">
          Contact us
        </Link>
      </nav>

      {/* Tombol Aksi */}
      {/* <div className="flex items-center space-x-4">
        <Link to="/login">
          <button className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden md:block text-[#fd390e]">Sign in</span>
          </button>
        </Link>
      </div> */}
    </header>
  );
}

export default Navbar;

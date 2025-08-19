import { Link } from "react-router-dom"


function Navbar() {
  return (
    <header className="w-[85%] mx-auto p-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        {/* Menggantikan logo dengan div placeholder */}
        <div className="w-8 h-8 bg-orange-600"></div>
        <span className="ml-2 font-bold text-gray-800">
          Properti Terpercaya
        </span>
      </div>

      {/* Navigasi (tersembunyi di mobile) */}
      <nav className="hidden md:flex space-x-6 text-gray-600">
        <Link href="#" className="hover:text-orange-500 transition-colors">Home</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">About us</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">Profile</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">Land/Projects</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">Apartments</Link>
        <Link href="#" className="hover:text-orange-500 transition-colors">Contact us</Link>
      </nav>

      {/* Tombol Aksi */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:block text-[#fd390e]">Sign in</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition">
              Portfolio Hub
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/all"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              View All Candidates
            </Link>
            <Link
              to="/join"
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Create Your Profile
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
              }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hidden md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/all"
            className="block text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
          >
            View All Candidates
          </Link>
          <Link
            to="/join"
            className="block bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium"
          >
            Create Your Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

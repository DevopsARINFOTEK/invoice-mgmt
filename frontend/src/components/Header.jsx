import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center hover:opacity-90 transition">
          <img
            src="/arinfotek_logo.png"
            alt="AR INFOTEK" 
            className="h-9 md:h-11 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
          <a href="#" className="px-4 py-1.5 text-sm font-bold text-slate-600 rounded-full hover:bg-white hover:text-blue-700">
            Home
          </a>

          <a href="#" className="px-4 py-1.5 text-sm font-bold text-slate-600 rounded-full hover:bg-white hover:text-blue-700">
            Courses
          </a>

          <a href="#" className="px-4 py-1.5 text-sm font-bold text-slate-600 rounded-full hover:bg-white hover:text-blue-700">
            Why Us
          </a>

          <a href="#" className="px-4 py-1.5 text-sm font-bold text-slate-600 rounded-full hover:bg-white hover:text-blue-700">
            Internship
          </a>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex px-5 py-2 rounded-lg font-bold border-2 border-[#1e5aa8] text-[#1e5aa8]">
            Talk to Us
          </button>

          <button className="hidden md:inline-flex px-5 py-2 rounded-lg font-bold bg-linear-to-r from-[#ff891c] to-orange-600 text-white">
            View Courses
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg border border-slate-200"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={toggleMenu}
          ></div>

          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-lg text-[#1e5aa8]">
                MENU
              </h3>

              <button
                onClick={toggleMenu}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 font-semibold">
              <a href="#" onClick={toggleMenu}>Home</a>
              <a href="#" onClick={toggleMenu}>Courses</a>
              <a href="#" onClick={toggleMenu}>Why AR INFOTEK</a>
              <a href="#" onClick={toggleMenu}>Innovation Labs</a>
              <a href="#" onClick={toggleMenu}>Internship</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

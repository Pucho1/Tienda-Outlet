import { ChevronLeft, ChevronRight, LogOut} from 'lucide-react';
import useScrollableNavBar from './useScrollableNavBar';

export function ScrollableNavbar() {

  const {
    activeSection,
    showLeftArrow,
    showRightArrow,
    desktopScrollRef,
    mobileScrollRef,
    handlerOnClickFilter,
    scrollRight,
    scrollLeft,
    handleTouchEnd,
    handleTouchStart,
    categories,
    isAuthenticated,
    handleLogout,
    GoHome,
  } = useScrollableNavBar();

  return (
    <>
      <nav className="top-40 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-full">
            {/* PANTALLAS GRANDES */}
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">

            {/* LOGO */}
            <div className="flex items-center gap-2">
              <div
                onClick={() => GoHome()}
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">OLT</span>
              </div>
              <span className="font-bold text-gray-800 text-lg hidden sm:block">
                Outlet
              </span>
            </div>

            {/* NAVBAR */}
            <div className="hidden lg:flex items-center flex-1 max-w-[55rem] xl:max-w-[65rem] 2xl:max-w-[85rem] mx-4 relative group">
              {/* flecha derecha */}
              {showLeftArrow && (
                <button
                  onClick={() => scrollLeft(desktopScrollRef)}
                  className="absolute left-0 z-10 bg-gradient-to-r from-white to-transparent pl-2 pr-8 py-2 rounded-l-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
                </button>
              )}
              {/* NAVBAR-BTN */}
              <div
                ref={desktopScrollRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth px-8 touch-pan-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categories.map((category, index) => {
                  const id = category.name.toLowerCase().replace(/\s+/g, '-');
                  const isActive = activeSection === id;

                  return (
                    <button
                      key={index}
                      id={id}
                      onClick={() => handlerOnClickFilter(category)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                      }`}
                    >
                      {category.name}
                    </button>

                  );
                })}
              </div>

              {/* Flecha izquierda */}
              {showRightArrow && (
                <button
                  onClick={() => scrollRight(desktopScrollRef)}
                  className="absolute right-0 z-10 bg-gradient-to-l from-white to-transparent pr-2 pl-8 py-2 rounded-r-lg"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
                </button>
              )}
            </div>

            <div className="hidden lg:block w-24"></div>

           {isAuthenticated && (
              <button 
                onClick={() => handleLogout()}
                className='flex ml-4 items-center gap-1 cursor-pointer hover:text-red-600 transition-colors'
              >
                <p>LogOut</p>
                <LogOut />
              </button>
            )}
          </div>

            {/* PANTALLAS PEQUEÑAS */}
          <div className="lg:hidden px-4 pb-3 relative">
            {showLeftArrow && (
              <button
                onClick={() => scrollLeft(mobileScrollRef)}
                className="absolute left-0 z-10 bg-gradient-to-r from-white to-transparent pl-4 pr-6 py-2"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}

            <div
              ref={mobileScrollRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-8 touch-pan-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((category, index) => {
                const id = category.name.toLowerCase().replace(/\s+/g, '-');
                const isActive = activeSection === id;

                return (
                  <button
                    key={index}
                    onClick={() => handlerOnClickFilter(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            {showRightArrow && (
              <button
                onClick={() => scrollRight(mobileScrollRef)}
                className="absolute right-0 top-0 z-10 bg-gradient-to-l from-white to-transparent pr-4 pl-6 py-2"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex flex-col gap-2 mt-16">
              {sections.map((section) => {
                const id = section.toLowerCase().replace(/\s+/g, '-');
                const isActive = activeSection === id;

                return (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {section}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

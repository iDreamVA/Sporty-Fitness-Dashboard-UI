import { NavLink } from 'react-router-dom';
import { User, LayoutDashboard, Radio, Boxes, Languages, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export function Navigation() {
  const { language, toggleLanguage, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: User, label: t.nav.onboarding },
    { path: '/dashboard', icon: LayoutDashboard, label: t.nav.dashboard },
    { path: '/realtime', icon: Radio, label: t.nav.realtime },
    { path: '/sensors', icon: Boxes, label: t.nav.sensors },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-[#00809D] via-[#FF7601] to-[#F3A26D] bg-clip-text text-transparent">
              {t.appTitle}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                      isActive
                        ? 'bg-[#00809D]/20 text-[#00809D] border border-[#00809D]/30'
                        : 'text-gray-600 hover:text-[#00809D] hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium hidden lg:inline">{item.label}</span>
                </NavLink>
              );
            })}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-[#00809D]/20 px-3 lg:px-4 py-2 rounded-lg border border-[#00809D]/30 hover:bg-[#00809D]/30 transition-colors ml-2"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4 text-[#00809D]" />
              <span className="text-[#00809D] text-sm font-semibold hidden lg:inline">
                {language === 'en' ? 'ไทย' : 'ENG'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#00809D]/20 text-[#00809D] border border-[#00809D]/30'
                          : 'text-gray-600 hover:text-[#00809D] hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}

              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 bg-[#00809D]/20 px-4 py-3 rounded-lg border border-[#00809D]/30 hover:bg-[#00809D]/30 transition-colors w-full mt-2"
              >
                <Languages className="w-5 h-5 text-[#00809D]" />
                <span className="text-[#00809D] font-semibold">
                  {language === 'en' ? 'ไทย' : 'ENG'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

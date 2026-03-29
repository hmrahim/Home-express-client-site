import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiSettings,
  FiInfo,
  FiGrid,
  FiPhone,
  FiLayout,
} from "react-icons/fi";

const SettingsLayout = () => {
  const [open, setOpen] = useState(true);

  const menu =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-medium transition-all duration-300 hover:bg-gray-100";

  const active =
    "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow";

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div
        className={`bg-white border-r shadow-sm transition-all duration-500 ease-in-out
        ${open ? "w-64" : "w-20"} flex flex-col`}
      >

        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b">

          {open && (
            <h2 className="text-xl font-bold text-gray-800 tracking-wide">
              Settings
            </h2>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="text-xl text-gray-600 hover:text-black"
          >
            <FiMenu />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 p-4 space-y-2">

          <NavLink
            to="/dashboard/settings/general"
            className={({ isActive }) =>
              `${menu} ${isActive ? active : ""}`
            }
          >
            <FiSettings size={18} />
            {open && "General Settings"}
          </NavLink>

          <p className="text-xs text-gray-400 uppercase mt-6 mb-2 px-2">
            {open && "Pages"}
          </p>

          <NavLink
            to="/dashboard/settings/home-settings"
            className={({ isActive }) =>
              `${menu} ${isActive ? active : ""}`
            }
          >
            <FiHome size={18} />
            {open && "Home Page"}
          </NavLink>

          <NavLink
            to="pages/about"
            className={({ isActive }) =>
              `${menu} ${isActive ? active : ""}`
            }
          >
            <FiInfo size={18} />
            {open && "About Page"}
          </NavLink>

          <NavLink
            to="pages/services"
            className={({ isActive }) =>
              `${menu} ${isActive ? active : ""}`
            }
          >
            <FiGrid size={18} />
            {open && "Services"}
          </NavLink>

          <NavLink
            to="pages/contact"
            className={({ isActive }) =>
              `${menu} ${isActive ? active : ""}`
            }
          >
            <FiPhone size={18} />
            {open && "Contact"}
          </NavLink>

          <p className="text-xs text-gray-400 uppercase mt-6 mb-2 px-2">
            {open && "UI"}
          </p>

          <NavLink
            to="ui/header"
            className={({ isActive }) =>
              `${menu} ${isActive ? active : ""}`
            }
          >
            <FiLayout size={18} />
            {open && "Header"}
          </NavLink>

          <NavLink
            to="ui/footer"
            className={({ isActive }) =>
              `${menu} ${isActive ? active : ""}`
            }
          >
            <FiLayout size={18} />
            {open && "Footer"}
          </NavLink>
        </div>

        {/* Footer */}
        {open && (
          <div className="p-4 border-t text-sm text-gray-400">
            © 2026 Website Admin
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-700">
            Website Settings
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-500"></div>
          </div>
        </div>

        
        <div className="p-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
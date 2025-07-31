import React from "react";
import { NavLink } from "react-router"; // ✅ Fixed Import
import { mobileNavigation } from "../constants/Navigation";

function MobileNavigation() {
  return (
    <section className="lg:hidden h-14 bg-neutral-600 fixed bottom-0 w-full z-10 opacity-70 backdrop-blur-md">
      <div className="flex items-center justify-between h-full text-neutral-300">
        {mobileNavigation.map((nav) => (
          <NavLink
            key={nav.label + "-mobilenavigation"}
            to={nav.href}
            className={({ isActive }) =>
              `px-3 flex h-full items-center flex-col justify-center transition-all ${
                isActive ? "text-white" : "hover:text-gray-200"
              }`
            }
            aria-label={nav.label}
          >
            <div className="text-2xl">{nav.icon}</div> {/* ✅ Display Icon */}
            <p className="text-xs">{nav.label}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default MobileNavigation;

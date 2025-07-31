import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="mt-auto text-center bg-neutral-600 opacity-45  bottom-0 w-full text-neutral-300 py-2 h-fit ">
      <div className="flex items-center justify-center gap-4">
        <Link to="/" className="hover:text-white  hover:cursor-pointer">
          About
        </Link>
        <Link className="hover:text-white  hover:cursor-pointer" to="/">
          Contact
        </Link>
      </div>
      <p className="text-sm hover: text-white">Created by our Team</p>
    </footer>
  );
}

export default Footer;

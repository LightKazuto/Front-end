import React from "react";
import Image from "next/image";
import MM from "../../public/MM.png";

function Navbar() {




  return (
    <div className="w-full bg-white shadow-md">
      <nav className="grid grid-cols-3 items-center p-4 pl-16 gap-4">
        <a href="#" className="flex items-center col-start-1">
          <Image
            src={MM}
            alt="Logo"
            width={200}
            height={50}
            className="object-contain"
          />
        </a>

        <div className="relative col-start-2 col-span-1 text-gray-500">
          <svg
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 20 16">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
              fill="currentColor"
            />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full w-full py-2 px-10 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-end col-start-3">
          <ul className="flex space-x-2 text-gray-700">
            <li>
              <a href="#login" >
                <button className="font-medium bg-blue-500 py-2 w-24 rounded-xl text-white hover:border-blue-500 hover:bg-white hover:text-blue-500 hover:border border-blue-500">Login</button>
              </a>
            </li>

            <li>
              <a href="#register">
                <button className="font-medium border border-blue-500 py-2 w-24 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white">Register</button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

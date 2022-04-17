import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";

export default function Header({ setSearchQuery }) {
  const [menuSmall, setMeunSmall] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 200) {
          setMeunSmall(true);
        } else {
          setMeunSmall(false);
        }
      });
    }
  }, []);

  const onChange = (e) => {
    console.log();
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={`fixed z-20 w-full transition-all duration-200 ease-in-out ${
        menuSmall ? "h-16" : " h-28"
      } shadow-md bg-white items-center justify-center flex`}
    >
      <div className="rounded-full flex flex-row  mx-4 my-1 py-2 px-4 justify-center items-center w-full">
        <img className="h-12 lg:mx-10" src={logo} alt="" />

        <input
          placeholder="search..."
          type="text"
          className="w-full lg:w-8/12 p-2 rounded-3xl bg-stone-100 px-4 mx-2"
          onChange={onChange}
        />
        <a
          href=""
          className="rounded-3xl bg-slate-400 px-4 py-2 lg:mx-8 text-white hover:bg-slate-500"
        >
          Home
        </a>
      </div>
    </div>
  );
}

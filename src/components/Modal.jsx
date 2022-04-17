import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ data, setModalOpen }) {
  return (
    <div className="fixed inset-0 bg-gray-600 backdrop-blur bg-opacity-50 overflow-y-auto h-full w-full z-10">
      <div class="relative mt-10 bottom-28 top-20 mx-auto p-5 border w-10/12 lg:w-8/12 shadow-lg rounded-md bg-white">
        <div
          className="flex items-center justify-start text-2xl px-4 mb-4 hover:cursor-pointer"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div class="mt-3 text-center">
          <h3 class="text-2xl font-bold leading-6 mb-8 text-gray-900">
            {data.name}
          </h3>
          <div className="flex flex-col lg:flex-row-reverse px-8 mt-4">
            <div className="w-full lg:w-4/12 flex items-start justify-end">
              <img
                src={data.image_url}
                className="object-cover h-72 rounded-2xl"
                alt=""
              />
            </div>
            <div className="w-full lg:w-8/12 flex flex-col items-start justify-center py-4">
              <p className="text-sm text-zinc-600 text-left">
                {data.description}
              </p>
              <div className="w-full text-left flex flex-row items-center justify-start my-4">
                <span className="mr-2 font-semibold">price:</span>
                <span className=" mx-4 text-2xl text-teal-800">
                  {data.price}
                </span>
              </div>
              <div className="w-full flex flex-row flex-wrap items-center justify-start">
                <span className="mr-2 font-semibold"> tags:</span>
                {data.tags.split(",").map((item) => (
                  <div className="bg-zinc-200 hover:bg-zinc-300 cursor-pointer p-2 m-1 text-zinc-800 rounded-2xl text-xs">
                    {item}
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-row flex-wrap items-center justify-start mt-8">
                <a
                  href={data.url}
                  target="_blank"
                  className="p-4 rounded-full bg-zinc-700 text-white mb-1"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon className="mx-2" icon={faGlobe} />
                  Visit Website
                </a>

                <a
                  href="#"
                  className="p-4 rounded-full bg-teal-700 text-white mx-2 mb-1"
                >
                  <FontAwesomeIcon className="mx-2" icon={faCartShopping} />
                  ‌Buy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

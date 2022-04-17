import React from "react";
import loadingSVG from "../images/loading.svg";

export default function Loading({ className }) {
  return (
    <div className="w-full flex flex-row items-center justify-start">
      <img className="mx-auto" src={loadingSVG} alt="" />
    </div>
  );
}

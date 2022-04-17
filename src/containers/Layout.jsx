import React, { useEffect, useState } from "react";
import Header from "./Header";
import MainPage from "./MainPage";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <div className="w-full px-2 pt-32">
        <MainPage searchQuery={searchQuery} />
      </div>
    </>
  );
}

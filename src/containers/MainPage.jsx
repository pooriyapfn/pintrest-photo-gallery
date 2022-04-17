import React, { useEffect, useState } from "react";
import Boards from "./Boards";
import Modal from "../components/Modal";

export default function MainPage({ searchQuery }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    // console.log(modalData);
  }, [modalData]);

  const handleClickModal = (item) => {
    if (!modalOpen) {
      setModalOpen(true);
      setModalData(item);
    }
  };
  return (
    <>
      {modalOpen && <Modal data={modalData} setModalOpen={setModalOpen} />}
      <div className="w-full rounded-3xl h-full flex flex-col items-center justify-center px-2 py-10">
        <h1 className="mt-4  mb-10 text-center font-bold text-4xl">
          Photo Gallery
        </h1>
        <Boards handleClick={handleClickModal} searchQuery={searchQuery} />
      </div>
    </>
  );
}

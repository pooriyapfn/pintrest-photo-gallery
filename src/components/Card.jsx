import React, { useEffect, useState } from "react";

export default function Card({ item }) {
  const [aspect, setaspect] = useState(0);
  const [size, setSize] = useState(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    let img = new Image();
    img.src = item.image_url;
    img.onload = () => {
      //   console.log(img.height / img.width);
      setHeight(parseInt((img.height * 250) / img.width));
      if (img.height / img.width < 1.2) {
        setSize("hrow-1");
      } else if (img.height / img.width < 1.3) {
        setSize("hrow-2");
      } else if (img.height / img.width < 1.4) {
        setSize("hrow-3");
      } else if (img.height / img.width < 1.5) {
        setSize("hrow-4");
      } else {
        setSize("hrow-5");
      }
    };
  }, []);

  return size ? (
    <div
      className={`relative overflow-hidden mx-2 ${size} transition-all duration-200 hover:scale-105 group`}
      style={{
        ...styles.card,
      }}
    >
      <img
        src={item.image_url}
        className="w-full object-cover border rounded-3xl border-stone-400 border-solid"
        alt=""
        loading="auto"
        // style={{ maxHeight: `340px` }}
      />

      <p className="text-ellipsis px-1 font-semibold text-base leading-tight mt-2">
        {item.name}
      </p>
      <div className=" bg-yellow-200 w-5 p-2 absolute top-1 left-2 opacity-0 group-hover:opacity-100">
        {item.price}
      </div>
    </div>
  ) : (
    <div
      className={`rounded-3xl overflow-hidden mx-2 small bg-gray-300`}
      style={{
        ...styles.card,
      }}
    ></div>
  );
}

const styles = {
  card: {
    margin: "15px 10px",
    padding: 0,
    // borderRadius: "16px",
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 33",
  },
  large: {
    gridRowEnd: "span 45",
  },
};

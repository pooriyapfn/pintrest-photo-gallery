import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

export default function Card({ item, i }) {
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
        setSize("flxh-1");
      } else if (img.height / img.width < 1.3) {
        setSize("flxh-2");
      } else if (img.height / img.width < 1.4) {
        setSize("flxh-3");
      } else if (img.height / img.width < 1.5) {
        setSize("flxh-4");
      } else {
        setSize("flxh-5");
      }
    };
  }, []);

  return size ? (
    <div
      className={`relative w-full overflow-hidden mx-2 mb-2 ${size} transition-all duration-200 hover:scale-105 group hover:cursor-pointer`}
    >
      <img
        src={item.image_url}
        className="w-full object-cover border rounded-3xl border-stone-300 border-solid"
        alt=""
        loading="auto"
        // style={{ maxHeight: `340px` }}
      />

      <p className="text-ellipsis px-1 font-semibold text-base leading-tight mt-2">
        {item.name}
      </p>
      <div className=" bg-yellow-200 rounded-full px-2 absolute top-2 left-2 opacity-0 group-hover:opacity-100">
        {item.price}
      </div>
    </div>
  ) : (
    <ContentLoader
      speed={2}
      width={350}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="6" y="420" rx="2" ry="2" width="232" height="10" />
      <rect x="6" y="2" rx="2" ry="2" width="295" height="400" />
      <rect x="6" y="441" rx="0" ry="0" width="206" height="10" />
    </ContentLoader>
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

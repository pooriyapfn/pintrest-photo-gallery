import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import FlexCard from "../components/FlexCard";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { InView } from "react-intersection-observer";
import InfiniteScroll from "react-infinite-scroll-component";
import StackGrid from "react-stack-grid";
import PinterestGrid from "rc-pinterest-grid";
import Loading from "../components/Loading";

export default function Boards({ handleClick, searchQuery }) {
  const [data, setData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [entryY, setEntryY] = useState(1);
  const [searchResult, setSearchResult] = useState({ items: [] });
  const [searchActive, setSearchActive] = useState(false);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const getItems = (page) => {
    console.log("in this function");
    axios
      .get(`http://xoosha.com/ws/1/test.php?offset=${page}`)
      .then(function (response) {
        // handle success
        setData({ items: [...data.items, ...response.data] });

        // const filteredCountries = countriesList.filter(country => {
        //   return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        // });
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const handleInView = (inView, entry) => {
    console.log("inview : ", inView, entry.boundingClientRect.y);
    console.log(entry[0]);
    if (inView && entry.boundingClientRect.y > entryY) {
      console.log("fired");
      setLoading(true);
      setPage(page + 60);
      console.log("page is : ", page);
      getItems(page);
    }
    setEntryY(entry.boundingClientRect.y);
  };

  const fetchData = () => {
    console.log("fetch...!");
    if (!searchActive) {
      setLoading(true);
      setPage(page + 60);
      console.log("page is : ", page);
      getItems(page);
    }
  };

  useEffect(() => {
    if (!searchActive) {
      getItems(page);
    }
  }, [searchActive]);

  useEffect(() => {
    getItems(page);
  }, []);

  useEffect(() => {
    console.log("in:", searchQuery);
    if (searchQuery == "") {
      setSearchActive(false);
      setSearchResult({ items: [] });
    } else {
      setSearchActive(true);
      setLoading(true);
    }
    const newQuery = data.items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    });
    console.log("QQQQQQL", newQuery);
    setSearchResult({ items: newQuery });
    setLoading(false);
  }, [searchQuery]);

  // self-defined break points
  const breakPoints = [
    {
      minScreenWidth: 0,
      maxScreenWidth: 425,
      columns: 1,
      columnWidth: 300,
    },
    {
      minScreenWidth: 426,
      maxScreenWidth: 768,
      columns: 2,
      columnWidth: 300,
    },
    {
      minScreenWidth: 768,
      maxScreenWidth: 1024,
      columns: 3,
      columnWidth: 250,
    },
    {
      minScreenWidth: 1024,
      maxScreenWidth: Infinity,
      columns: 4,
      columnWidth: 250,
    },
  ];

  return (
    <>
      {/* <div className="" style={styles.pin_container}>
        {data && data.items.map((item, i) => <Card size="small" item={item} />)}
        {data && (
          <InView onChange={handleInView}>
            <h2>{`Header inside viewport ${inView}.`}</h2>
          </InView>
        )}
      </div> */}

      <InfiniteScroll
        dataLength={data.items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={!searchActive && <Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="w-full flex flex-col flex-wrap p-8">
          <PinterestGrid
            columns={4} // how many columns in one row
            columnWidth={250} // width of each block
            gutterWidth={20} // horizontal gutter between each block
            gutterHeight={10} // vertical gutter between each block
            responsive={{ customBreakPoints: breakPoints }}
          >
            {!searchActive
              ? data.items.map((item, i) => (
                  <div onClick={() => handleClick(item)}>
                    <FlexCard key={i} size="small" item={item} i={i} />
                  </div>
                ))
              : searchResult.items.map((item, i) => (
                  <div onClick={() => handleClick(item)}>
                    <FlexCard key={i} size="small" item={item} i={i} />
                  </div>
                ))}
          </PinterestGrid>
        </div>
      </InfiniteScroll>
    </>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "10px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    justifyContent: "center",
    // backgroundColor: "black",
  },
};

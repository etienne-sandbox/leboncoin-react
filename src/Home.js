import React from "react";
import ky from "ky";
import { PagesButtons } from "./PagesButtons";
import { Link, Redirect } from "react-router-dom";

const ITEMS_PER_PAGE = 4;

export const Home = ({ currentPage }) => {
  console.log(currentPage);

  // const [currentPage, setCurrentPage] = React.useState(1);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let canceled = false;
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    ky.get(
      `https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=${skip}&limit=${ITEMS_PER_PAGE}`
    )
      .then(res => res.json())
      .then(data => {
        if (canceled === false) {
          setData(data);
        }
      });
    return () => {
      canceled = true;
    };
  }, [currentPage]);

  if (data === null) {
    return <div>Loading...</div>;
  }

  const lastPageNumber = Math.floor(data.count / ITEMS_PER_PAGE);
  if (currentPage > lastPageNumber) {
    return <Redirect to={`/?page=${lastPageNumber}`} />;
  }

  return (
    <div>
      {data.offers.map(offer => {
        return <h2 key={offer._id}>{offer.title}</h2>;
      })}
      <PagesButtons
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalCount={data.count}
        renderPage={page => {
          return (
            <Link
              to={`/?page=${page}`}
              style={{
                background: page === currentPage ? "red" : "none",
                display: "inline-block",
                margin: 5,
                padding: 5
              }}
              key={page}
            >
              {page}
            </Link>
          );
        }}
      />
    </div>
  );
};

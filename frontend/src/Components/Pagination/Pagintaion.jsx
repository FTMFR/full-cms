import React, { useEffect, useState } from "react";
import "./pagination.css";
import { Link, useParams } from "react-router-dom";

const Pagintaion = ({ items, itemCount, pathname, setShowCourses }) => {
  const [pageCount, setPageCount] = useState(0);
  // const [click, setClick] = useState(false);
  const [clickNum, setClickNum] = useState(0);
  const { page } = useParams();

  const clickHandler = (index) => {
    // setClickNum(index);
    console.log(clickNum);
  };

  useEffect(() => {
    let endIndex = itemCount * page;
    let startIndex = endIndex - itemCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShowCourses(paginatedItems);
    let pageNumbers = Math.ceil(items.length / itemCount);
    setPageCount(pageNumbers);
    // console.log(pageNumbers, pageCount);
  }, [page]);

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {/* <li className="courses__pagination-item"> 
         {clickNum !== 0 && (
            <Link
              to={`${pathname}/${clickNum + 1}`}
              className="courses__pagination-link"
              onClick={() => clickHandler(clickNum - 1)}
            >
              <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
            </Link>
          )}
        </li> */}

        {Array(pageCount)
          .fill(0)
          .map((item, index) => (
            <li className="courses__pagination-item">
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link courses__pagination-link--active"
                  onClick={() => clickHandler(index)}
                >
                  {index + 1}
                </Link>
              ) : (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="courses__pagination-link"
                  onClick={() => clickHandler(index)}
                >
                  {index + 1}
                </Link>
              )}
            </li>
          ))}

        {/* <li className="courses__pagination-item">
          {clickNum + 1 !== pageCount && (
            <Link
              to={`${pathname}/${clickNum + 1}`}
              className="courses__pagination-link"
              onClick={() => clickHandler(clickNum + 1)}
            >
              <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
            </Link>
          )}
        </li> */}
      </ul>
    </div>
  );
};

export default Pagintaion;

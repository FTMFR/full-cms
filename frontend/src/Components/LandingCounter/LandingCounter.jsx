import React, { useEffect, useState } from "react";

const LandingCounter = ({ count }) => {
  const [courseCounter, setCourseCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCourseCounter((prevCount) => prevCount + 1);
    }, 10);

    if (courseCounter === count) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [courseCounter, count]);

  return <span className="landing-status__count">{courseCounter}</span>;
};

export default LandingCounter;

"use client";

import React, { useEffect, useState } from "react";

type Props = {
  time: number;
};

function CountDown({ time }: Props) {
  const [count, setCount] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return <div>{count}</div>;
}

export default CountDown;

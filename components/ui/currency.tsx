"use client";
import { useEffect, useState } from "react";

export const Formatter = new Intl.NumberFormat("vi-VN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
  style: "currency",
  currency: "VND",
});

interface CurrencyProps {
  value: string | number;
  className?: string;
}

const Currency: React.FC<CurrencyProps> = ({ value, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className={`font-semibold w-fit ${className}`}>{Formatter.format(Number(value))}</div>
  );
};

export default Currency;

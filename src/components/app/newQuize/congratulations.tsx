"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

export default function Congratulations() {
  const { width, height } = useWindowSize();

  return (
    <div className="relative flex flex-col items-center justify-center mt-10">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
      />
      <h2 className="text-3xl font-bold text-green-700 z-10">
        🎉 Congratulations! 🎉
      </h2>
      <p className="text-lg text-gray-600 mt-2 z-10">
        You’ve completed the quiz!
      </p>
    </div>
  );
}

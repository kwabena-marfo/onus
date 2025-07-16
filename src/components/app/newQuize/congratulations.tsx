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
    <>
      {/* Confetti spans full screen from the top */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 50 }}
      />

      {/* Message appears after confetti */}
      <div className="flex flex-col items-center justify-center mt-20 z-50 relative">
        <h2 className="text-3xl font-bold text-green-700">
          🎉 Congratulations! 🎉
        </h2>
        <p className="text-lg text-gray-600 mt-2">You’ve completed the quiz!</p>
      </div>
    </>
  );
}

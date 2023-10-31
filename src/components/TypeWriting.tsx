"use client";

import { useEffect, useState } from "react";

const TypeWriting = ({ text }: { text: string }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (currentIndex <= text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50);
    }
    // else if (infinite) { // ADD THIS CHECK
    //   setCurrentIndex(0);
    //   setCurrentText('');
    // }

    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  return (
    <p className="relative w-[max-content] whitespace-pre-wrap text-xl">
      {currentText}
    </p>
  );
};

export default TypeWriting;

import React, { useEffect, useState } from "react";

function Slider() {

  const slides = [
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prev) =>
        (prev + 1) % slides.length
      );

    }, 3000);

    return () => clearInterval(interval);

  }, [slides.length]);

  return (

    <div className="slider">

      <img
        src={slides[currentSlide]}
        alt="banner"
      />

    </div>

  );
}

export default Slider;
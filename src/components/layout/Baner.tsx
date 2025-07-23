import { useEffect, useState } from "react";

const banners = [
  "https://i.pinimg.com/originals/df/30/cb/df30cb36898b47637df11655015350dc.png",
  "https://im.uniqlo.com/global-cms/spa/res140e0d36854faaeb7edff1a21493ce89fr.jpg",
  "https://th.bing.com/th/id/R.2232008e8eeaddc63c57e968faa3e24e?rik=KVQLXjWdxuhfmw&pid=ImgRaw&r=0"
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % banners.length
    );
  };

  return (
    <div className="banner-carousel" style={{ position: "relative", maxHeight: "500px", marginBottom: 24 }}>
      {banners.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Banner ${index + 1}`}
          style={{
            display: index === currentIndex ? "block" : "none",
            width: "100%",
            height: "500px",
            objectFit: "cover",
            borderRadius: "10px",
            transition: "opacity 0.5s"
          }}
        />
      ))}
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.3)",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          color: "#fff",
          fontSize: 24,
          cursor: "pointer"
        }}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.3)",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          color: "#fff",
          fontSize: 24,
          cursor: "pointer"
        }}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
};

export default Banner;
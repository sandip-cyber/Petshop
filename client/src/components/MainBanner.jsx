import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images'

const bannerData = [
  {
    desktopSrc: images.mainbanner,
    mobileSrc: images.mainbannersm,
    link: '/product',
    alt: 'DOG FOOD',
  },
  {
    desktopSrc: images.mainbanner2,
    mobileSrc: images.mainbanner2, // Use mainbanner2 for both if no mobile version exists
    link: '/product',
    alt: 'DOG FOOD',
  },
  {
    desktopSrc: images.dog,
    mobileSrc: images.dog, // Use dog for both if no mobile version exists
    link: '/product',
    alt: 'DOG FOOD',
  },
];

const MainBanner = () => {
  // State to keep track of the current active slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to manage if the slider is hovered (to pause autoplay)
  const [isHovered, setIsHovered] = useState(false);

  // Function to go to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    let sliderInterval;
    // Start autoplay only if not hovered and there's more than one slide
    if (!isHovered && bannerData.length > 1) {
      sliderInterval = setInterval(() => {
        goToNext();
      }, 3000); // Auto-slide every 3 seconds
    }

    // Cleanup function to clear the interval when the component unmounts
    // or when dependencies (isHovered, currentIndex) change.
    return () => clearInterval(sliderInterval);
  }, [isHovered, currentIndex]); // Re-run effect if current slide or hover state changes

  return (
    <>
      {/* Main slider container with ID and hover events */}
      <div
        className="relative w-full h-105 overflow-hidden rounded-lg "
        onMouseEnter={() => setIsHovered(true)} // Pause autoplay on hover
        onMouseLeave={() => setIsHovered(false)} // Resume autoplay when mouse leaves
        id="slider" // Using your specified ID
      >
        {/* Container for the slider content, applies the sliding transform */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Slide animation
        >
          {bannerData.map((banner, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              {/* Link wrapper for the banner image */}
              <Link to={banner.link} className="block">
                {/* Desktop banner image */}
                <img
                  src={banner.desktopSrc}
                  alt={banner.alt}
                  className="w-full h-auto hidden md:block rounded-lg" // Hidden on mobile, shown on desktop
                />
                {/* Mobile banner image */}
                <img
                  src={banner.mobileSrc}
                  alt={banner.alt}
                  className="w-full h-auto md:hidden rounded-lg" // Hidden on desktop, shown on mobile
                />
              </Link>
            </div>
          ))}
        </div>

        

        {/* Dynamic Dot indicators */}
        <div className="flex items-center justify-center space-x-2 p-2" id="dot-indicators">
          {bannerData.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300
                ${currentIndex === index? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainBanner;
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import imageBuilder from '@/utils/imageBuilder';
import Cta from '../Cta';
import { memo } from 'react';

const ServicesCarousel = memo(({ title, services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const nextService = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.touches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      nextService();
      setTouchStartX(null);
      setIsDragging(false);
    } else if (touchStartX - touchEndX < -50) {
      prevService();
      setTouchStartX(null);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
    setIsDragging(false);
  };

  const currentService = useMemo(() => services[currentIndex], [currentIndex, services]);

  return (
    <div className="flex flex-col justify-center items-center services-carousel text-gray-200">
      <h2 className="text-5xl p-5">{title}</h2>
      <div
        className="relative w-4/5 flex justify-center items-center transition-all duration-500 ease-in-out transform"
        style={{ transform: isDragging ? 'translateX(0)' : 'translateX(0)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col justify-center items-center service-card border border-purple-800 rounded-lg shadow-md p-4 gap-y-3 bg-[#b53fe479]">
          <Image
            src={imageBuilder(currentService.image, 500, 500, 'png')}
            alt={currentService.title}
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
          <h3 className="text-4xl font-bold">{currentService.title}</h3>
          <p className='w-3/5 text-center'>{currentService.description}</p>
          {currentService.cta && <Cta {...currentService.cta} />}
        </div>
        {services.length > 1 && (
          <>
            <button
              onClick={prevService}
              className="absolute -left-2 top-1/2 transform leading-none -translate-y-1/2 bg-white text-3xl p-2 rounded-full shadow-md"
            >
              ‹
            </button>
            <button
              onClick={nextService}
              className="absolute -right-2 top-1/2 transform leading-none -translate-y-1/2 bg-white text-3xl p-2 rounded-full shadow-md"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
});

ServicesCarousel.displayName = "ServicesCarousel";
export default ServicesCarousel;

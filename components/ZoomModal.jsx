import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';

const ZoomImage = memo(({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rect, setRect] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the device is a mobile device
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i));
    setIsMobile(mobile);
  }, []);

  const handleMouseEnter = (e) => {
    if (isMobile) return;
    const elementRect = e.currentTarget.getBoundingClientRect();
    setRect({
      width: elementRect.width,
      height: elementRect.height,
      top: elementRect.top,
      left: elementRect.left,
    });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setPosition({ x: offsetX, y: offsetY });
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    setPosition({ x: offsetX, y: offsetY });
  };

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    const elementRect = e.currentTarget.getBoundingClientRect();
    setRect({
      width: elementRect.width,
      height: elementRect.height,
      top: elementRect.top,
      left: elementRect.left,
    });
    setIsZoomed(true);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsZoomed(false);
  };

  return (
    <div className="bg-white p-4 w-fit h-fit">
      <div className="relative w-64 h-64">
        <div
          className="relative w-full h-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsZoomed(false)}
        >
          <Image src={src} alt={alt} layout="fill" className="object-contain" />
        </div>
        {isZoomed && (
          <>
            <div
              className="fixed bg-white bg-opacity-75 p-2 border border-gray-300 shadow-lg z-50"
              style={{
                width: '310px',
                height: '350px',
                top: `calc(${Math.max(
                  0,
                  Math.min(position.y + rect.top - 13, window.innerHeight - rect.height)
                )}px)`,
                left: `calc(${Math.max(
                  0,
                  Math.min(position.x + rect.left - 12, window.innerWidth - rect.width)
                )}px)`,
                background: `url(${src}) no-repeat`,
                backgroundSize: `${rect.width * 2}px ${rect.height * 2}px`,
                backgroundPosition: `${-position.x * 2}px ${-position.y * 2}px`,
                backgroundColor: "white"
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => setIsZoomed(false)}
            />
            <p
              className="text-center m-2 text-red-600 font-semibold backdrop-blur-[3px] z-50 p-2 rounded-3xl fixed pointer-events-none"
              style={{
                top: `calc(${Math.max(
                  0,
                  Math.min(position.y + rect.top - 13, window.innerHeight - rect.height)
                )}px)`,
                left: `calc(${Math.max(
                  0,
                  Math.min(position.x + rect.left - 12, window.innerWidth - rect.width)
                )}px)`,
              }}
            >
              clique para sair do modo de zoom
            </p>
          </>
        )}
      </div>
    </div>
  );
});

ZoomImage.displayName = "ZoomImage";
export default ZoomImage;

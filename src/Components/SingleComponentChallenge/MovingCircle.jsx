import React, { useEffect, useRef } from 'react';

const MouseFollower = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (circleRef.current) {
        circleRef.current.style.left = `${e.clientX - 15}px`;
        circleRef.current.style.top = `${e.clientY - 15}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100">
      <div
        ref={circleRef}
        className="absolute bg-blue-500 rounded-full transition-all duration-75"
        style={{
          width: '30px',
          height: '30px',
          position: 'absolute',
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  );
};

export default MouseFollower;

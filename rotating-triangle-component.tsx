import React, { useState, useEffect } from 'react';

const RotatingTriangle = () => {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let animationFrame;
    if (isAnimating) {
      const animate = () => {
        setRotation((prevRotation) => (prevRotation + 1) % 360);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <svg width="200" height="200" viewBox="-100 -100 200 200">
        <polygon
          points="0,-80 69.28,40 -69.28,40"
          fill="purple"
          stroke="black"
          strokeWidth="2"
          transform={`rotate(${rotation})`}
        />
      </svg>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={toggleAnimation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isAnimating ? 'Stop Rotation' : 'Start Rotation'}
        </button>
        <input
          type="range"
          min="0"
          max="359"
          value={rotation}
          onChange={(e) => setRotation(parseInt(e.target.value))}
          className="w-64"
        />
        <span className="text-lg font-semibold">{rotation}°</span>
      </div>
    </div>
  );
};

export default RotatingTriangle;

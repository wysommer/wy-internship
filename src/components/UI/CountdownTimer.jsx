import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiryDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (!expiryDate) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiryDate).getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setTimeRemaining("Expired");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate) return null;

  return (
    <div className="de_countdown">
      {timeRemaining}
    </div>
  );
};

export default CountdownTimer; 
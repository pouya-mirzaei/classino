import { useState, useEffect } from 'react';

const useCountDownTimer = (endPoint) => {
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    delta: 0,
  });
  const final = new Date(endPoint).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const delta = final - now;
      if (delta < 0) {
        clearInterval(interval);
      }

      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((delta % (1000 * 60)) / 1000);

      setTimer({
        days,
        hours,
        minutes,
        seconds,
        delta,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [final]);

  return timer;
};

export default useCountDownTimer;

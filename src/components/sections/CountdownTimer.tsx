import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

// Target: Wednesday, 7 October 2026 09:00:00 GMT
const TARGET_DATE = new Date('2026-10-07T09:00:00Z').getTime();

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm" aria-hidden="true">
        {['DAYS', 'HOURS', 'MINS', 'SECS'].map((unit) => (
          <div key={unit} className="bg-isap-navy-dark/70 border border-white/10 rounded-lg p-2.5 text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-isap-gold">--</div>
            <div className="text-[10px] text-isap-steel font-medium tracking-wider mt-0.5">{unit}</div>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-isap-gold/20 border border-isap-gold text-isap-gold font-semibold text-sm">
        <span className="w-2 h-2 rounded-full bg-isap-gold animate-ping"></span>
        <span>ISAP Forum 2026 is Live in Session!</span>
      </div>
    );
  }

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  return (
    <div 
      className="inline-block"
      role="timer"
      aria-label={`Countdown to ISAP Forum 2026: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
    >
      <div className="text-xs font-semibold text-isap-steel/90 uppercase tracking-wider mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-isap-gold animate-pulse"></span>
        <span>Countdown to Wednesday, 7 October 2026</span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="bg-isap-navy-dark/80 backdrop-blur border border-white/15 rounded-lg p-2.5 sm:p-3 text-center shadow-md group hover:border-isap-gold/50 transition-colors"
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-isap-gold leading-none tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[9px] sm:text-[10px] text-isap-steel font-medium tracking-wider uppercase mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

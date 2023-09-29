"use client";

import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { Countdown } from "react-daisyui";

const TIMER_DELAY = 500;

export const Counter = ({ ms }: { ms: number }) => {
  const [x, setX] = useState<null | number>(null);
  const [currentMs, setMs] = useState(ms);

  const timer = useInterval(() => {
    setMs((current) => {
      const next = current - TIMER_DELAY;

      if (next < 0) {
        timer.stop();
        return 0;
      }

      return next;
    });
  }, TIMER_DELAY);

  const days = Math.floor(currentMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((currentMs / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((currentMs / (1000 * 60)) % 60);
  const secs = Math.floor((currentMs / 1000) % 60);

  useEffect(() => {
    setX(window.innerWidth / 2 - 300 / 2);
    timer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {x && ms === 0 && (
        <ReactConfetti
          className="absolute inset-0 w-full h-full z-10"
          confettiSource={{
            w: 300,
            h: 0,
            y: 0,
            x,
          }}
          initialVelocityX={10}
        />
      )}

      <section className="flex gap-3 md:gap-6">
        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-pixelify"
            value={days}
          />
          <h3 className="uppercase font-semibold text-accent text-xs">Days</h3>
        </section>

        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-pixelify"
            value={hours}
          />
          <h3 className="uppercase font-semibold text-accent text-xs">Hours</h3>
        </section>

        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-pixelify"
            value={mins}
          />
          <h3 className="uppercase font-semibold text-accent text-xs">
            Minutes
          </h3>
        </section>

        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-pixelify"
            value={secs}
          />
          <h3 className="uppercase font-semibold text-accent text-xs">
            Seconds
          </h3>
        </section>
      </section>
    </>
  );
};

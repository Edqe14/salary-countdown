"use client";

import { useInterval } from "@mantine/hooks";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactConfetti from "react-confetti";
import { Countdown, Input, Modal } from "react-daisyui";

const TIMER_DELAY = 500;

export const Counter = ({ ms, hour, minute }: { ms: number, hour: number, minute: number }) => {
  const router = useRouter();
  const [x, setX] = useState<null | number>(null);
  const [currentMs, setMs] = useState(ms);
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    setX(window.innerWidth / 2 - 300 / 2);
    timer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMs(ms);

    if (ms > 0) {
      timer.start();
    }
  }, [ms]);

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

  const reload = () => {
    router.refresh();
  }

  const setTime = (time: string) => {
    const [hour, minute] = time.split(":");
    
    setCookie('hour', hour);
    setCookie('minute', minute);
  }

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

      <Modal id="edit" ref={modalRef}>
        <Modal.Header className="flex font-semibold justify-between">
          Configure Timer

          <form method="dialog">
            <button onClick={reload}>✕</button>
          </form>
        </Modal.Header>

        <Modal.Body>
          <div className="grid gap-2">
            <label>Target Hour</label>
            <Input defaultValue={`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`} onChange={(ev) => setTime(ev.target.value)} type="time" />
          </div>
        </Modal.Body>
      </Modal>

      <section className="flex gap-3 md:gap-6 cursor-pointer" onClick={() => modalRef.current?.showModal()}>
        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-kodeMono"
            value={days}
          />
          <h3 className="uppercase font-semibold text-accent text-xs">Days</h3>
        </section>

        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-kodeMono"
            value={hours}
          />
          <h3 className="uppercase font-semibold text-accent text-xs">Hours</h3>
        </section>

        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-kodeMono"
            value={mins}
          />
          <h3 className="uppercase font-semibold text-accent text-xs">
            Minutes
          </h3>
        </section>

        <section className="flex flex-col gap-3 items-center">
          <Countdown
            className="text-6xl md:text-7xl font-kodeMono"
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

"use client";

import { useWindowEvent } from "@mantine/hooks";
import { useEffect, useState } from "react";

const BLUE_MODE_SEQUENCE = "sevima is blue";

export const Background = () => {
  const [blueMode, setBlueMode] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useWindowEvent("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (key === BLUE_MODE_SEQUENCE[sequence.length]) {
      setSequence((current) => [...current, key]);
    } else {
      setSequence([]);
    }
  });

  useEffect(() => {
    if (blueMode) return;
    if (sequence.join("") === BLUE_MODE_SEQUENCE) {
      setBlueMode(true);
      setSequence([]);
    }
  }, [sequence, blueMode]);

  return (
    <section className="absolute inset-0">
      {blueMode && (
        <video
          src="https://res.cloudinary.com/mizuho/video/upload/v1695964317/sbnwxqjhszeodlmtottb.webm"
          autoPlay
          playsInline
          className="object-cover w-full h-full"
          onEnded={() => setBlueMode(false)}
        />
      )}
    </section>
  );
};

"use client";

import { useWindowEvent } from "@mantine/hooks";
import { useEffect, useState } from "react";

const EASTER_EGGS: Record<string, string> = {
  "sevima is blue": "https://res.cloudinary.com/mizuho/video/upload/v1695964317/sbnwxqjhszeodlmtottb.webm",
  "monki": "https://res.cloudinary.com/mizuho/video/upload/v1662596636/monki_bhek5g.mp4",
  "milo is red": "https://res.cloudinary.com/mizuho/video/upload/v1709180617/milos_caduegopfmlhunublubn.mp4"
};

const KEYWORDS = Object.keys(EASTER_EGGS);

export const Background = () => {
  const [showEaster, setEaster] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [url, setUrl] = useState<string | null>(null);

  useWindowEvent("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (KEYWORDS.some((seq) => key === seq[sequence.length])) {
      setSequence((current) => [...current, key]);
    } else {
      setSequence([]);
    }
  });

  useEffect(() => {
    const hasSequence = EASTER_EGGS[sequence.join('')];
    if (hasSequence) {
      setUrl(hasSequence);
      setEaster(true);
      setSequence([]);
    }
  }, [sequence, showEaster]);

  const ended = () => {
    setEaster(false);
    setUrl(null);
  };

  return (
    <section className="absolute inset-0">
      {showEaster && url && (
        <video
          src={url}
          autoPlay
          playsInline
          className="object-cover w-full h-full bg-slate-600"
          onEnded={ended}
        />
      )}
    </section>
  );
};

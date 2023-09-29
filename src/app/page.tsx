import { Background } from "@/components/background";
import { Counter } from "@/components/counter";
import { getMotivationMessage } from "@/utils/getMotivationMessage";
import { DateTime } from "luxon";

export default function Home() {
  const current = DateTime.now().setZone("Asia/Jakarta");
  const lastDay = DateTime.now()
    .setZone("Asia/Jakarta")
    .set({ day: current.daysInMonth, hour: 6, minute: 0, second: 0 });

  const diffMs = Math.max(lastDay.toMillis() - current.toMillis(), 0);
  const completionPerc =
    (diffMs / (lastDay.daysInMonth! * 24 * 60 * 60 * 1000)) * 100;

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <section className="flex flex-grow items-center justify-center z-[1]">
        <Counter ms={diffMs} />
      </section>

      <section className="py-8 text-center z-[1]">
        <p className="text-base-content font-medium">
          {getMotivationMessage(completionPerc)}
        </p>
      </section>

      <Background />
    </main>
  );
}

import { Background } from "@/components/background";
import { Counter } from "@/components/counter";
import { getMotivationMessage } from "@/utils/getMotivationMessage";
import { validateNumber } from "@/utils/validateNumber";
import { DateTime } from "luxon";
import { cookies } from 'next/headers'

export default function Home() {
  const cookie = cookies();

  const hour = validateNumber(cookie.get('hour')?.value, 6);
  const minute = validateNumber(cookie.get('minute')?.value, 0);

  const current = DateTime.now().setZone("Asia/Jakarta");
  const lastDay = DateTime.now()
    .setZone("Asia/Jakarta")
    .set({ day: current.daysInMonth, hour, minute, second: 0 });

  const diffMs = Math.max(lastDay.toMillis() - current.toMillis(), 0);
  const completionPerc =
    (diffMs / (lastDay.daysInMonth! * 24 * 60 * 60 * 1000)) * 100;

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <section className="flex flex-grow items-center justify-center z-[1]">
        <Counter ms={diffMs} hour={hour} minute={minute} />
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

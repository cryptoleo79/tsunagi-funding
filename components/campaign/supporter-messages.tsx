import type { SupporterMessage } from "@/lib/domain/types";
import { formatAda } from "@/lib/domain/format";

interface SupporterMessagesProps {
  messages: SupporterMessage[];
}

export function SupporterMessages({ messages }: SupporterMessagesProps) {
  if (messages.length === 0) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-zinc-100">
        Supporters
        <span className="ml-2 text-xs font-normal text-zinc-600">{messages.length}</span>
      </h2>
      <div className="mt-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-400">
                  {msg.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-zinc-200">
                  {msg.name}
                </span>
              </div>
              <span className="text-xs text-zinc-600">
                {formatAda(msg.amountAda)}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              {msg.message}
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              {msg.date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

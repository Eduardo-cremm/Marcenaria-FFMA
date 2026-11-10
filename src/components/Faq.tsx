import { faq } from "@/lib/site";

// <details name="…"> faz com que só uma pergunta fique aberta por vez, sem JavaScript.
export function Faq() {
  return (
    <div className="grid items-start gap-3 md:grid-cols-2" data-rv>
      {faq.map((f) => (
        <details key={f.q} name="faq" className="group rounded-[10px] bg-surface open:ring-1 open:ring-brass/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-transform group-open:rotate-180 group-open:border-brass group-open:bg-brass">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3,5 8,11 13,5" />
              </svg>
            </span>
          </summary>
          <p className="px-5 pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

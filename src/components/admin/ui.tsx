import Link from "next/link";
import { toggleFlag } from "@/app/admin/actions";

export const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none transition focus:border-brass focus:ring-2 focus:ring-brass/25";

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-medium">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-[#1C3329]" />
      {label}
    </label>
  );
}

export function PageTitle({ title, action }: { title: string; action?: { href: string; label: string } }) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-serif text-3xl font-medium">{title}</h1>
      {action && (
        <Link href={action.href} className="btn btn-dark btn-sm">
          {action.label}
        </Link>
      )}
    </div>
  );
}

/** Aviso de sucesso ou erro vindo da URL (?ok= / ?erro=). */
export function Notice({ params }: { params: { ok?: string; erro?: string } }) {
  if (params.erro) return <p role="alert" className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{params.erro}</p>;
  if (params.ok) {
    const text = params.ok === "novo" ? "Criado. Agora adicione as fotos abaixo." : params.ok === "apagado" ? "Item apagado." : "Alterações salvas.";
    return <p role="status" className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900">{text}</p>;
  }
  return null;
}

/** Interruptor que grava na hora (publicado, destaque, pronta entrega). */
export function Toggle({ kind, id, field, on, label }: { kind: "products" | "projects"; id: string; field: string; on: boolean; label: string }) {
  return (
    <form action={toggleFlag}>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={String(!on)} />
      <button type="submit" role="switch" aria-checked={on} aria-label={label} title={label} className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-forest" : "bg-line"}`}>
        <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
      </button>
    </form>
  );
}

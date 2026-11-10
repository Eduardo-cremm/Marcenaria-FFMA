"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addPhoto, deletePhoto, orderPhotos, signIn } from "@/app/admin/actions";
import { BUCKET } from "@/lib/supabase/config";
import { browserDb } from "@/lib/supabase/client";
import { inputCls } from "./ui";

export function SubmitButton({ children, className = "btn btn-dark" }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? "Salvando…" : children}
    </button>
  );
}

/** Botão de apagar que pede confirmação antes de enviar o formulário. */
export function DeleteButton({ what, className = "text-sm font-semibold text-red-700 underline" }: { what: string; className?: string }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(`Apagar ${what}? Esta ação não pode ser desfeita.`)) e.preventDefault();
      }}
    >
      Apagar
    </button>
  );
}

export function LoginForm() {
  const [error, action] = useFormState(signIn, null);
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold">E-mail</span>
        <input name="email" type="email" required autoComplete="username" className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold">Senha</span>
        <input name="password" type="password" required autoComplete="current-password" className={inputCls} />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <SubmitButton className="btn btn-dark mt-2 w-full">Entrar</SubmitButton>
    </form>
  );
}

export function NavLinks({ items }: { items: { href: string; label: string; badge?: number }[] }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((i) => {
        const active = i.href === "/admin" ? pathname === "/admin" : pathname.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} aria-current={active ? "page" : undefined} className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-brass/15 text-brass-lt" : "text-sage hover:bg-white/5 hover:text-cream"}`}>
            {i.label}
            {!!i.badge && <span className="rounded-full bg-brass px-2 py-0.5 text-[11px] font-bold text-ink">{i.badge}</span>}
          </Link>
        );
      })}
    </>
  );
}

// Reduz a foto no navegador antes de enviar: lado maior de até 2000 px, em WebP.
async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Falha ao converter a imagem."))), "image/webp", 0.84));
}

type Photo = { id: string; url: string };

export function PhotoManager({ kind, parentId, photos }: { kind: "products" | "projects"; parentId: string; photos: Photo[] }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const busy = !!status || pending;

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    const db = browserDb();
    let failed = 0;
    for (let i = 0; i < files.length; i++) {
      setStatus(`Enviando ${i + 1} de ${files.length}…`);
      try {
        const blob = await shrink(files[i]);
        const path = `${kind}/${parentId}/${crypto.randomUUID()}.webp`;
        const { error: upErr } = await db.storage.from(BUCKET).upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
        if (upErr) throw upErr;
        const { data } = db.storage.from(BUCKET).getPublicUrl(path);
        const res = await addPhoto(kind, parentId, path, data.publicUrl);
        if (!res?.ok) throw new Error("Não foi possível registrar a foto.");
      } catch {
        failed++;
      }
    }
    setStatus("");
    if (failed) setError(`${failed} foto(s) não foram enviadas. Use JPG, PNG ou WebP.`);
    if (input.current) input.current.value = "";
    router.refresh();
  }

  const run = (fn: () => Promise<unknown>) => start(async () => { await fn(); router.refresh(); });
  const move = (i: number, d: number) => {
    const ids = photos.map((p) => p.id);
    [ids[i], ids[i + d]] = [ids[i + d], ids[i]];
    run(() => orderPhotos(kind, ids));
  };

  return (
    <div>
      {photos.length ? (
        <ul className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <li key={p.id} className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="relative aspect-square bg-surface">
                <Image src={p.url} alt="" fill sizes="240px" className="object-cover" />
                {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-forest px-2 py-0.5 text-[11px] font-bold text-cream">Capa</span>}
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 text-xs font-semibold">
                <span className="flex gap-1">
                  <button type="button" disabled={busy || i === 0} onClick={() => move(i, -1)} aria-label="Mover para antes" className="rounded border border-line px-2 py-1 disabled:opacity-30">←</button>
                  <button type="button" disabled={busy || i === photos.length - 1} onClick={() => move(i, 1)} aria-label="Mover para depois" className="rounded border border-line px-2 py-1 disabled:opacity-30">→</button>
                </span>
                <button type="button" disabled={busy} className="text-red-700 underline disabled:opacity-40" onClick={() => confirm("Apagar esta foto?") && run(() => deletePhoto(kind, p.id))}>
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-5 text-sm text-muted">Nenhuma foto ainda. A primeira foto enviada vira a capa.</p>
      )}
      <label className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-line bg-white px-6 py-8 text-center text-sm transition hover:border-brass ${busy ? "pointer-events-none opacity-60" : ""}`}>
        <span className="font-semibold">{status || "Clique para escolher fotos"}</span>
        <span className="mt-1 text-muted">JPG, PNG ou WebP. As fotos são reduzidas automaticamente antes do envio.</span>
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
      </label>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}

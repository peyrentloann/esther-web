"use client";

import { useState, useTransition } from "react";
import { loginAdmin } from "@/app/admin/actions";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "→"];

export default function LoginForm() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleKey = (key: string) => {
    if (key === "⌫") {
      setPin((p) => p.slice(0, -1));
      setError("");
    } else if (key === "→") {
      if (pin.length < 4) return;
      startTransition(async () => {
        const result = await loginAdmin(pin);
        if (result?.error) {
          setError(result.error);
          setPin("");
        }
      });
    } else if (pin.length < 6) {
      setPin((p) => p + key);
      setError("");
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl shadow-[0_20px_60px_-10px_rgba(21,51,40,0.10)] p-8">
      {/* PIN display */}
      <div className="flex justify-center gap-3 mb-8">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              i < pin.length
                ? "bg-primary border-primary"
                : "border-outline-variant"
            }`}
          >
            {i < pin.length && <div className="w-3 h-3 rounded-full bg-on-primary" />}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-center text-sm text-error mb-4">{error}</p>
      )}

      {/* Clavier */}
      <div className="grid grid-cols-3 gap-3">
        {KEYS.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            disabled={isPending}
            className={`h-14 rounded-2xl font-medium text-lg transition-all duration-200 active:scale-95 ${
              key === "→"
                ? "bg-primary text-on-primary hover:bg-primary/90"
                : key === "⌫"
                ? "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            } disabled:opacity-40`}
          >
            {key}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-outline mt-6">
        Session valide 7 jours
      </p>
    </div>
  );
}

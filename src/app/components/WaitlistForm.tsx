"use client";

export function WaitlistForm() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="deine@email.de"
        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-[#7c5cfc]/50 focus:bg-white/8 transition-all"
      />
      <button
        type="submit"
        className="px-5 py-3 rounded-xl bg-[#7c5cfc] hover:bg-[#6d4ef0] transition-colors text-sm font-medium whitespace-nowrap"
      >
        Eintragen →
      </button>
    </form>
  );
}

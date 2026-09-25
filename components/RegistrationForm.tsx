"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaymentQR from "./PaymentQR";
import ECellSpinner from "./ECellSpinner";

const BRANCHES = [
  "Computer Engineering",
  "Information Technology",
  "Electronics & Telecommunication",
  "Automation & Robotics",
  "Mechanical Engineering",
  "Artificial Intelligence and Data Science",
  "Civil Engineering",
  "Electrical Engineering",
  "Other",
];

const YEARS = ["First Year", "Second Year", "Third Year", "Final Year"];

const MESWCOE_FEE = 349;
const OTHER_COLLEGE_FEE = 699;

type FormState = {
  name: string;
  isMeswcoe: "" | "yes" | "no";
  collegeName: string;
  year: string;
  prn: string;
  branch: string;
  transactionId: string;
};

const initialState: FormState = {
  name: "",
  isMeswcoe: "",
  collegeName: "",
  year: "",
  prn: "",
  branch: "",
  transactionId: "",
};

export default function RegistrationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const fee = form.isMeswcoe === "yes" ? MESWCOE_FEE : OTHER_COLLEGE_FEE;
  const showPayment = form.isMeswcoe === "yes" || form.isMeswcoe === "no";

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid = useMemo(() => {
    if (!form.name.trim() || !form.branch || !form.year) return false;
    if (form.isMeswcoe === "") return false;
    if (form.isMeswcoe === "yes" && !form.prn.trim()) return false;
    if (form.isMeswcoe === "no" && !form.collegeName.trim()) return false;
    if (!form.transactionId.trim()) return false;
    return true;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fee }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card mx-auto max-w-lg rounded-3xl p-8 sm:p-10 text-center shadow-glow-lg"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400 border border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(16,185,129,0.35)]">
          ✓
        </div>
        <h3 className="font-display text-2xl font-bold text-gradient">
          You&rsquo;re registered!
        </h3>
        <p className="mt-2.5 text-sm text-mist/75 leading-relaxed">
          Thanks for signing up for Illuminate 3.0. Your details and payment
          reference have been recorded.
        </p>

        {/* WhatsApp Group Box */}
        <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center backdrop-blur-md shadow-[0_0_35px_-8px_rgba(16,185,129,0.25)]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Important Step
          </span>

          <h4 className="mt-3 font-display text-base font-bold text-white">
            Join the Official WhatsApp Group
          </h4>
          <p className="mt-1.5 text-xs leading-relaxed text-mist/70">
            Joining the group is required to receive event updates, schedule announcements, and workshop instructions.
          </p>

          <a
            href="https://chat.whatsapp.com/KYWcm5grUXjEyY38TkZLZH?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)] transition duration-200 hover:shadow-[0_0_35px_-2px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.585 1.761.884 2.802.884 3.181 0 5.768-2.587 5.768-5.767 0-3.18-2.587-5.77-5.774-5.771zm3.374 8.219c-.14.394-.81.768-1.127.818-.316.05-.72.072-2.18-.535-1.748-.727-2.881-2.493-2.969-2.61-.088-.117-.704-.937-.704-1.787 0-.85.445-1.268.604-1.442.158-.174.346-.217.462-.217.116 0 .232.002.333.007.106.005.249-.04.39.298.14.339.48 1.17.522 1.256.042.086.07.186.012.302-.058.116-.088.188-.174.29-.087.101-.183.226-.261.304-.088.087-.179.182-.077.357.102.174.453.747.971 1.209.667.593 1.23.776 1.405.864.175.087.278.073.382-.045.105-.117.447-.522.566-.701.12-.178.239-.148.402-.088.163.06 1.034.488 1.211.576.178.088.297.132.34.205.044.073.044.422-.096.816zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.063c-1.636 0-3.153-.497-4.42-1.353l-.317-.213-2.98.781.796-2.905-.207-.33A8.028 8.028 0 014 12c0-4.411 3.589-8.031 8-8.031s8 3.62 8 8.031-3.589 8.063-8 8.063z" />
            </svg>
            <span>Join WhatsApp Group</span>
            <span aria-hidden>→</span>
          </a>
        </div>

        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-white/15 px-6 py-2 text-xs text-mist/60 transition hover:border-navy-400 hover:text-white"
        >
          Register another student
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card mx-auto max-w-2xl rounded-3xl p-6 shadow-glow sm:p-10"
    >
      <div className="space-y-7">
        {/* Name */}
        <Field label="Full Name" required>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Sujal Patade"
            className={inputClass}
            required
          />
        </Field>

        {/* MESWCOE toggle */}
        <Field label="Are you a student of MES's Wadia College of Engineering (MESWCOE)?" required>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => update("isMeswcoe", val)}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-all ${form.isMeswcoe === val
                  ? "border-navy-400 bg-navy-600/40 text-white shadow-glow"
                  : "border-white/10 bg-white/[0.02] text-mist/60 hover:border-white/25"
                  }`}
              >
                {val}
              </button>
            ))}
          </div>
        </Field>

        <AnimatePresence mode="wait">
          {form.isMeswcoe === "no" && (
            <ConditionalField key="college">
              <Field label="Name of your college" required>
                <input
                  type="text"
                  value={form.collegeName}
                  onChange={(e) => update("collegeName", e.target.value)}
                  placeholder="e.g. XYZ College of Engineering"
                  className={inputClass}
                  required
                />
              </Field>
            </ConditionalField>
          )}
        </AnimatePresence>

        {/* Year */}
        <Field label="Student Year" required>
          <select
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
            className={inputClass}
            required
          >
            <option value="" disabled className="bg-[#0a1330] text-mist/50">
              Select year
            </option>
            {YEARS.map((y) => (
              <option key={y} value={y} className="bg-[#0a1330] text-white">
                {y}
              </option>
            ))}
          </select>
        </Field>

        <AnimatePresence mode="wait">
          {form.isMeswcoe === "yes" && (
            <ConditionalField key="prn">
              <Field label="College PRN Number" required>
                <input
                  type="text"
                  value={form.prn}
                  onChange={(e) => update("prn", e.target.value)}
                  placeholder="e.g. F25xxxxxxxx"
                  className={inputClass}
                  required
                />
              </Field>
            </ConditionalField>
          )}
        </AnimatePresence>

        {/* Branch */}
        <Field label="Branch" required>
          <select
            value={form.branch}
            onChange={(e) => update("branch", e.target.value)}
            className={inputClass}
            required
          >
            <option value="" disabled className="bg-[#0a1330] text-mist/50">
              Select branch
            </option>
            {BRANCHES.map((b) => (
              <option key={b} value={b} className="bg-[#0a1330] text-white">
                {b}
              </option>
            ))}
          </select>
        </Field>

        {/* Payment */}
        <AnimatePresence mode="wait">
          {showPayment && (
            <ConditionalField key="payment">
              <div className="border-t border-white/10 pt-6">
                <p className="mb-4 text-center font-display text-lg font-semibold text-mist">
                  Registration Fee
                </p>
                <PaymentQR
                  amount={fee}
                  note={`Illuminate3.0-${form.name || "registration"}`}
                />
                <div className="mt-6">
                  <Field label="Transaction / UTR ID" required>
                    <input
                      type="text"
                      value={form.transactionId}
                      onChange={(e) => update("transactionId", e.target.value)}
                      placeholder="Enter the UPI transaction ID after payment"
                      className={inputClass}
                      required
                    />
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-300/90">
                      <span className="text-amber-400">⚠️</span>
                      <span>
                        <strong>Note:</strong> Incorrect or invalid Transaction IDs will not be considered.
                      </span>
                    </p>
                  </Field>
                </div>
              </div>
            </ConditionalField>
          )}
        </AnimatePresence>

        {status === "error" && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errorMsg}
          </p>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={!isValid || status === "submitting"}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-navy-600 via-navy-500 to-navy-400 px-6 py-4 font-display text-base font-semibold text-white shadow-glow transition hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "submitting" ? (
            <>
              <ECellSpinner className="size-5" />
              <span>Recording Registration…</span>
            </>
          ) : (
            "Complete Registration"
          )}
        </motion.button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-mist placeholder:text-mist/30 outline-none transition focus:border-navy-400 focus:bg-white/[0.05] focus:shadow-glow [&>option]:bg-[#0a1330] [&>option]:text-white";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-mist/80">
        {label} {required && <span className="text-navy-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function ConditionalField({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

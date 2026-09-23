"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaymentQR from "./PaymentQR";

const BRANCHES = [
  "Computer Engineering",
  "Information Technology",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
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
        className="glass-card mx-auto max-w-lg rounded-3xl p-10 text-center shadow-glow-lg"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-navy-600/40 text-3xl">
          ✓
        </div>
        <h3 className="font-display text-2xl font-bold text-gradient">
          You&rsquo;re registered!
        </h3>
        <p className="mt-3 text-mist/70">
          Thanks for signing up for Illuminate 3.0. Your details and payment
          reference have been recorded. See you at the workshop!
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-white/15 px-6 py-2 text-sm text-mist/80 transition hover:border-navy-400 hover:text-white"
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
              <Field label="PRN Number" required>
                <input
                  type="text"
                  value={form.prn}
                  onChange={(e) => update("prn", e.target.value)}
                  placeholder="e.g. 72xxxxxxxx"
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
          className="w-full rounded-xl bg-gradient-to-r from-navy-600 via-navy-500 to-navy-400 px-6 py-4 font-display text-base font-semibold text-white shadow-glow transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "submitting" ? "Submitting…" : "Complete Registration"}
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

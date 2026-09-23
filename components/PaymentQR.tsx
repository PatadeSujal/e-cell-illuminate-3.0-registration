"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";

const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "ecell-wadia@upi";
const PAYEE_NAME = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME || "ECELL Wadia";

export default function PaymentQR({
  amount,
  note,
}: {
  amount: number;
  note: string;
}) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const upiString = `upi://pay?pa=${encodeURIComponent(
      UPI_ID
    )}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(
      note
    )}`;

    QRCode.toDataURL(upiString, {
      width: 320,
      margin: 1,
      color: {
        dark: "#0a1330",
        light: "#ffffffff",
      },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [amount, note]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative shimmer-border rounded-2xl p-[2px]">
        <div className="glass-card rounded-2xl p-5">
          <AnimatePresence mode="wait">
            {qrDataUrl ? (
              <motion.img
                key={amount}
                src={qrDataUrl}
                alt={`UPI QR code for ₹${amount} payment`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="h-56 w-56 rounded-lg bg-white p-2 sm:h-64 sm:w-64"
              />
            ) : (
              <div className="flex h-56 w-56 items-center justify-center rounded-lg bg-white/5 text-sm text-mist/60 sm:h-64 sm:w-64">
                Generating QR…
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="text-center">
        <p className="font-display text-2xl font-bold text-gradient">
          ₹{amount}
        </p>
        <p className="text-sm text-mist/60">Scan with any UPI app to pay</p>
        <p className="mt-1 text-xs text-mist/40">UPI ID: {UPI_ID}</p>
      </div>
    </div>
  );
}

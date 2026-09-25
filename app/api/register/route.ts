import { NextRequest, NextResponse } from "next/server";
import { appendRegistrationRow } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      isMeswcoe,
      collegeName,
      year,
      prn,
      branch,
      transactionId,
      fee,
    } = body ?? {};

    // Server-side validation mirrors the client-side rules.
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== "string" ||
      !email.trim() ||
      !emailRegex.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }
    if (isMeswcoe !== "yes" && isMeswcoe !== "no") {
      return NextResponse.json(
        { error: "Please specify whether you are a MESWCOE student." },
        { status: 400 }
      );
    }
    if (isMeswcoe === "no" && (!collegeName || !collegeName.trim())) {
      return NextResponse.json(
        { error: "College name is required." },
        { status: 400 }
      );
    }
    if (isMeswcoe === "yes" && (!prn || !prn.trim())) {
      return NextResponse.json(
        { error: "PRN Number is required for MESWCOE students." },
        { status: 400 }
      );
    }
    if (!year || !branch) {
      return NextResponse.json(
        { error: "Year and branch are required." },
        { status: 400 }
      );
    }
    if (!transactionId || !transactionId.trim()) {
      return NextResponse.json(
        { error: "Transaction ID is required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const college = isMeswcoe === "yes" ? "MESWCOE" : collegeName.trim();
    const prnValue = isMeswcoe === "yes" ? prn.trim() : "N/A";

    await appendRegistrationRow([
      timestamp,
      name.trim(),
      email.trim(),
      college,
      prnValue,
      year,
      branch,
      fee ?? (isMeswcoe === "yes" ? 349 : 699),
      transactionId.trim(),
      isMeswcoe,
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    const message =
      err instanceof Error ? err.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

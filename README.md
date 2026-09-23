# Illuminate 3.0 — Registration Website

A Next.js 14 (App Router + TypeScript + Tailwind + Framer Motion) registration
site for the E-CELL "Illuminate 3.0" workshop. Black / white / dark-blue theme,
animated aurora + particle background, scroll-reveal animations, a
conditional registration form, dynamic UPI QR codes, and a Google Sheets
backend.

## Form logic

1. **Full Name** — always required.
2. **Is the student from MESWCOE?** — Yes / No toggle.
   - **No** → shows a text field to enter the student's college name.
   - **Yes** → later reveals a **PRN Number** field.
3. **Student Year** — always required (First/Second/Third/Final Year).
4. **PRN Number** — only shown/required when MESWCOE = Yes.
5. **Branch** — always required.
6. **Payment** — once the MESWCOE question is answered:
   - MESWCOE = Yes → QR code for **₹300**
   - MESWCOE = No → QR code for **₹700**
   - The QR encodes a real `upi://pay` deep link (amount + payee baked in), so
     it opens directly in any UPI app (GPay, PhonePe, Paytm, etc.).
7. **Transaction / UTR ID** — required, entered by the student after paying.

On submit, the data is validated client-side and server-side, then appended
as a new row to a Google Sheet via a service account.

## 1. Install

```bash
npm install
```

## 2. Set up Google Sheets storage

1. In [Google Cloud Console](https://console.cloud.google.com/), create (or
   reuse) a project and enable the **Google Sheets API**.
2. Create a **Service Account** → generate a JSON key.
3. Create a Google Sheet. Add a first row (header) to a tab named exactly
   `Registrations`:
   `Timestamp | Name | College | PRN | Year | Branch | Fee | Transaction ID | Is MESWCOE`
4. Share the Sheet with the service account's email (found in the JSON key)
   with **Editor** access.
5. Copy the Sheet ID from its URL:
   `https://docs.google.com/spreadsheets/d/<THIS_PART>/edit`

## 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=...   # "client_email" from the JSON key
GOOGLE_PRIVATE_KEY="..."           # "private_key" from the JSON key, keep the \n escapes and quotes
GOOGLE_SHEET_ID=...

NEXT_PUBLIC_UPI_ID=your-upi-id@bank
NEXT_PUBLIC_UPI_PAYEE_NAME=Your Payee Name
```

> `NEXT_PUBLIC_UPI_ID` / `NEXT_PUBLIC_UPI_PAYEE_NAME` control what the QR code
> actually pays into — replace the placeholders with E-CELL's real UPI ID
> before going live.

## 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 5. Deploy

Deploy as any Next.js app (e.g. Vercel): push the repo, add the same
environment variables in the hosting dashboard, and deploy.

## Project structure

```
app/
  layout.tsx          Root layout, fonts, metadata
  page.tsx             Landing + registration page
  globals.css          Theme, animation keyframes
  api/register/route.ts  POST handler → Google Sheets
components/
  AuroraBackground.tsx  Canvas particles + CSS aurora blobs (background animation)
  RevealSection.tsx     Scroll-reveal wrapper (Framer Motion whileInView)
  RegistrationForm.tsx  The conditional form + validation + submit
  PaymentQR.tsx          Generates a live UPI QR code for the given amount
lib/
  sheets.ts             Google Sheets auth + append-row helper
```

## Customizing the theme

Colors live in `tailwind.config.ts` under `theme.extend.colors` (`ink`,
`panel`, `navy.*`, `mist`). The aurora blob colors are set inline in
`AuroraBackground.tsx`.

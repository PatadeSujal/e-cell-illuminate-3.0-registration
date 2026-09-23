import { google } from "googleapis";

/**
 * Returns an authenticated Google Sheets client using a service account.
 * Required env vars (see .env.local.example):
 *  - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *  - GOOGLE_PRIVATE_KEY   (keep the \n escapes; they are unescaped below)
 *  - GOOGLE_SHEET_ID
 */
export function getSheetsConfig() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !sheetId) {
    throw new Error(
      "Missing Google Sheets credentials. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY and GOOGLE_SHEET_ID in your environment."
    );
  }

  return { email, privateKey, sheetId };
}

export async function getSheetsClient() {
  const { email, privateKey } = getSheetsConfig();

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendRegistrationRow(row: (string | number)[]) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (webhookUrl) {
    const [timestamp, name, college, prn, year, branch, fee, transactionId, isMeswcoe] = row;
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp,
        name,
        college,
        prn,
        year,
        branch,
        fee,
        transactionId,
        isMeswcoe,
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Google Sheet Webhook error (${res.status}): ${errText.slice(0, 100)}`);
    }
    return;
  }

  const { sheetId } = getSheetsConfig();
  const sheets = await getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Registrations!A:I",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}

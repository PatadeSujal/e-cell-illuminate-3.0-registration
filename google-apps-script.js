/**
 * Google Apps Script Webhook for Illuminate 3.0 Registration
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. In Row 1 (Header row), set the column headers:
 *    Column A: Timestamp
 *    Column B: Name
 *    Column C: Email
 *    Column D: College
 *    Column E: PRN
 *    Column F: Year
 *    Column G: Branch
 *    Column H: Fee
 *    Column I: Transaction ID
 *    Column J: Is MESWCOE
 * 
 * 3. Go to Extensions > Apps Script.
 * 4. Paste this code into Code.gs and save.
 * 5. Click "Deploy" > "New deployment" (or "Manage deployments" -> Edit -> New version).
 *    - Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy.
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Registrations") || ss.getActiveSheet();
    
    var data = JSON.parse(e.postData.contents);
    
    // Map fields matching the headers
    var rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.college || "",
      data.prn || "",
      data.year || "",
      data.branch || "",
      data.fee || "",
      data.transactionId || "",
      data.isMeswcoe || ""
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Registration recorded successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

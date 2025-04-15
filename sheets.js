
const { google } = require("googleapis");
const credentials = require("./google-credentials.json");

const SPREADSHEET_ID = "1V17d1S4c3BpMtESV8IsTAUfKWMGHOoXfZfq2jjEaLas";
const SHEET_NAME = "Hoja1";

async function obtenerProductos() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A2:D`,
  });
  return response.data.values || [];
}

async function agregarProducto(producto) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:D`,
    valueInputOption: "USER_ENTERED",
    resource: { values: [producto] },
  });
}

module.exports = { obtenerProductos, agregarProducto };

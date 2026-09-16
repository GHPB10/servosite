export interface LeadSubmission {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  solucaoOuAssunto: string;
  mensagemOuFaturamento?: string;
  origem?: 'Modal Diagnóstico' | 'Formulário Contato' | 'Parceria Contábil' | string;
}

export const DEFAULT_SPREADSHEET_ID = '1nC5YzPBCzT-weT5lIrhI_wl2UoEgv0vpmBvxaIWoVUE';
export const DEFAULT_SHEET_TAB_NAME = 'site';

/**
 * Adiciona uma nova linha com os dados do lead na planilha indicada
 */
export async function appendRowToSpreadsheet(
  accessToken: string,
  spreadsheetId: string = DEFAULT_SPREADSHEET_ID,
  values: (string | number)[][],
  sheetName: string = DEFAULT_SHEET_TAB_NAME
) {
  const range = `${sheetName}!A:H`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || 'Erro ao registrar linha no Google Sheets.');
  }

  return response.json();
}

/**
 * Registra um lead na aba 'site' da planilha Google Sheets
 * Colunas exatas da planilha (A até H):
 * A: Data e Hora (horário de Brasília)
 * B: Nome do Solicitante
 * C: Empresa
 * D: E-mail
 * E: Telefone / WhatsApp
 * F: Solução ou Assunto
 * G: Mensagem / Faturamento
 * H: Status de Contato: "Novo Lead"
 */
export async function recordLeadToSheet(
  accessToken: string,
  spreadsheetId: string = DEFAULT_SPREADSHEET_ID,
  lead: LeadSubmission,
  tabName: string = DEFAULT_SHEET_TAB_NAME
) {
  const now = new Date().toLocaleString('pt-BR', { 
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const row = [
    [
      now,                               // A: Data e Hora (horário de Brasília)
      lead.nome,                         // B: Nome do Solicitante
      lead.empresa,                      // C: Empresa
      lead.email,                        // D: E-mail
      lead.telefone,                     // E: Telefone / WhatsApp
      lead.solucaoOuAssunto,             // F: Solução ou Assunto
      lead.mensagemOuFaturamento || '-', // G: Mensagem / Faturamento
      'Novo Lead'                        // H: Status de Contato: "Novo Lead"
    ]
  ];

  return appendRowToSpreadsheet(accessToken, spreadsheetId, row, tabName);
}

export async function sendLeadViaWebhook(
  webhookUrl: string,
  lead: LeadSubmission
): Promise<boolean> {
  const cleanUrl = webhookUrl.trim();
  if (!cleanUrl) return false;

  await fetch(cleanUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(lead),
  });

  return true;
}

export const APPS_SCRIPT_TEMPLATE = `function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("site");
    if (!sheet) {
      sheet = ss.insertSheet("site");
      sheet.appendRow([
        "Data e Hora (horário de Brasília)",
        "Nome do Solicitante",
        "Empresa",
        "E-mail",
        "Telefone / WhatsApp",
        "Solução ou Assunto",
        "Mensagem / Faturamento",
        'Status de Contato: "Novo Lead"'
      ]);
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch(err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    var now = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy, HH:mm:ss");
    
    sheet.appendRow([
      now,                                  // Coluna A: Data e Hora
      data.nome || "",                      // Coluna B: Nome do Solicitante
      data.empresa || "",                   // Coluna C: Empresa
      data.email || "",                     // Coluna D: E-mail
      data.telefone || "",                  // Coluna E: Telefone / WhatsApp
      data.solucaoOuAssunto || "",          // Coluna F: Solução ou Assunto
      data.mensagemOuFaturamento || "-",    // Coluna G: Mensagem / Faturamento
      "Novo Lead"                           // Coluna H: Status de Contato
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

/**
 * Garante os cabeçalhos das 8 colunas conforme a planilha
 */
export async function ensureSheetHeaders(
  accessToken: string,
  spreadsheetId: string = DEFAULT_SPREADSHEET_ID,
  tabName: string = DEFAULT_SHEET_TAB_NAME
) {
  const headerRow = [
    [
      'Data e Hora (horário de Brasília)',
      'Nome do Solicitante',
      'Empresa',
      'E-mail',
      'Telefone / WhatsApp',
      'Solução ou Assunto',
      'Mensagem / Faturamento',
      'Status de Contato: "Novo Lead"'
    ]
  ];

  return appendRowToSpreadsheet(accessToken, spreadsheetId, headerRow, tabName);
}

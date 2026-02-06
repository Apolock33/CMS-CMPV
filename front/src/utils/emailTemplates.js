export const generateContactEmailHTML = ({ fullName, senderEmail, subject, content }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background-color: #007bff; /* Cor fixa para funcionar em todos os clientes de email */
          color: white;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .field {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
          display: block;
          margin-bottom: 5px;
          color: #555;
        }
        .value {
          padding: 10px;
          background-color: white;
          border: 1px solid #eee;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #888;
          background-color: #f9f9f9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Novo Contato do Site</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Nome:</span>
            <div class="value">${fullName}</div>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <div class="value">
              <a href="mailto:${senderEmail}">${senderEmail}</a>
            </div>
          </div>
          <div class="field">
            <span class="label">Assunto:</span>
            <div class="value">${subject}</div>
          </div>
          <div class="field">
            <span class="label">Mensagem:</span>
            <div class="value" style="white-space: pre-wrap;">${content}</div>
          </div>
        </div>
        <div class="footer">
          <p>Este é um email automático. Por favor, não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
export const sendEmail = async ({ to, sender, toName, subject, htmlContent }) => {
  const BREVO_API_URL = import.meta.env.VITE_BREVO_API_URL;
  const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const emailPayload = {
    sender: sender || { name: "Clube Militar da Praia Vermelha", email: import.meta.env.VITE_EMAIL_ADDRESS },
    to: [{ email: to, name: toName }],
    subject: subject,
    htmlContent: htmlContent,
  };
  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": API_KEY,
    },
    body: JSON.stringify(emailPayload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Erro na API Brevo (${response.status}): ${JSON.stringify(errorData)}`);
  }
  const data = await response.json();
  return data.messageId;
};
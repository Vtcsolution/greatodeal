// Sends a WhatsApp alert via CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/)
// so a new client email doesn't sit unread in the admin panel. Free, personal-notification
// API — not for messaging customers, just pinging our own number.
const PHONE = process.env.WHATSAPP_NOTIFY_PHONE;
const API_KEY = process.env.CALLMEBOT_API_KEY;
const ENABLED = !!PHONE && !!API_KEY;

export const sendWhatsAppAlert = async (message: string): Promise<void> => {
  if (!ENABLED) return;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(PHONE!)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(API_KEY!)}`;
    await fetch(url);
  } catch (err) {
    console.error('WhatsApp alert failed:', (err as Error).message);
  }
};

const BANNED_KEYWORDS = ['spam', 'illegal', 'threat', 'violence', 'buy now', 'http', '.com', '.org', 'www'];

export const validateMessage = (text: string): { isValid: boolean; error?: string } => {
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([^\s]+\.[a-z]{2,})/gi;
  if (urlRegex.test(text)) return { isValid: false, error: "Links are not allowed for safety." };
  const lowerText = text.toLowerCase();
  if (BANNED_KEYWORDS.some(word => lowerText.includes(word))) return { isValid: false, error: "This message violates guidelines." };
  return { isValid: true };
};

export const hashFingerprint = async (fp: string) => {
  const msgBuffer = new TextEncoder().encode(fp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};

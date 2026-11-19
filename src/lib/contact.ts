// Only official, user-provided destinations belong here. Empty values never send.
export const contactConfig = { whatsapp: "", instagram: "", email: "" };
export function createConsultationLink(email: string, entries: Record<string, string>) {
  if (!email.trim()) return null;
  const body = Object.entries(entries)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n\n");
  return `mailto:${email}?subject=${encodeURIComponent("Consulta de proyecto — MA Arquitecta")}&body=${encodeURIComponent(body)}`;
}

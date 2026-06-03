export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value)
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function isOpen(): boolean {
  const now = new Date()
  const day = now.getDay()
  const h = now.getHours()
  if (day >= 1 && day <= 5) return h >= 8 && h < 18
  if (day === 6) return h >= 9 && h < 13
  return false
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Placeholder image generator (substitui fotos reais até ter as imagens)
export function placeholder(
  width: number,
  height: number,
  label = '',
  bg = 'B4B2A9',
  fg = '412402'
): string {
  const text = label ? encodeURIComponent(label) : `${width}x${height}`
  return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${text}`
}

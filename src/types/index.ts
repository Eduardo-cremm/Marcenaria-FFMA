export interface Category {
  id: number
  name: string
  slug: string
  icon: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category_id: number
  category?: Category
  finishes: string[]
  colors: string[]
  dimensions: { largura: number; altura: number; profundidade: number }
  material: string
  production_days: number
  warranty_months: number
  published: boolean
  created_at: string
  images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  position: number
  is_cover: boolean
}

export interface Project {
  id: string
  title: string
  slug: string
  room: 'sala' | 'quarto' | 'cozinha' | 'escritorio' | 'banheiro' | 'varanda'
  city: string
  year: number
  description: string
  published: boolean
  created_at: string
  images?: ProjectImage[]
}

export interface ProjectImage {
  id: string
  project_id: string
  url: string
  position: number
  is_cover: boolean
}

export interface Profile {
  id: string
  full_name: string
  city: string
  phone: string
  role: 'customer' | 'admin'
  created_at: string
}

export interface Order {
  id: string
  user_id: string | null
  guest_name: string | null
  guest_phone: string | null
  items: OrderItem[]
  total: number
  status: 'pending' | 'contacted' | 'completed'
  whatsapp_sent_at: string | null
  created_at: string
  profile?: Profile
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  finish: string
  quantity: number
  unit_price: number
}

export interface CartItem {
  productId: string
  name: string
  price: number
  finish: string
  quantity: number
  imageUrl: string
}

export type RoomKey = 'sala' | 'quarto' | 'cozinha' | 'escritorio' | 'banheiro' | 'varanda'

export const ROOM_LABELS: Record<RoomKey | 'all', string> = {
  all: 'Todos',
  sala: 'Sala de Estar',
  quarto: 'Quarto',
  cozinha: 'Cozinha',
  escritorio: 'Escritório',
  banheiro: 'Banheiro',
  varanda: 'Varanda',
}

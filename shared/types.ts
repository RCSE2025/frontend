// Существующие типы для событий
export enum EventType {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  COMBINED = 'COMBINED'
}

export enum DisciplineType {
  CYBERSECURITY = 'CYBERSECURITY',
  ROBOTICS = 'ROBOTICS',
  ALGORITHMS = 'ALGORITHMS',
  UAS = 'UAS',
  PRODUCT = 'PRODUCT',
  DIMENSIONAL = 'DIMENSIONAL',
  VIRTUAL = 'VIRTUAL'
}

export enum EventStatus {
  WAITING = 'WAITING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  REWORK = 'REWORK'
}

export interface Document {
  filename: string
  url: string
  id: number
}

export interface IEvent {
  id: number
  regional_agent_id: number
  title: string
  description: string
  start_at: string
  end_at: string
  location?: string
  type: EventType
  discipline: DisciplineType
  status: EventStatus
  documents: Document[]
}

export interface MetadataStatus {
  className: string
  viewText: string
}

export const statusMetadataMap: Record<EventStatus, MetadataStatus> = {
  [EventStatus.WAITING]: { className: 'bg-slate-400 rounded p-1', viewText: 'Ожидание' },
  [EventStatus.APPROVED]: { className: 'bg-green-400 rounded p-1', viewText: 'Подтверждено' },
  [EventStatus.DECLINED]: { className: 'bg-red-400 rounded p-1', viewText: 'Отклонено' },
  [EventStatus.REWORK]: { className: 'bg-yellow-400 rounded p-1', viewText: 'На доработке' }
}

export const disciplineMetadataMap: Record<DisciplineType, string> = {
  [DisciplineType.CYBERSECURITY]: 'Кибербезопасность',
  [DisciplineType.ROBOTICS]: 'Робототехника',
  [DisciplineType.ALGORITHMS]: 'Алгоритмическое',
  [DisciplineType.UAS]: 'Беспилотные авиационные системы',
  [DisciplineType.PRODUCT]: 'Продуктовое программирование',
  [DisciplineType.DIMENSIONAL]: '3D программирование',
  [DisciplineType.VIRTUAL]: 'Виртуальная тактическая игра'
}

export const eventMetadataMap: Record<EventType, string> = {
  [EventType.OFFLINE]: 'Оффлайн',
  [EventType.ONLINE]: 'Онлайн',
  [EventType.COMBINED]: 'Комбинированный'
}

export enum EventHistoryLogType {
  CREATED = 'CREATED', // Создана заявка
  REWORK = 'REWORK', // Отправлена на доработку
  APPROVED = 'APPROVED', // Апрувнута
  DECLINED = 'DECLINED', // Отклонена
  UPDATED = 'UPDATED', // Обновлены данные заявки (время, место проведения, etc.)
  ROOT = 'ROOT' // ROOT
}

export interface IEventHistoryItem {
  id: number
  event_id: number
  created_at: string
  message: string
  type: EventHistoryLogType
}

// Типы для интернет-магазина
export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  HOME = 'HOME',
  FASHION = 'FASHION',
  SPORTS = 'SPORTS',
  BEAUTY = 'BEAUTY',
  TOYS = 'TOYS',
  BOOKS = 'BOOKS',
  FOOD = 'FOOD',
  OTHER = 'OTHER'
}

export const productCategoryMap: Record<ProductCategory, string> = {
  [ProductCategory.ELECTRONICS]: 'Электроника',
  [ProductCategory.HOME]: 'Дом и кухня',
  [ProductCategory.FASHION]: 'Мода',
  [ProductCategory.SPORTS]: 'Спорт и отдых',
  [ProductCategory.BEAUTY]: 'Красота и здоровье',
  [ProductCategory.TOYS]: 'Игрушки',
  [ProductCategory.BOOKS]: 'Книги',
  [ProductCategory.FOOD]: 'Продукты питания',
  [ProductCategory.OTHER]: 'Другое'
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  discount?: number;
  category: ProductCategory;
  inStock: boolean;
  specifications: ProductSpecification[];
  reviews?: ProductReview[];
  relatedProducts?: string[]; // IDs of related products
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  shippingInfo?: {
    freeShipping: boolean;
    estimatedDelivery: string;
  };
}

export interface CategoryFilter {
  id: string;
  title: string;
  image: string;
  link: string;
  category: ProductCategory;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilters {
  searchQuery?: string;
  categories?: ProductCategory[];
  priceRange?: PriceRange;
  brands?: string[];
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  tags?: string[];
}

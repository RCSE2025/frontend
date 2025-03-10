export interface CartPostProductRequest {
    product_id?: number;
    quantity?: number;
}
export interface ModelBusiness {
    address?: string;
    created_at?: string;
    full_name?: string;
    id?: number;
    inn?: number;
    ogrn?: number;
    owner?: string;
    short_name?: string;
    updated_at?: string;
}
export interface ModelCartItem {
    product_id?: number;
    quantity?: number;
    user_id?: number;
}
export interface ModelCartItemsResponse {
    product?: ModelProduct;
    product_id?: number;
    quantity?: number;
    user_id?: number;
}
export interface ModelCategoryFilter {
    category?: ModelProductCategory;
    id?: string;
    image?: string;
    link?: string;
    title?: string;
}
export interface ModelPriceRange {
    max?: number;
    min?: number;
}
export interface ModelProduct {
    brand?: string;
    business_id?: number;
    category?: ModelProductCategory;
    created_at?: string;
    description?: string;
    discount?: number;
    estimated_delivery?: string;
    id?: number;
    /**
     * ╨Ч╨░╨│╤А╤Г╨╢╨░╨╡╤В╤Б╤П ╨╛╤В╨┤╨╡╨╗╤М╨╜╨╛
     */
    images?: ModelProductImage[];
    price?: number;
    quantity?: number;
    rating?: number;
    /**
     * ╨Ч╨░╨│╤А╤Г╨╢╨░╨╡╤В╤Б╤П ╨╛╤В╨┤╨╡╨╗╤М╨╜╨╛
     */
    related_products?: number[];
    review_count?: number;
    /**
     * ╨Ч╨░╨│╤А╤Г╨╢╨░╨╡╤В╤Б╤П ╨╛╤В╨┤╨╡╨╗╤М╨╜╨╛
     */
    reviews?: ModelProductReview[];
    sku?: string;
    /**
     * ╨Ч╨░╨│╤А╤Г╨╢╨░╨╡╤В╤Б╤П ╨╛╤В╨┤╨╡╨╗╤М╨╜╨╛
     */
    specifications?: ModelProductSpecification[];
    title?: string;
    updated_at?: string;
}
export type ModelProductCategory = "ELECTRONICS" | "HOME" | "FASHION" | "SPORTS" | "BEAUTY" | "TOYS" | "BOOKS" | "FOOD" | "OTHER";
export interface ModelProductCreateRequest {
    brand?: string;
    business_id: number;
    category: ModelProductCategory;
    description: string;
    discount?: number;
    estimated_delivery?: string;
    price: number;
    quantity: number;
    sku?: string;
    specifications?: ModelProductSpecification[];
    title: string;
}
export interface ModelProductImage {
    created_at?: string;
    file_uuid?: string;
    id?: number;
    is_primary?: boolean;
    product_id?: number;
    updated_at?: string;
    /**
     * ╨Э╨╡ ╤Е╤А╨░╨╜╨╕╤В╤Б╤П ╨▓ ╨▒╨░╨╖╨╡ ╨┤╨░╨╜╨╜╤Л╤Е ╨╜╨░╨┐╤А╤П╨╝╤Г╤О
     */
    url?: string;
}
export interface ModelProductReview {
    comment?: string;
    created_at?: string;
    date?: string;
    id?: number;
    /**
     * ╨Э╨╡ ╤Е╤А╨░╨╜╨╕╤В╤Б╤П ╨▓ ╨▒╨░╨╖╨╡ ╨┤╨░╨╜╨╜╤Л╤Е ╨╜╨░╨┐╤А╤П╨╝╤Г╤О
     */
    images?: string[];
    product_id?: number;
    rating?: number;
    updated_at?: string;
    user_id?: number;
    user_name?: string;
}
export interface ModelProductSpecification {
    created_at?: string;
    id?: number;
    name?: string;
    product_id?: number;
    updated_at?: string;
    value?: string;
}
export interface ModelProductUpdateRequest {
    brand?: string;
    business_id?: number;
    category?: ModelProductCategory;
    description?: string;
    discount?: number;
    estimated_delivery?: string;
    price?: number;
    quantity?: number;
    sku?: string;
    specifications?: ModelProductSpecification[];
    title?: string;
}
export interface ModelToken {
    access_token?: string;
    refresh_token?: string;
    /**
     * example:
     * bearer
     */
    token_type?: string;
}
export interface ModelUser {
    created_at?: string;
    /**
     * example:
     * 2006-01-02
     */
    date_of_birth?: string; // date
    email?: string;
    id?: number;
    is_email_verified?: boolean;
    name?: string;
    patronymic?: string;
    role?: string;
    surname?: string;
    updated_at?: string;
}
export interface ModelUserCreate {
    /**
     * example:
     * 2006-01-02
     */
    date_of_birth?: string; // date
    email?: string;
    name?: string;
    password?: string;
    patronymic?: string;
    surname?: string;
}
export interface ResponseResponse {
    error?: string;
    message?: string;
    status?: string;
}

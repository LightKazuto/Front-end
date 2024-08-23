export interface CartItem {
  id: string;
  product_name: string;
  image_url: string;
  price: number;
  discount?: number;
  quantity: number;
  stock?: number;
  description?: string;
  total_price: number;
}

export interface OrderSummary {
  subtotal: number;
  total_discount: number;
  delivery_cost: number;
  total: number;
}

export interface RegisterTransactionRequest {
  from_user_id: number;
  to_user_id: number;
  product_id: number;
  product_quantity: number;
  total_price: number;
  status: string;
}

export interface RegisterTransactionResponse {
  message: string;
}

export interface Transaction {
  id: string;
  image_url: string;
  product_name: string;
  description: string;
  quantity: number;
  total_price: number;
  date: string;
  seller: string;
}
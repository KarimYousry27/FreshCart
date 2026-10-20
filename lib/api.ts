import type {ApiList,Brand,Category,Product,CartResponse} from '@/types/shop';
export const API=process.env.NEXT_PUBLIC_API_URL || 'https://ecommerce.routemisr.com/api/v1';
export class ApiError extends Error {constructor(message:string,public status:number){super(message);this.name='ApiError';}}
export async function request<T>(path:string,options:RequestInit={},token?:string):Promise<T>{
 const headers=new Headers(options.headers);if(options.body)headers.set('Content-Type','application/json');if(token)headers.set('token',token);
 let response:Response;try{response=await fetch(`${API}${path}`,{...options,headers,cache:'no-store'});}catch{throw new ApiError('Could not connect to the store. Please try again.',0);}
 const data=await response.json().catch(()=>({}));if(!response.ok||data.status==='fail'||data.status==='error')throw new ApiError(data.message||'Something went wrong. Please try again.',response.status);return data as T;
}
export const getProducts=(params='')=>request<ApiList<Product>>(`/products${params}`);
export const getProduct=(id:string)=>request<{data:Product}>(`/products/${encodeURIComponent(id)}`);
export const getCategories=()=>request<ApiList<Category>>('/categories');
export const getBrands=()=>request<ApiList<Brand>>('/brands');
export const getCart=(token:string)=>request<CartResponse>('/cart',{},token);
export const addToCart=(id:string,token:string)=>request<CartResponse>('/cart',{method:'POST',body:JSON.stringify({productId:id})},token);
export const removeFromCart=(id:string,token:string)=>request<CartResponse>(`/cart/${id}`,{method:'DELETE'},token);
export const updateCart=(id:string,count:number,token:string)=>request<CartResponse>(`/cart/${id}`,{method:'PUT',body:JSON.stringify({count})},token);
export const getWishlist=(token:string)=>request<{data:Product[]}>('/wishlist',{},token);
export const addWishlist=(id:string,token:string)=>request('/wishlist',{method:'POST',body:JSON.stringify({productId:id})},token);
export const removeWishlist=(id:string,token:string)=>request(`/wishlist/${id}`,{method:'DELETE'},token);

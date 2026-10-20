export type Category={_id:string;name:string;image:string;slug?:string};
export type Brand={_id:string;name:string;image:string;slug?:string};
export type Product={_id:string;title:string;description:string;price:number;priceAfterDiscount?:number;imageCover:string;images?:string[];ratingsAverage?:number;ratingsQuantity?:number;quantity?:number;category?:Category;brand?:Brand;slug?:string};
export type ApiList<T>={results?:number;data:T[];metadata?:{currentPage:number;numberOfPages:number;limit:number}};
export type CartItem={count:number;price:number;product:Product};
export type CartResponse={status:string;numOfCartItems:number;cartId?:string;data:{_id:string;totalCartPrice:number;products:CartItem[]}};

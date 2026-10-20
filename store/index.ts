import {configureStore,createSlice,PayloadAction} from '@reduxjs/toolkit';
type ShopState={wishlistIds:string[];cartCount:number;notice:string|null};
const initialState:ShopState={wishlistIds:[],cartCount:0,notice:null};
const slice=createSlice({name:'shop',initialState,reducers:{setWishlist(state,action:PayloadAction<string[]>){state.wishlistIds=action.payload;},toggleWishlistLocal(state,action:PayloadAction<string>){const id=action.payload;state.wishlistIds=state.wishlistIds.includes(id)?state.wishlistIds.filter(x=>x!==id):[...state.wishlistIds,id];},setCartCount(state,action:PayloadAction<number>){state.cartCount=action.payload;},setNotice(state,action:PayloadAction<string|null>){state.notice=action.payload;},resetShop(){return initialState;}}});
export const {setWishlist,toggleWishlistLocal,setCartCount,setNotice,resetShop}=slice.actions;
export const makeStore=()=>configureStore({reducer:{shop:slice.reducer}});
export type AppStore=ReturnType<typeof makeStore>;export type RootState=ReturnType<AppStore['getState']>;export type AppDispatch=AppStore['dispatch'];

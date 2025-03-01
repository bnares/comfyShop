import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem("cart")) || defaultState;
}

const cartSlice = createSlice({
    name:"cart",
    initialState: getCartFromLocalStorage(),
    reducers:{
        addItem:(state, action)=>{
            console.log(action.payload);
            const {product} = action.payload;
            const item = state.cartItems.find((i)=>i.cartID===product.cartID);
            if(item){
                item.amount += product.amount;
            }else{
                state.cartItems.push(product);
            }
            
            state.numItemsInCart +=product.amount;
            state.cartTotal += product.price*product.amount;

            cartSlice.caseReducers.calculateTotal(state);

            toast.success("Item added to cart");
            
        },
        clearCart: (state)=>{
            localStorage.setItem("cart", JSON.stringify(defaultState));
            return defaultState;
        },
        removeItem: (state, action)=>{
            const {cartID} = action.payload;
            const product = state.cartItems.find((item)=>item.cartID === cartID);
           
            state.cartItems = state.cartItems.filter((item)=>item.cartID !== cartID);
            state.numItemsInCart -=product.amount;
            state.cartTotal -= product.price*product.amount;
            cartSlice.caseReducers.calculateTotal(state);
            toast.success("Item deleted from cart");
            
        },
        editItem: (state, action)=>{
            const {cartID, amount, price} = action.payload;
            const product = state.cartItems.find((item)=>item.cartID == cartID);
            if(product){
                
                state.numItemsInCart += amount - product.amount;
                state.cartTotal += product.price *(amount - product.amount);
                product.amount = amount;
                cartSlice.caseReducers.calculateTotal(state);
                toast.success("Cart updated");
            }else{
                toast.error("Cart not updated");
            }

        },
        calculateTotal:(state)=>{
            state.tax = 0.1*state.cartTotal;
            state.orderTotal = state.cartTotal+ state.shipping+state.tax;
            localStorage.setItem("cart", JSON.stringify(state));
        }

    }
});


export const {addItem, clearCart, removeItem, editItem} = cartSlice.actions;

export default cartSlice.reducer;
import axios from "axios";
import { cartEndpoints } from "../apis";
import {toast} from 'react-hot-toast';

export async function getCart(){
    try{
        const token = localStorage.getItem('jwtToken');
        // console.log(token);
        const headers = {
            'Authorization' : token
        };
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.get(cartEndpoints.GET_CART,{});
        if(response.data.success === false){
            throw new Error(response.data.message);
        }
        return  response.data.cart;
    }catch(error){
        console.log("Fetching cart ERROR ....",error);
    }
}

export async function addProductToCart(productId){
    try{
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        axios.defaults.headers.common['Authorization'] = token;
        // console.log(productId);
        const response = await axios.post(cartEndpoints.ADD_PRODUCT_TO_CART,{ productId });
        // console.log(response);
        if(response.data.success === false){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
    }catch(error){
        toast.error(error.response.data.message);
        console.log("Adding product to cart ERROR ....",error);
    }
}

export async function removeProductFromCart(productId){
    try{
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.post(cartEndpoints.REMOVE_PRODUCT_FROM_CART,{ productId });
        if(response.data.success === false){
            throw new Error(response.data.message);
        }
    }catch(error){
        console.log("Adding product to cart ERROR ....",error);
    }
}

export async function emptyCart(){
    try{
        const token = localStorage.getItem('jwtToken');
        // console.log(token);
        const headers = {
            'Authorization' : token
        };
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.post(cartEndpoints.EMPTY_CART,{});
        if(response.data.success === false){
            throw new Error(response.data.message);
        }
    }catch(error){
        console.log("EMPTYING cart ERROR ....",error);
    }
}
import axios from "axios";
import { cartEndpoints } from "../apis";
import {toast} from 'react-hot-toast';
import { ADD_PRODUCT_TO_CART, GET_CART, REMOVE_PRODUCT_FROM_CART, EMPTY_CART } from "../queries";
import client from "@/apollo-client";

export async function getCart(){
    try{
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        const {data} = await client.query({
            query: GET_CART,
            context : {
                headers
            }
        });
        // console.log(data);
        return  data.getCart;
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
        const {data} = await client.mutate({
            mutation : ADD_PRODUCT_TO_CART,
            variables : {productId},
            context : {
                headers
            }
        })
        if(data.addProductToCart.success === false){
            toast.error(data.addProductToCart.message);
            throw new Error(data.addProductToCart.message);
        }
        toast.success(data.addProductToCart.message);
    }catch(error){
        console.log("Adding product to cart ERROR ....",error);
    }
}


export async function removeProductFromCart(productId){
    try{
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        const {data} = await client.mutate({
            mutation: REMOVE_PRODUCT_FROM_CART,
            variables : {productId},
            context : {
                headers
            }
        });
    }catch(error){
        console.log("Removing product from cart ERROR ....",error);
    }
}


export async function emptyCart(){
    try{
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        const {data} = await client.mutate({
            mutation: EMPTY_CART,
            context: {
                headers
            }
        });
        // console.log(data);
    }catch(error){
        console.log("EMPTYING cart ERROR ....",error);
    }
}
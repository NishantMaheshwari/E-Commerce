import axios from "axios";
import { orderEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import client from "@/apollo-client";
import { GET_ORDERS, ADD_PRODUCTS_TO_ORDER } from "../queries";


export async function getOrders(){
    try{
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        const {data} = await client.query({
            query: GET_ORDERS,
            context: {
                headers
            }
        });
        return  data.getOrders;
    }catch(error){
        console.log("Fetching order ERROR ....",error);
    }
}


export async function addProductsToOrder(productIds,totalPrice){
    try{
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        const {data} = await client.mutate({
            mutation: ADD_PRODUCTS_TO_ORDER,
            variables : {productIds, totalPrice},
            context: {
                headers
            }
        });
        // console.log(data);
        toast.success(data.addProductsToOrder.message);
    }catch(error){
        console.log("Adding products to order ERROR ....",error);
    }
}
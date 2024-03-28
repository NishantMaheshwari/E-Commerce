import axios from "axios";
import { orderEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import client from "@/apollo-client";
import { GET_ORDERS, ADD_PRODUCTS_TO_ORDER } from "../queries";

// export async function getOrders(){
//     try{
//         // console.log(19);
//         // const toastId = toast.loading("Loading...");
//         const token = localStorage.getItem('jwtToken');
//         const headers = {
//             'Authorization' : token
//         };
//         axios.defaults.headers.common['Authorization'] = token;
//         const response = await axios.get(orderEndpoints.GET_ORDERS,{});
//         if(response.data.success === false){
//             throw new Error(response.data.message);
//         }
//         // toast.dismiss(toastId);
//         return  response.data.orders;
//     }catch(error){
//         console.log("Fetching order ERROR ....",error);
//     }
// }

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

// export async function addProductsToOrder(productIds,totalPrice){
//     try{
//         const token = localStorage.getItem('jwtToken');
//         const headers = {
//             'Authorization' : token
//         };
//         axios.defaults.headers.common['Authorization'] = token;
//         const response = await axios.post(orderEndpoints.ADD_PRODUCTS_TO_ORDER,{ 
//             productIds, 
//             totalPrice
//         });
//         if(response.data.success === false){
//             toast.error(response.data.message);
//             throw new Error(response.data.message);
//         }
//         toast.success(response.data.message);
//     }catch(error){
//         toast.error(error.response.data.message);
//         console.log("Adding product to cart ERROR ....",error);
//     }
// }

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
import axios from "axios";
import { orderEndpoints } from "../apis";
import { toast } from "react-hot-toast";

export async function getOrders(){
    try{
        // console.log(19);
        // const toastId = toast.loading("Loading...");
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization' : token
        };
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.get(orderEndpoints.GET_ORDERS,{});
        if(response.data.success === false){
            throw new Error(response.data.message);
        }
        // toast.dismiss(toastId);
        return  response.data.orders;
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
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.post(orderEndpoints.ADD_PRODUCTS_TO_ORDER,{ 
            productIds, 
            totalPrice
        });
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
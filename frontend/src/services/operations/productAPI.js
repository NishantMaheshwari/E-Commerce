import { productEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import axios from "axios";

export async function getAllProducts(category,rating,sortQuery){
    try{
      //  const toastId = toast.loading("Loading...");
        const response = await axios.get(productEndpoints.GET_ALL_PRODUCTS, { 
            params: { 
                category,
                rating,
                sortQuery
            } 
        });
        if(response.data.success === false){
            throw new Error(response.data.message);
        }
        //console.log(response.data.allProducts);
      //  toast.dismiss(toastId);
        return response.data.allProducts;
    }catch(error){
        console.log("Fetching Products ERROR ....",error);
    }
}

export async function getProduct(productId){
    try{
        console.log(productId);
        const response =await axios.get(productEndpoints.GET_A_PRODUCT,{ params: { productId } });
        console.log(productId);

        if(response.data.success === false){
            throw new Error(response.data.message);
        }
        return response.data.product;
    }catch(error){
        console.log("Fetchinf specified product ERROR ....",error);
    }
}
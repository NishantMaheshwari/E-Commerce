import { productEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import axios from "axios";
import { GET_ALL_PRODUCTS,GET_SPECIFIED_PRODUCT, GET_ALL_PRODUCT_IDS } from "../queries";
import client from "@/apollo-client";

// export async function getAllProducts(category,rating,sortQuery){
//     try{
//       //  const toastId = toast.loading("Loading...");
//         const response = await axios.get(productEndpoints.GET_ALL_PRODUCTS, { 
//             params: { 
//                 category,
//                 rating,
//                 sortQuery
//             } 
//         });
//         if(response.data.success === false){
//             throw new Error(response.data.message);
//         }
//         //console.log(response.data.allProducts);
//       //  toast.dismiss(toastId);
//         return response.data.allProducts;
//     }catch(error){
//         console.log("Fetching Products ERROR ....",error);
//     }
// }

export async function getAllProducts(category,rating,sortQuery){
    try{
        const { data } = await client.query({
            query: GET_ALL_PRODUCTS,
            variables: { category, rating, sortQuery },
          });
        return data.getAllProducts;
    }catch(error){
        console.log("Fetching Products ERROR ....",error);
    }
}

// export async function getAllProductIds(){
//     try{
//       //  const toastId = toast.loading("Loading...");
//         // console.log(98);
//         const response = await axios.get(productEndpoints.GET_ALL_PRODUCT_IDS);
//         if(response.data.success === false){
//             throw new Error(response.data.message);
//         }
//         //console.log(response.data.allProducts);
//       //  toast.dismiss(toastId);
//         // console.log(response);
//         return response.data.productIds;
//     }catch(error){
//         console.log("Fetching Products ERROR ....",error);
//     }
// }

export async function getAllProductIds(){
    try{
        const {data} = await client.query({
            query:GET_ALL_PRODUCT_IDS
        })
        return data.getAllProductIds;
    }catch(error){
        console.log("Fetching Products ERROR ....",error);
    }
}

// export async function getProduct(productId){
//     try{
//         console.log(productId);
//         const response =await axios.get(productEndpoints.GET_A_PRODUCT,{ params: { productId } });
//         console.log(productId);

//         if(response.data.success === false){
//             throw new Error(response.data.message);
//         }
//         return response.data.product;
//     }catch(error){
//         console.log("Fetchinf specified product ERROR ....",error);
//     }
// }

export async function getProduct(productId){
    try{
        const {data} = await client.query({
            query: GET_SPECIFIED_PRODUCT,
            variables: {productId}
        });
        return data.getProductById;
    }catch(error){
        console.log("Fetching specified product ERROR ....",error);
    }
}
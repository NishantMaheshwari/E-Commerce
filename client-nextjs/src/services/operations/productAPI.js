import { productEndpoints } from "../apis";
import { toast } from "react-hot-toast";
import axios from "axios";
import { GET_ALL_PRODUCTS,GET_SPECIFIED_PRODUCT, GET_ALL_PRODUCT_IDS } from "../queries";
import client from "@/apollo-client";

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
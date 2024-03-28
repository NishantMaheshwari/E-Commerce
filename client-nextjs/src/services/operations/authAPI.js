import {authEndpoints} from "../apis";
import axios from "axios";
import {toast} from "react-hot-toast";
import client from "@/apollo-client";
import { LOGIN } from "../queries";

export async function login(email, password, router){
    try{
        const {data} = await client.query({
            query : LOGIN,
            variables : {email, password}
        });
        toast.success(data.loginUser.message);
        localStorage.setItem('jwtToken',data.loginUser.sessionToken);
        localStorage.setItem('userName',data.loginUser.userName);
        router.push("/");
    } catch(error){
        const errorMessage = error.graphQLErrors[0].message;
        toast.error(errorMessage);
        console.log("GraphQL Error:", errorMessage);
    }
}

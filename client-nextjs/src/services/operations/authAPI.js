import {authEndpoints} from "../apis";
import axios from "axios";
import {toast} from "react-hot-toast";
import client from "@/apollo-client";
import { LOGIN } from "../queries";

// export async function login(email, password, router){
//     try{
//         const response = await axios.post(authEndpoints.LOGIN_API,{
//             email,
//             password
//         });
//         console.log(response);
//         if(response.data.success === false){
//             toast.error(response.data.message);
//             throw new Error(response.data.message);
//         }
//         toast.success(response.data.message);
//         localStorage.setItem('jwtToken',response.data.token);
//         localStorage.setItem('userName',response.data.userName);
//         router.push("/");
//         console.log(response);
//     } catch(error){
//         toast.error(error.response.data.message);
//         console.log("LOGIN API ERROR ....",error);
//     }
// }

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

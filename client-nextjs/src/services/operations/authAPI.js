import {authEndpoints} from "../apis";
import axios from "axios";
import {toast} from "react-hot-toast";

export async function login(email, password, router){
    try{
        const response = await axios.post(authEndpoints.LOGIN_API,{
            email,
            password
        });
      
        if(response.data.success === false){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        localStorage.setItem('jwtToken',response.data.token);
        localStorage.setItem('userName',response.data.userName);
        router.push("/");
        console.log(response);
    } catch(error){
        toast.error(error.response.data.message);
        console.log("LOGIN API ERROR ....",error);
    }
}

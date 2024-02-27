import {authEndpoints} from "../apis";
import axios from "axios";
import {toast} from "react-hot-toast";

export async function login(email, password, navigate){
    try{
        const response = await axios.post(authEndpoints.LOGIN_API,{
            email,
            password
        });
        // console.log(response);
        if(response.data.success === false){
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
       // console.log(response);
        toast.success(response.data.message);
        localStorage.setItem('jwtToken',response.data.token);
        localStorage.setItem('userName',response.data.userName);
        navigate("/");
    } catch(error){
        toast.error(error.response.data.message);
        console.log("LOGIN API ERROR ....",error);
    }
}

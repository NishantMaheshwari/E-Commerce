import { AuthenticationError } from 'apollo-server-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async ({req}:any) => {
    if(
        req.body.operationName === 'Login' ||
        req.body.operationName === 'GetAllProducts' ||
        req.body.operationName === 'GetSpecifiedProduct' ||
        req.body.operationName === 'GetProductIds' ||
        req.body.operationName == 'IntrospectionQuery'
    ){
        return {};
    }
    const token = req.body.token || req.header("Authorization");
    if(!token) {
        throw new AuthenticationError('Token is missing');
    }
    const decode =  jwt.verify(token, process.env.JWT_SECRET);
    if(!decode){
        throw new AuthenticationError('Token is invalid');
    }
    return {user:decode};
    return {};
}

export default authMiddleware;
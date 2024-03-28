import { ApolloError } from 'apollo-server-errors';
import {login} from './controllers/Auth'
import { addToCart, emptyCart, getCart, removeFromCart} from './controllers/Cart';
import { getProduct,getAllProducts,getAllProductIds } from './controllers/Product';
import { getOrders, addOrder } from './controllers/Order';

export const resolvers = {
    Query:{
      loginUser: async(parent:any, {email, password}:any, context:any) => {
        try {
            const response = await login({ body: { email, password } }, { 
                status: (code: number) => ({
                json: (data: any) => ({ code, data }),
              }),
            });
            if (response && response.data && response.data.success === false) {
                throw new ApolloError('Login failed', 'LOGIN_FAILED', { response });
            }
            return {
                userName: response.data.userName,
                sessionToken: response.data.token,
                message: response.data.message
            };
            }catch (error) {
             console.error(error);
             throw new ApolloError('Password is incorrect', 'LOGIN_FAILED', { error });
        }
      },
      getProductById: async(parent:any, {productId}: any) => {
        try {
          const response = await getProduct({ query: { productId } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          if (response && response.data && response.data.success === true) {
            //  console.log(response.data);
            const product = {
              id:response.data.product._id.toString(),
              ...response.data.product._doc
            };
            // console.log(product);
            return product;
          } else {
            throw new ApolloError('Product Not Found', 'PRODUCT_NOT_FOUND');
          }
        } catch (error) {
          console.error(error);
          throw new ApolloError('Getting single product failed', 'GET_PRODUCT_FAILED');
        }
      },
      getAllProducts: async(parent:any, {category, rating, sortQuery}:any) => {
        try {
          const response = await getAllProducts({ query: { category,rating,sortQuery } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          // console.log(response.data);
          if (response && response.data && response.data.success === true) {
            // console.log(response.data);
            const products = response.data.allProducts.map((product:any) => {
              return {
                id:product._id.toString(),
                ...product._doc
              }
            })
            return products;
          } else {
            throw new ApolloError('Products Not Found', 'PRODUCTS_NOT_FOUND');
          }
        } catch (error) {
          console.error(error);
          throw new ApolloError('Getting products failed', 'GET_PRODUCTS_FAILED');
        }
      },
      getAllProductIds: async() => {
        try {
          const response = await getAllProductIds({ }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          if (response && response.data && response.data.success === true) {
            return response.data.productIds;
          } else {
            throw new ApolloError('Products Not Found', 'PRODUCTS_NOT_FOUND');
          }
        } catch (error) {
          console.error(error);
          throw new ApolloError('Getting products failed', 'GET_PRODUCTS_FAILED');
        }
      },
      getCart : async(parent:any,args:any,context: any) => {
        try{
          const {userId} = context.user;
          if (!userId ) {
            throw new ApolloError('Incomplete information sent for getting cart', 'INCOMPLETE_INFORMATION');
          }
          const response = await getCart({ user: { userId } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          return response.data.cart;
        }catch (error) {
          console.error(error);
          throw new Error('An error occurred adding product to cart');
        }
      },
      getOrders : async(parent:any,args:any,context: any) => {
        try{
          const {userId} = context.user;
          if (!userId ) {
            throw new ApolloError('Incomplete information sent for getting cart', 'INCOMPLETE_INFORMATION');
          }
          const response = await getOrders({ user: { userId } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          // console.log(response.data);
          return response.data.orders;
        }catch (error) {
          console.error(error);
          throw new Error('An error occurred adding product to cart');
        }
      }
    },
    Mutation:{
      addProductToCart : async(parent:any, {productId}: any,context: any) => {
        try{
          const {userId} = context.user;
          if (!userId || !productId) {
            throw new ApolloError('Incomplete information sent for adding product to cart', 'INCOMPLETE_INFORMATION');
          }
          const response = await addToCart({ body: { productId }, user: { userId } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          return response.data;
        }catch (error) {
          console.error(error);
          throw new Error('An error occurred adding product to cart');
        }
      },
      removeProductFromCart : async(parent:any, {productId}: any,context: any) => {
        try{
          const {userId} = context.user;
          if (!userId || !productId) {
            throw new ApolloError('Incomplete information sent for removing product from cart', 'INCOMPLETE_INFORMATION');
          }
          const response = await removeFromCart({ body: { productId }, user: { userId } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          return response.data;
        }catch (error) {
          console.error(error);
          throw new Error('An error occurred removing product from cart');
        }
      },
      emptyCart : async(parent:any, args: any,context: any) => {
        try{
          const {userId} = context.user;
          if (!userId) {
            throw new ApolloError('Incomplete information sent emptying cart', 'INCOMPLETE_INFORMATION');
          }
          const response = await emptyCart({  user: { userId } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          return response.data;
        }catch (error) {
          console.error(error);
          throw new Error('An error occurred adding product to cart');
        }
      },
      addProductsToOrder : async(parent:any, {productIds,totalPrice}: any,context: any) => {
        try{
          const {userId} = context.user;
          if (!userId || !productIds || !totalPrice) {
            throw new ApolloError('Incomplete information sent for adding products to order', 'INCOMPLETE_INFORMATION');
          }
          const response = await addOrder({ body: { productIds, totalPrice }, user: { userId } }, {
            status: (code: number) => ({
              json: (data: any) => ({ code, data }),
            }),
          });
          return response.data;
        }catch (error) {
          console.error(error);
          throw new Error('An error occurred adding products to order');
        }
      }
    }
}
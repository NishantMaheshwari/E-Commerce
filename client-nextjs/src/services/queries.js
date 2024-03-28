import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($category: String, $rating: String, $sortQuery: String) {
    getAllProducts(category: $category, rating: $rating, sortQuery: $sortQuery) {
        id
        name
        price
        description
        rating
        image
        category
    }
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        userName
        sessionToken
        message
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart($productId: ID!) {
    addProductToCart(productId: $productId) {
        success
        message
    }
  }
`;

export const GET_SPECIFIED_PRODUCT = gql`
  query GetSpecifiedProduct($productId: ID!) {
    getProductById(productId: $productId) {
        name
        price
        description
        rating
        image
        category
        id
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    getCart {
        product {
            name
            id
            price
            image
        }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
        id
        totalPrice
        products {
            name
            price
            image
        }
    }
  }
`;

export const REMOVE_PRODUCT_FROM_CART = gql`
  mutation RemoveProductFromCart($productId: ID!) {
    removeProductFromCart(productId: $productId) {
        success
        message
    }
  }
`; 

export const EMPTY_CART = gql`
  mutation EmptyCart {
    emptyCart {
        success
        message
    }
  }
`;

export const GET_ALL_PRODUCT_IDS = gql`
  query GetProductIds {
    getAllProductIds
  }
`;

export const ADD_PRODUCTS_TO_ORDER = gql`
  mutation AddProductsToOrder($productIds: [ID]!, $totalPrice: Float!) {
    addProductsToOrder(productIds: $productIds, totalPrice: $totalPrice) {
        success
        message
    }
  }
`;

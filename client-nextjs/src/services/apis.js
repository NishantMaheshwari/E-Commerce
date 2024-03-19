const BASE_URL = "http://localhost:4000/api";

console.log(BASE_URL);

export const authEndpoints = {
    LOGIN_API : BASE_URL + "/auth/login"
}

export const productEndpoints = {
    GET_A_PRODUCT : BASE_URL + "/products/getSpecificProduct",
    GET_ALL_PRODUCTS : BASE_URL + "/products/getAllProducts",
    GET_ALL_PRODUCT_IDS : BASE_URL + "/products/getAllProductIds"
}

export const cartEndpoints = {
    GET_CART : BASE_URL + "/cart/getCart",
    ADD_PRODUCT_TO_CART : BASE_URL + "/cart/addProduct",
    REMOVE_PRODUCT_FROM_CART : BASE_URL + "/cart/removeProduct",
    EMPTY_CART : BASE_URL + "/cart/emptyCart",
}

export const orderEndpoints = {
    GET_ORDERS : BASE_URL + "/orders/getProducts",
    ADD_PRODUCTS_TO_ORDER : BASE_URL + "/orders/addProducts"
}

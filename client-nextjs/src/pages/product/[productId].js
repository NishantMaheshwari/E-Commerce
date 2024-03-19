import Product from "@/components/Product/Product";
import { getProduct,getAllProductIds } from "@/services/operations/productAPI";

export default function ProductPage({product}){
    return <Product product={product}/>
}

export async function getStaticPaths() {
  
    const productIds =await getAllProductIds(); 
    const paths = productIds.map((productId) => ({
      params: { productId: productId.toString() }
    }));
    return { paths, fallback: false }; 
  }
  
  export async function getStaticProps({ params }) {
    const product = await getProduct(params.productId);
    return { props: { product } };
  }
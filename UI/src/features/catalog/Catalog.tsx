import { IProduct } from "../../app/interfaces/IProduct";
import ProductList from "./ProductList.tsx";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent.ts";
import Loading from "../../app/layout/Loading.tsx";

const Catalog = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  if (loading)
    return <Loading message="Loading products." />
  
  return <ProductList products={products} />
  
}

export default Catalog;
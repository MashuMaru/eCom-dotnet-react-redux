import { IProduct } from "../../app/interfaces/IProduct";
import ProductList from "./ProductList.tsx";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent.ts";

const Catalog = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  
  useEffect(() => {
    agent.Catalog.list()
      .then(products => setProducts(products))
  }, []);

  return (
    <>
      <ProductList products={products} />
      {/*<ErrorTest />*/}
    </>
  )
}

export default Catalog;
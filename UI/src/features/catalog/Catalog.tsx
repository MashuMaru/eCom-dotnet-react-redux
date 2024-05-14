import { IProduct } from "../../app/interfaces/IProduct"
import {Button} from "@mui/material";
import ProductList from "./ProductList.tsx";

interface IProps {
  products: IProduct[]
  addProduct: () => void
}

export default function Catalog({ products, addProduct }: IProps) {
  
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained" onClick={addProduct}>Add product</Button>
      
      {/*<ErrorTest />*/}
    </>
  )
}
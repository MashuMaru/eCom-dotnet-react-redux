import {IProduct} from "../../app/interfaces/IProduct.tsx";
import {List} from "@mui/material";
import ProductCard from "./ProductCard.tsx";

interface IProps {
  products: IProduct[];
}

export default function ProductList ({products} : IProps) {
  return (
    <List>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </List>
  )
}

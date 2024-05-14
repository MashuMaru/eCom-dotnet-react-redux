import {IProduct} from "../../app/interfaces/IProduct.tsx";
import {Grid} from "@mui/material";
import ProductCard from "./ProductCard.tsx";

interface IProps {
    products: IProduct[];
}

export default function ProductList ({products} : IProps) {
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid key={product.id} item xs={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

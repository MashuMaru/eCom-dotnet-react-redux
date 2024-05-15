import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent.ts";
import {IProduct} from "../../app/interfaces/IProduct.tsx";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<IProduct | null>(null);
  
  useEffect(() => {
    if (id)
      agent.Catalog.details(parseInt(id))
        .then((product) => setProduct(product))
        .finally(() => setLoading(false))
  }, [id])

  if (loading) return <h1>Loading data...</h1>
  if (!product) return <h1>Product not found...</h1>
  
  return (
    <Typography variant="h2">
      {product.name}
    </Typography>
  )
}

export default ProductDetails;
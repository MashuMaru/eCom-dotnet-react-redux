import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent.ts";
import {IProduct} from "../../app/interfaces/IProduct.tsx";
import Loading from "../../app/layout/Loading.tsx";
import NotFound from "../../app/errors/NotFound.tsx";
import {currencyFormatter} from "../../app/util/util.ts";

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

  if (loading) return <Loading message="Loading product details." />
  if (!product) return <NotFound />
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>{currencyFormatter(product.price)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Qty in Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default ProductDetails;
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, 
  TextField, 
  Tooltip,
  Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import agent from "../../app/api/agent.ts";
import {IProduct} from "../../app/interfaces/IProduct.tsx";
import Loading from "../../app/layout/Loading.tsx";
import NotFound from "../../app/errors/NotFound.tsx";
import {currencyFormatter} from "../../app/util/util.ts";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {removeItem, setBasket} from "../basket/basketSlice.ts";

const ProductDetails = () => {
  const { basket } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();
  
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const item = basket?.items.find(x => x.productId === product?.id);
  
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    
    if (id)
      agent.Catalog.details(parseInt(id))
        .then((product) => setProduct(product))
        .finally(() => setLoading(false))
  }, [id, item])

  if (loading) return <Loading message="Loading product details." />
  if (!product) return <NotFound />

  const handleQuantityUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    
    if (newQuantity < 0) return;
    
    setQuantity(newQuantity)
  }
  
  const handleUpdateCart = () => {
    if (!product) return;
    
    setSubmitting(true)
    
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product.id, updatedQuantity)
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.deleteItem(product.id, updatedQuantity)
        .then(() => dispatch(removeItem({ productId: product.id, quantity: updatedQuantity})))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
    }
  }
  
  const canUpdateBasket = () => {
    return item?.quantity === quantity || !item && quantity === 0;
  }

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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined' 
              type='number' 
              value={quantity} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuantityUpdate(e)}
              label='Quantity in Cart' 
              fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Tooltip arrow title={canUpdateBasket() && 'Provide a quantity to add to cart.'}>
              <span>
                <LoadingButton
                  disabled={canUpdateBasket()}
                  loading={submitting}
                  sx={{ height: '55px'}}
                  color='primary'
                  size='large'
                  variant='contained'
                  onClick={handleUpdateCart}
                  fullWidth>
                {item ? 'Update quantity' : 'Add to Cart'}
              </LoadingButton>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductDetails;
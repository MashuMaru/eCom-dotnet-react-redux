import {
  Box, Button, Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {Add, Delete, Remove} from "@mui/icons-material";
import {useState} from "react";
import agent from "../../app/api/agent.ts";
import {LoadingButton} from "@mui/lab";
import BasketSummary from "./BasketSummary.tsx";
import {currencyFormatter} from "../../app/util/util.ts";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {removeItem, setBasket} from "./basketSlice.ts";

const BasketPage = () => {
  // const { basket, setBasket, removeItem } = useStoreContext();
  const { basket } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });
  
  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>
  
  const handleAddItem = (productId: number, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then(res => dispatch(setBasket(res)))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }))
  }

  const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.deleteItem(productId, quantity)
      .then(() => dispatch(removeItem({productId, quantity})))
      .catch(error => console.log(error))
      .finally(() => setStatus({ loading: true, name: '' }))
  }
      
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img src={row.pictureUrl} alt={row.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormatter(row.price)}</TableCell>

                <TableCell align="center">
                  <LoadingButton
                    loading={status.loading && status.name === `rem_${row.productId}`}
                    color="error"
                    onClick={() => handleRemoveItem(row.productId, 1, `rem_${row.productId}`)}>
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={status.loading && status.name === `add_${row.productId}`}
                    color="secondary"
                    onClick={() => handleAddItem(row.productId, `add_${row.productId}`)}>
                    <Add />
                  </LoadingButton>
                </TableCell>

                <TableCell align="right">£{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={status.loading && status.name === `del_${row.productId}`}
                    onClick={() => handleRemoveItem(row.productId, row.quantity, `del_${row.productId}`)}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6} >
          <BasketSummary />
          <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default BasketPage;
import {
  Box,
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
import {useStoreContext} from "../../app/context/Context.tsx";
import {useState} from "react";
import agent from "../../app/api/agent.ts";
import {LoadingButton} from "@mui/lab";

const BasketPage = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [loading, setLoading] = useState<boolean>(false);
  
  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>
  
  const handleAddItem = (productId: number) => {
    setLoading(true)
    agent.Basket.addItem(productId)
      .then(res => setBasket(res))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleRemoveItem = (productId: number, quantity = 1) => {
    setLoading(true)
    agent.Basket.deleteItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }
      
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              <TableCell align="right">£{(row.price / 100).toFixed(2)}</TableCell>
              
              <TableCell align="center">
                <LoadingButton loading={loading} color="error" onClick={() => handleRemoveItem(row.productId)}>
                  <Remove />
                </LoadingButton>
                {row.quantity}
                <LoadingButton loading={loading} color="secondary" onClick={() => handleAddItem(row.productId)}>
                  <Add />
                </LoadingButton>
              </TableCell>
              
              <TableCell align="right">£{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <LoadingButton color="error" loading={loading} onClick={() => handleRemoveItem(row.productId, row.quantity)}>
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasketPage;
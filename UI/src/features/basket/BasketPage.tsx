import {useEffect, useState} from "react";
import {IBasket} from "../../app/interfaces/IBasket.tsx";
import agent from "../../app/api/agent.ts";
import Loading from "../../app/layout/Loading.tsx";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {Delete} from "@mui/icons-material";

const BasketPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [basket, setBasket] = useState<IBasket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, []);
  
  if (loading) return <Loading message="Loading basket..." />
  
  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>
      
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">£{(row.price / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">£{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasketPage;
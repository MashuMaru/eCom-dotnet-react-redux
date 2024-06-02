import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import {currencyFormatter} from "../../app/util/util.ts";
import {useAppSelector} from "../../app/store/configureStore.ts";

export default function BasketSummary() {
  const { basket } = useAppSelector(state => state.basket)
  const subTotal = basket?.items
    .reduce((sum, item) => sum + (item.quantity * (item.price)), 0) ?? 0;

  const deliveryFee = (subTotal > 10000 || subTotal === 0) ? 0 : 500;
  
  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{currencyFormatter(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{currencyFormatter(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total
                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
              </TableCell>
              <TableCell align="right">{currencyFormatter(subTotal + deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
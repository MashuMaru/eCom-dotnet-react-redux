import {Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore.ts";
import {decrement, increment} from "./counterSlice.ts";

const ContactPage = () => {
  const dispatch= useAppDispatch();
  const { data, title } = useAppSelector(state => state.counter);
  
  return (
    <>
      <Typography variant="h2">
        {title}
      </Typography>
      <Typography variant="h5">
        {data}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => dispatch(increment(1))}>increment</Button>
      <Button variant="contained" color="error" onClick={() => dispatch(decrement(1))}>decrement</Button>
      <Button variant="contained" color="primary" onClick={() => dispatch(increment(5))}>increment + 5</Button>
      <Button variant="contained" color="error" onClick={() => dispatch(decrement(5))}>decrement - 5</Button>
    </>
  )
}

export default ContactPage;
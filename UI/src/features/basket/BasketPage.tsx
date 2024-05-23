import {useEffect, useState} from "react";
import {IBasket} from "../../app/interfaces/IBasket.tsx";
import agent from "../../app/api/agent.ts";
import Loading from "../../app/layout/Loading.tsx";
import {Typography} from "@mui/material";

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
    <>
      <h1>Basket</h1>
      {basket.items.map((item, idx) => (
        <p key={idx}>{item.name} - {item.quantity}</p>
      ))}
    </>
  )
}

export default BasketPage;
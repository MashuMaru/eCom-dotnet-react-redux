import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent, CardHeader,
  CardMedia,
  Typography
} from "@mui/material";
import {IProduct} from "../../app/interfaces/IProduct.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import agent from "../../app/api/agent.ts";
import Loading from "../../app/layout/Loading.tsx";

interface IProps {
  product: IProduct
}

export default function ProductCard({product} : IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleAddItem = (productId: number) => {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((res) => {
        console.log(res.data)
      })
      .catch(e => {
        console.error(e)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  if (loading)
    return <Loading message="Adding to basket" />
  
  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{product.name.charAt(0).toUpperCase()}</Avatar>} 
        title={product.name}
        titleTypographyProps={{ fontWeight: 'bold', color: 'primary.main' }}
      />
      <CardMedia
          sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
          image={product.pictureUrl}
          title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          £{(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleAddItem(product.id)}>Add to cart</Button>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}
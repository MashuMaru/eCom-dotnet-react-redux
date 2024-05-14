import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {IProduct} from "../../app/interfaces/IProduct.tsx";

interface IProps {
  product: IProduct
}

export default function ProductCard({product} : IProps) {
  return (
    <ListItem key={product.id}>
      <ListItemAvatar>
        <Avatar src={product.pictureUrl} />
      </ListItemAvatar>
      <ListItemText>{product.name} - {product.price}</ListItemText>
    </ListItem>
  )
}
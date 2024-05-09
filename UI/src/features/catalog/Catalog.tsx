import { IProduct } from "../../app/interfaces/IProduct"

interface IProps {
  products: IProduct[]
  addProduct: () => void
}

export default function Catalog({ products, addProduct }: IProps) {
  
  return (
    <>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price} - {product.brand}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add product</button>
    </>
  )
}
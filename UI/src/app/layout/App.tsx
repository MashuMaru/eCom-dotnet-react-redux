import {useEffect, useState } from 'react'
import './styles.css'
import { IProduct } from '../interfaces/IProduct';
import Catalog from '../../features/catalog/Catalog';
import agent from '../api/agent'
import {Typography} from "@mui/material";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products))
  }, []);

  const addProduct = () => {
    setProducts(prev => [...prev,
      {
        id: prev.length + 101,
        name: "new product",
        price: (prev.length * 100) + 100,
        brand: "new brand",
        description: "some description",
        pictureUrl: "http:picsum.photos/200"
      }
    ])
  }
  
  return (
    <div>
      <Typography variant="h1">Store</Typography>
      <button onClick={() => agent.Catalog.details(1)}>Get by Id</button>
      <Catalog products={products} addProduct={addProduct}/>
    </div>
  )
}

export default App
